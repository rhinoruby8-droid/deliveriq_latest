import type { Response } from 'express';
import Stripe from 'stripe';
import Razorpay from 'razorpay';
import { supabaseAdmin } from '../../../supabase';
import type { AuthRequest } from '../../../auth';
import { hashPassword } from '../../../auth';

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not configured');
  return new Stripe(key, { apiVersion: '2026-06-24.dahlia' });
}

function getRazorpay(): Razorpay {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials are not configured');
  }
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

export default async function handler(req: AuthRequest, res: Response) {
  try {
    const { sessionId, name, email, password, couponCode, gateway = 'stripe' } = req.body;
    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }

    // Decode Authorization JWT to get user
    let tokenUserId: string | undefined;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const { verifyToken } = await import('../../../auth');
      const payload = verifyToken(token);
      if (payload && payload.id) {
        tokenUserId = payload.id;
      }
    }

    let userId = req.user?.id || tokenUserId;
    let userEmail = email ? email.toLowerCase().trim() : '';
    let userName = name;

    // If authenticated, get info from user
    if (userId) {
      const { data: user } = await supabaseAdmin
        .from('users')
        .select('email, name, registered_session_ids')
        .eq('id', userId)
        .maybeSingle();
      if (user) {
        userEmail = user.email.toLowerCase().trim();
        userName = user.name;
        if (user.registered_session_ids && user.registered_session_ids.includes(sessionId)) {
          return res.status(400).json({ error: 'You are already registered for this session.' });
        }
      }
    } else {
      // Unauthenticated / Guest checkout
      if (!userEmail) {
        return res.status(400).json({ error: 'Email is required for registration' });
      }

      // Check if user exists
      const { data: existingUser, error: checkErr } = await supabaseAdmin
        .from('users')
        .select('id, registered_session_ids')
        .eq('email', userEmail)
        .maybeSingle();

      if (checkErr) {
        console.error('Error checking existing user:', checkErr);
      }

      if (existingUser) {
        return res.status(400).json({
          error: 'An account with this email already exists. Please log in to register for this session.'
        });
      } else {
        // Create guest user
        if (!password) {
          return res.status(400).json({ error: 'Password is required to register an account' });
        }
        
        const password_hash = hashPassword(password);
        const { data: newUser, error: createErr } = await supabaseAdmin
          .from('users')
          .insert({
            email: userEmail,
            password_hash,
            name: userName || userEmail.split('@')[0],
            role: 'delegate',
            registered_session_ids: []
          })
          .select('id')
          .maybeSingle();

        if (createErr || !newUser) {
          console.error('Failed to create guest user record:', createErr);
          return res.status(500).json({
            error: 'Failed to create user record',
            details: createErr?.message
          });
        }
        userId = newUser.id;
      }
    }

    // Load session and pricing/coupons dynamically from database
    const { data: session, error: sessionErr } = await supabaseAdmin
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionErr || !session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const [pricingSettingRes, couponsSettingRes] = await Promise.all([
      supabaseAdmin.from('settings').select('value').eq('id', 'session_pricing').single(),
      supabaseAdmin.from('settings').select('value').eq('id', 'coupons').single()
    ]);

    const pricing = pricingSettingRes.data?.value?.[sessionId] || {};
    const coupons = couponsSettingRes.data?.value || [];

    const isFree = pricing.isFree !== undefined ? pricing.isFree : false;
    const originalPrice = isFree ? 0 : (pricing.price || 0);
    let discountPercent = 0;

    if (couponCode) {
      const coupon = coupons.find(
        (c: any) => c.code.toUpperCase() === couponCode.trim().toUpperCase()
      );
      if (!coupon) {
        return res.status(400).json({ error: 'Invalid coupon code' });
      }

      if (coupon.active === false) {
        return res.status(400).json({ error: 'This coupon is inactive' });
      }
      if (coupon.sessionId && coupon.sessionId !== 'all' && coupon.sessionId !== sessionId) {
        return res.status(400).json({ error: 'This coupon is not valid for this session' });
      }
      const now = new Date();
      if (coupon.startDate && new Date(coupon.startDate) > now) {
        return res.status(400).json({ error: 'This coupon promotion has not started yet' });
      }
      if (coupon.endDate && new Date(coupon.endDate) < now) {
        return res.status(400).json({ error: 'This coupon promotion has expired' });
      }
      if (coupon.maxUses !== undefined && coupon.maxUses !== null && (coupon.uses || 0) >= coupon.maxUses) {
        return res.status(400).json({ error: 'This coupon usage limit has been reached' });
      }

      discountPercent = coupon.discountPercentage;
    }

    const finalPrice = Math.max(0, originalPrice * (1 - discountPercent / 100));
    const origin = `${req.protocol}://${req.get('host')}`;

    // If payment is required
    if (finalPrice > 0) {
      const activeGateway = gateway === 'stripe' && process.env.RAZORPAY_KEY_ID ? 'razorpay' : gateway;

      if (activeGateway === 'razorpay') {
        const razorpay = getRazorpay();
        const order = await razorpay.orders.create({
          amount: Math.round(finalPrice * 100),
          currency: 'USD', // Keep transaction in USD since it's international, config_id will map it
          receipt: `receipt_reg_${Date.now()}`,
          notes: {
            sessionTitle: session.title,
            userId: userId || '',
            tier: 'tier2',
            sessionId: sessionId
          }
        });

        return res.status(200).json({
          success: true,
          gateway: 'razorpay',
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          userId,
          sessionId,
          sessionTitle: session.title,
          tier: 'tier2'
        });
      } else {
        const stripe = getStripe();
        const stripeSession = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'usd',
                unit_amount: Math.round(finalPrice * 100),
                product_data: {
                  name: session.title,
                  description: `DeliverIQ live session: ${session.title}`,
                },
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/payment/cancel`,
          metadata: {
            sessionTitle: session.title,
            userId: userId || '',
            tier: 'tier2',
            sessionId: sessionId
          }
        });

        return res.status(200).json({
          success: true,
          gateway: 'stripe',
          checkoutUrl: stripeSession.url
        });
      }
    }

    // If final price is 0 (Free session), register immediately in DB
    const { data: userRecord } = await supabaseAdmin
      .from('users')
      .select('registered_session_ids')
      .eq('id', userId)
      .single();

    const currentIds = userRecord?.registered_session_ids || [];
    if (!currentIds.includes(sessionId)) {
      const updatedIds = [...currentIds, sessionId];
      await supabaseAdmin
        .from('users')
        .update({ registered_session_ids: updatedIds })
        .eq('id', userId);
    }

    if (couponCode) {
      const updatedCoupons = coupons.map((c: any) => {
        if (c.code.toUpperCase() === couponCode.trim().toUpperCase()) {
          return { ...c, uses: (c.uses || 0) + 1 };
        }
        return c;
      });
      await supabaseAdmin
        .from('settings')
        .update({ value: updatedCoupons })
        .eq('id', 'coupons');
    }

    return res.status(200).json({ success: true, gateway: 'free' });
  } catch (err) {
    console.error('Register Session API error:', err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err instanceof Error ? err.message : String(err)
    });
  }
}
