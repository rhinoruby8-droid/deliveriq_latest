import type { Request, Response } from 'express';
import Stripe from 'stripe';

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not configured');
  return new Stripe(key, { apiVersion: '2026-06-24.dahlia' });
}

export default async function handler(req: Request, res: Response) {
  try {
    const stripe = getStripe();
    const { priceId, sessionTitle, amount, currency = 'usd', mode = 'payment' } = req.body as {
      priceId?: string;
      sessionTitle?: string;
      amount?: number;
      currency?: string;
      mode?: 'payment' | 'subscription';
    };

    const origin = `${req.protocol}://${req.get('host')}`;

    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];

    if (priceId) {
      lineItems = [{ price: priceId, quantity: 1 }];
    } else if (amount && sessionTitle) {
      lineItems = [
        {
          price_data: {
            currency,
            unit_amount: Math.round(amount * 100),
            product_data: {
              name: sessionTitle,
              description: 'DeliverIQ live session — includes replay access',
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
      metadata: { sessionTitle: sessionTitle || '' },
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('stripe.checkout.error', error);
    res.status(500).json({
      error: 'Failed to create checkout session',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
