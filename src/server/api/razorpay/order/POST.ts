import type { Request, Response } from 'express';
import Razorpay from 'razorpay';
import { verifyToken } from '../../../auth';

import { supabaseAdmin } from '../../../supabase';

async function getRazorpay(): Promise<{ razorpay: Razorpay; keyId: string }> {
  const { data } = await supabaseAdmin.from('settings').select('value').eq('id', 'gateway_api_keys').maybeSingle();
  const keys = data?.value || {};
  
  const keyId = keys.razorpay_key_id || process.env.RAZORPAY_KEY_ID;
  const keySecret = keys.razorpay_key_secret || process.env.RAZORPAY_KEY_SECRET;
  
  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials are not configured in settings or environment');
  }
  return {
    razorpay: new Razorpay({ key_id: keyId, key_secret: keySecret }),
    keyId
  };
}

export default async function handler(req: Request, res: Response) {
  try {
    const { razorpay, keyId } = await getRazorpay();
    const { amount, currency = 'INR', sessionTitle, tier, sessionId, couponCode } = req.body as {
      amount: number;
      currency?: string;
      sessionTitle: string;
      tier?: 'tier1' | 'tier2' | 'tier3';
      sessionId?: string;
      couponCode?: string;
    };

    if (!amount || !sessionTitle) {
      return res.status(400).json({ error: 'Missing required fields: amount and sessionTitle' });
    }

    // Decode Authorization JWT to get userId
    let userId: string | undefined;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const payload = verifyToken(token);
      if (payload && payload.id) {
        userId = payload.id;
      }
    }

    if (userId && sessionId) {
      const { data: user } = await supabaseAdmin
        .from('users')
        .select('registered_session_ids')
        .eq('id', userId)
        .maybeSingle();

      if (user && user.registered_session_ids && user.registered_session_ids.includes(sessionId)) {
        return res.status(400).json({ error: 'You are already registered for this session.' });
      }
    }

    if (couponCode) {
      const { validateCoupon } = await import('../../../coupon-updater');
      const validation = await validateCoupon(couponCode, sessionId);
      if (!validation.valid) {
        return res.status(400).json({ error: validation.error || 'Invalid coupon code' });
      }
    }

    // Create Razorpay Order
    // Note: Razorpay amount must be in the smallest currency sub-unit (paise for INR).
    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: `receipt_order_${Date.now()}`,
      notes: {
        sessionTitle: sessionTitle || '',
        userId: userId || '',
        tier: tier || '',
        sessionId: sessionId || '',
        couponCode: couponCode || '',
      },
    };

    const order = await razorpay.orders.create(options);

    // Log the initiated payment to the CMS Settings table
    try {
      let userEmail = '';
      let userName = '';
      if (userId) {
        const { data: userProfile } = await supabaseAdmin
          .from('users')
          .select('email, name')
          .eq('id', userId)
          .maybeSingle();
        if (userProfile) {
          userEmail = userProfile.email;
          userName = userProfile.name;
        }
      }
      const { logPurchase } = await import('../../../purchases-logger');
      await logPurchase({
        id: order.id,
        userId: userId || '',
        userEmail,
        userName,
        sessionId: sessionId || 'pro_yearly',
        sessionTitle: sessionTitle || 'DeliverIQ Pro Yearly Subscription',
        amount,
        currency,
        gateway: 'razorpay',
        status: 'initiated'
      });
    } catch (err) {
      console.error('[Razorpay Order] Failed to log initiated purchase:', err);
    }

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      keyId, // Send back the active key ID to initialize checkout on the client
    });
  } catch (error) {
    console.error('razorpay.order.error', error);
    res.status(500).json({
      error: 'Failed to create Razorpay order',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
