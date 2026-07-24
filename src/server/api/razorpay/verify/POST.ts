import type { Request, Response } from 'express';
import crypto from 'node:crypto';
import Razorpay from 'razorpay';
import { supabaseAdmin } from '../../../supabase';

async function getRazorpayKeys() {
  const { data } = await supabaseAdmin.from('settings').select('value').eq('id', 'gateway_api_keys').maybeSingle();
  const keys = data?.value || {};
  const keyId = keys.razorpay_key_id || process.env.RAZORPAY_KEY_ID;
  const keySecret = keys.razorpay_key_secret || process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials are not configured in settings or environment');
  }
  return { keyId, keySecret };
}

async function getRazorpay(): Promise<Razorpay> {
  const { keyId, keySecret } = await getRazorpayKeys();
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

export default async function handler(req: Request, res: Response) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      tier,
      sessionId,
    } = req.body as {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      userId: string;
      tier?: 'tier1' | 'tier2' | 'tier3';
      sessionId?: string;
    };

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId) {
      return res.status(400).json({ error: 'Missing required verification fields' });
    }

    // Verify HMAC-SHA256 Signature
    const { keySecret: secret } = await getRazorpayKeys();
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(text)
      .digest('hex');

    const isSignatureValid = generated_signature === razorpay_signature;

    if (!isSignatureValid) {
      return res.status(400).json({ error: 'Invalid transaction signature. Verification failed.' });
    }

    // Fetch order notes to retrieve couponCode
    let couponCode = '';
    try {
      const razorpay = await getRazorpay();
      const order = await razorpay.orders.fetch(razorpay_order_id);
      if (order && order.notes && order.notes.couponCode) {
        couponCode = order.notes.couponCode as string;
      }
    } catch (orderErr) {
      console.error('[Razorpay Verify] Failed to fetch order details:', orderErr);
    }

    // Grant access rights in Database
    if (supabaseAdmin) {
      if (tier === 'tier3') {
        const expiresAt = new Date();
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        await supabaseAdmin
          .from('users')
          .update({
            subscription_tier: 'tier3',
            subscription_expires_at: expiresAt.toISOString(),
          })
          .eq('id', userId);
        console.log(`[Razorpay] Successfully granted Pro Tier to user ${userId}`);
      } else if (tier === 'tier2' && sessionId) {
        const { data: user } = await supabaseAdmin
          .from('users')
          .select('session_access, registered_session_ids')
          .eq('id', userId)
          .single();
        const sessionAccess = user?.session_access || {};
        const registeredIds = user?.registered_session_ids || [];

        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 3);

        sessionAccess[sessionId] = {
          tier: 'tier2',
          expires_at: expiresAt.toISOString(),
        };
        if (!registeredIds.includes(sessionId)) {
          registeredIds.push(sessionId);
        }

        await supabaseAdmin
          .from('users')
          .update({
            registered_session_ids: registeredIds,
            session_access: sessionAccess,
          })
          .eq('id', userId);
        console.log(`[Razorpay] Successfully granted Tier 2 for session ${sessionId} to user ${userId}`);
      } else if (tier === 'tier1' && sessionId) {
        const { data: user } = await supabaseAdmin
          .from('users')
          .select('session_access, registered_session_ids')
          .eq('id', userId)
          .single();
        const sessionAccess = user?.session_access || {};
        const registeredIds = user?.registered_session_ids || [];

        sessionAccess[sessionId] = {
          tier: 'tier1',
        };
        if (!registeredIds.includes(sessionId)) {
          registeredIds.push(sessionId);
        }

        await supabaseAdmin
          .from('users')
          .update({
            registered_session_ids: registeredIds,
            session_access: sessionAccess,
          })
          .eq('id', userId);
        console.log(`[Razorpay] Successfully granted Tier 1 for session ${sessionId} to user ${userId}`);
      }

      // Log purchase to settings database
      try {
        const { data: userProfile } = await supabaseAdmin
          .from('users')
          .select('email, name')
          .eq('id', userId)
          .maybeSingle();

        if (userProfile) {
          let sessionTitle = 'DeliverIQ Pro Yearly Subscription';
          let amount = 199.00;

          if (sessionId) {
            const { data: sessionData } = await supabaseAdmin
              .from('sessions')
              .select('title, price')
              .eq('id', sessionId)
              .maybeSingle();
            
            if (sessionData) {
              sessionTitle = sessionData.title;
              const { data: pricingSetting } = await supabaseAdmin
                .from('settings')
                .select('value')
                .eq('id', 'session_pricing')
                .maybeSingle();
              const pricing = pricingSetting?.value?.[sessionId] || {};
              amount = pricing.price || sessionData.price || 49.99;
            }
          }

          const { logPurchase } = await import('../../../purchases-logger');
          await logPurchase({
            id: razorpay_payment_id,
            userId,
            userEmail: userProfile.email,
            userName: userProfile.name,
            sessionId: sessionId || 'pro_yearly',
            sessionTitle,
            amount,
            currency: 'USD',
            gateway: 'razorpay',
            status: 'completed'
          }, razorpay_order_id);

          if (couponCode) {
            const { incrementCouponUses } = await import('../../../coupon-updater');
            await incrementCouponUses(couponCode);
          }
        }
      } catch (err) {
        console.error('[Razorpay Verify] Failed to log purchase:', err);
      }
    }

    res.json({ success: true, status: 'verified' });
  } catch (error) {
    console.error('razorpay.verify.error', error);
    res.status(500).json({
      error: 'Failed to verify transaction',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
