import type { Request, Response } from 'express';
import Stripe from 'stripe';
import { verifyToken } from '../../../auth';

import { supabaseAdmin } from '../../../supabase';
import { getSubscriptionConfig } from '../../../subscription-config';

async function getStripe(): Promise<Stripe> {
  const { data } = await supabaseAdmin.from('settings').select('value').eq('id', 'gateway_api_keys').maybeSingle();
  const keys = data?.value || {};
  const key = keys.stripe_secret_key || process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Stripe credentials are not configured in settings or environment');
  return new Stripe(key, { apiVersion: '2023-10-16' as any }); // using a recent valid stripe version string, but letting the type checker allow it.
}

export default async function handler(req: Request, res: Response) {
  try {
    const stripe = await getStripe();
    const { priceId, sessionTitle, amount, currency = 'usd', mode = 'payment', tier, sessionId, couponCode } = req.body as {
      priceId?: string;
      sessionTitle?: string;
      amount?: number;
      currency?: string;
      mode?: 'payment' | 'subscription';
      tier?: 'tier1' | 'tier2' | 'tier3';
      sessionId?: string;
      couponCode?: string;
    };

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

    const config = await getSubscriptionConfig();
    if (tier === 'tier3' && !config.isSubscriptionActive) {
      return res.status(503).json({ error: 'Subscription sales are currently paused.' });
    }

    const resolvedAmount = amount ?? (tier === 'tier3' ? config.tier3PriceUSD : 0);

    const origin = `${req.protocol}://${req.get('host')}`;

    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];

    if (priceId) {
      lineItems = [{ price: priceId, quantity: 1 }];
    } else if (resolvedAmount > 0 && sessionTitle) {
      let description = 'DeliverIQ live session — includes replay access';
      if (tier === 'tier1') {
        description = 'DeliverIQ live session (Basic tier) — live event access only';
      } else if (tier === 'tier2') {
        const monthsText = config.tier2DurationMonths === 1 ? '1 month' : `${config.tier2DurationMonths} months`;
        description = `DeliverIQ live session (Standard tier) — live event + ${monthsText} replay access`;
      } else if (tier === 'tier3') {
        const years = config.tier3DurationMonths / 12;
        const durationText = config.tier3DurationMonths % 12 === 0 && config.tier3DurationMonths > 0
          ? (years === 1 ? '1 year' : `${years} years`)
          : (config.tier3DurationMonths === 1 ? '1 month' : `${config.tier3DurationMonths} months`);
        description = `DeliverIQ Pro Membership — full access to all past and upcoming sessions for ${durationText}`;
      }

      lineItems = [
        {
          price_data: {
            currency,
            unit_amount: Math.round(resolvedAmount * 100),
            product_data: {
              name: sessionTitle,
              description,
            },
          },
          quantity: 1,
        },
      ];
    } else {
      return res.status(400).json({ error: 'Missing required fields: amount + sessionTitle or priceId' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode,
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/cancel`,
      billing_address_collection: 'auto',
      phone_number_collection: { enabled: false },
      metadata: {
        sessionTitle: sessionTitle || '',
        userId: userId || '',
        tier: tier || '',
        sessionId: sessionId || '',
        couponCode: couponCode || '',
      },
    });

    if (userId) {
      try {
        const { data: userProfile } = await supabaseAdmin.from('users').select('email, name').eq('id', userId).maybeSingle();
        if (userProfile) {
          const { logPurchase } = await import('../../../purchases-logger');
          await logPurchase({
             id: session.id,
             userId,
             userEmail: userProfile.email,
             userName: userProfile.name,
             sessionId: sessionId || 'pro_yearly',
             sessionTitle: sessionTitle || 'DeliverIQ Pro Yearly Subscription',
             amount: amount || (priceId ? 199.00 : 0),
             currency: currency.toUpperCase(),
             gateway: 'stripe',
             status: 'pending'
          });
        }
      } catch (err) {
        console.error('Failed to log pending purchase:', err);
      }
    }

    res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('stripe.checkout.error', error);
    res.status(500).json({
      error: 'Failed to create checkout session',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
