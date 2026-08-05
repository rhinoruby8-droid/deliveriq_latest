import type { Request, Response } from 'express';
import Stripe from 'stripe';

import { supabaseAdmin } from '../../../supabase';
import { getSubscriptionConfig, addMonths } from '../../../subscription-config';

async function getStripeKeys() {
  const { data } = await supabaseAdmin.from('settings').select('value').eq('id', 'gateway_api_keys').maybeSingle();
  const keys = data?.value || {};
  const secretKey = keys.stripe_secret_key || process.env.STRIPE_SECRET_KEY;
  const webhookSecret = keys.stripe_webhook_secret || process.env.STRIPE_WEBHOOK_SECRET;
  return { secretKey, webhookSecret };
}

function getStripe(key: string): Stripe {
  if (!key) throw new Error('Stripe Secret Key is not configured');
  return new Stripe(key, { apiVersion: '2023-10-16' as any });
}

export default async function handler(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'];
  const { secretKey, webhookSecret } = await getStripeKeys();

  if (!sig || !webhookSecret) {
    console.warn('stripe.webhook: no signature or secret configured');
    return res.json({ received: true });
  }

  let stripe: Stripe;
  try {
    stripe = getStripe(secretKey || '');
  } catch (err) {
    console.error('stripe.webhook.init-failed', err);
    return res.status(500).json({ error: 'Stripe not configured' });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body as Buffer, sig, webhookSecret);
  } catch (err) {
    console.error('stripe.webhook.signature-failed', err);
    return res.status(400).json({ error: 'Webhook signature verification failed' });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('stripe.webhook.checkout-completed', {
        sessionId: session.id,
        customerEmail: session.customer_details?.email,
        amount: session.amount_total,
        currency: session.currency,
        metadata: session.metadata,
      });

      // Auto-tag sponsor records if it's a sponsor package
      if (session.metadata?.sessionTitle?.startsWith('Sponsor Package:')) {
        const packageName = session.metadata.sessionTitle.replace('Sponsor Package:', '').trim();
        const sponsorEmail = session.customer_details?.email || 'unknown';
        const sponsorName = session.customer_details?.name || sponsorEmail.split('@')[0];
        
        try {
          const { supabaseAdmin } = await import('../../../supabase');
          if (supabaseAdmin) {
            await supabaseAdmin.from('sponsors').upsert({
              id: session.id, // using stripe session id as unique id for now
              name: sponsorName,
              tier: packageName,
              website_url: '',
              logo_url: ''
            });
            console.log(`Successfully recorded sponsor: ${sponsorName} for tier: ${packageName}`);
          }
        } catch (dbErr) {
          console.error('Failed to update sponsor record in DB', dbErr);
        }
      }

      // Handle subscription tiers and session registration
      const tier = session.metadata?.tier;
      const userId = session.metadata?.userId;
      const sessionId = session.metadata?.sessionId;

      if (tier && userId) {
        try {
          const { supabaseAdmin } = await import('../../../supabase');
          if (supabaseAdmin) {
            if (tier === 'tier3') {
              const config = await getSubscriptionConfig();
              const expiresAt = addMonths(config.tier3DurationMonths);
              await supabaseAdmin.from('users').update({
                subscription_tier: 'tier3',
                subscription_expires_at: expiresAt.toISOString()
              }).eq('id', userId);
              console.log(`Successfully granted Pro Tier to user ${userId}`);
            } else if (tier === 'tier2' && sessionId) {
              const { data: user } = await supabaseAdmin.from('users').select('session_access, registered_session_ids').eq('id', userId).single();
              const sessionAccess = user?.session_access || {};
              const registeredIds = user?.registered_session_ids || [];

              const config = await getSubscriptionConfig();
              const expiresAt = addMonths(config.tier2DurationMonths);

              sessionAccess[sessionId] = {
                tier: 'tier2',
                expires_at: expiresAt.toISOString()
              };
              if (!registeredIds.includes(sessionId)) {
                registeredIds.push(sessionId);
              }

              await supabaseAdmin.from('users').update({
                registered_session_ids: registeredIds,
                session_access: sessionAccess
              }).eq('id', userId);
              console.log(`Successfully granted Tier 2 for session ${sessionId} to user ${userId}`);
            } else if (tier === 'tier1' && sessionId) {
              const { data: user } = await supabaseAdmin.from('users').select('session_access, registered_session_ids').eq('id', userId).single();
              const sessionAccess = user?.session_access || {};
              const registeredIds = user?.registered_session_ids || [];

              sessionAccess[sessionId] = {
                tier: 'tier1'
              };
              if (!registeredIds.includes(sessionId)) {
                registeredIds.push(sessionId);
              }

              await supabaseAdmin.from('users').update({
                registered_session_ids: registeredIds,
                session_access: sessionAccess
              }).eq('id', userId);
              console.log(`Successfully granted Tier 1 for session ${sessionId} to user ${userId}`);
            }

            // Log purchase to settings database
            try {
              const { data: userProfile } = await supabaseAdmin
                .from('users')
                .select('email, name')
                .eq('id', userId)
                .maybeSingle();

              const userEmail = session.customer_details?.email || userProfile?.email || '';
              const userName = session.customer_details?.name || userProfile?.name || userEmail.split('@')[0];

              const pendingId = session.metadata?.pendingId;

              const { logPurchase } = await import('../../../purchases-logger');
              await logPurchase({
                id: session.id,
                userId,
                userEmail,
                userName,
                sessionId: sessionId || 'pro_yearly',
                sessionTitle: session.metadata?.sessionTitle || 'DeliverIQ Pro Yearly Subscription',
                amount: (session.amount_total || 0) / 100,
                currency: session.currency?.toUpperCase() || 'USD',
                gateway: 'stripe',
                status: 'completed'
              }, pendingId);

              // Increment coupon uses if couponCode exists in metadata
              const couponCode = session.metadata?.couponCode;
              if (couponCode) {
                const { incrementCouponUses } = await import('../../../coupon-updater');
                await incrementCouponUses(couponCode);
              }
            } catch (err) {
              console.error('[Stripe Webhook] Failed to log purchase:', err);
            }
          }
        } catch (dbErr) {
          console.error('Failed to update subscription/session access in DB', dbErr);
        }
      }

      break;
    }
    case 'payment_intent.payment_failed': {
      const intent = event.data.object as Stripe.PaymentIntent;
      console.log('stripe.webhook.payment-failed', { intentId: intent.id });
      break;
    }
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as any;
      if (invoice.subscription) {
        const customerEmail = invoice.customer_email;
        if (customerEmail) {
          try {
            const { supabaseAdmin } = await import('../../../supabase');
            if (supabaseAdmin) {
              const { data: user } = await supabaseAdmin.from('users').select('id, subscription_tier').eq('email', customerEmail.toLowerCase()).maybeSingle();
              if (user && user.subscription_tier === 'tier3') {
                const config = await getSubscriptionConfig();
                const expiresAt = addMonths(config.tier3DurationMonths);
                await supabaseAdmin.from('users').update({
                  subscription_expires_at: expiresAt.toISOString()
                }).eq('id', user.id);
                console.log(`Successfully extended Pro Tier for user ${user.id} on invoice payment`);
              }
            }
          } catch (err) {
            console.error('Failed to handle invoice.payment_succeeded', err);
          }
        }
      }
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      try {
        const customerId = subscription.customer as string;
        const customer = await stripe.customers.retrieve(customerId);
        if (!customer.deleted && customer.email) {
          const { supabaseAdmin } = await import('../../../supabase');
          if (supabaseAdmin) {
            await supabaseAdmin.from('users').update({
              subscription_tier: 'free',
              subscription_expires_at: null
            }).eq('email', customer.email.toLowerCase());
            console.log(`Successfully revoked Pro Tier for user ${customer.email} on subscription deleted`);
          }
        }
      } catch (err) {
        console.error('Failed to handle customer.subscription.deleted', err);
      }
      break;
    }
    default:
      break;
  }

  res.json({ received: true });
}
