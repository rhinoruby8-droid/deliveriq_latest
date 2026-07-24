import type { Request, Response } from 'express';
import { supabaseAdmin } from '../../../../supabase';

export default async function handler(req: Request, res: Response) {
  try {
    if (!supabaseAdmin) {
      return res.status(500).json({ error: 'Supabase admin is not configured' });
    }

    const keys = req.body;
    
    // Simple validation
    if (typeof keys !== 'object' || keys === null) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const { error } = await supabaseAdmin
      .from('settings')
      .upsert({
        id: 'gateway_api_keys',
        value: {
          email_provider: keys.email_provider || 'airo',
          resend_api_key: keys.resend_api_key || '',
          stripe_secret_key: keys.stripe_secret_key || '',
          stripe_webhook_secret: keys.stripe_webhook_secret || '',
          razorpay_key_id: keys.razorpay_key_id || '',
          razorpay_key_secret: keys.razorpay_key_secret || '',
          paypal_client_id: keys.paypal_client_id || '',
          paypal_client_secret: keys.paypal_client_secret || '',
        },
        updated_at: new Date().toISOString(),
      });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error saving gateway API keys:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
