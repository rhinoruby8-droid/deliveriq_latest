import type { Request, Response } from 'express';
import Stripe from 'stripe';

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not configured');
  return new Stripe(key, { apiVersion: '2026-06-24.dahlia' });
}

export default async function handler(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.warn('stripe.webhook: no signature or secret configured');
    return res.json({ received: true });
  }

  let stripe: Stripe;
  try {
    stripe = getStripe();
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

      break;
    }
    case 'payment_intent.payment_failed': {
      const intent = event.data.object as Stripe.PaymentIntent;
      console.log('stripe.webhook.payment-failed', { intentId: intent.id });
      break;
    }
    default:
      break;
  }

  res.json({ received: true });
}
