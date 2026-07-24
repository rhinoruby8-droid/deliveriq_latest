import type { Request, Response } from 'express';
import { supabaseAdmin } from '../../../../supabase';

export default async function handler(req: Request, res: Response) {
  try {
    if (!supabaseAdmin) {
      return res.status(500).json({ error: 'Supabase admin is not configured' });
    }

    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('value')
      .eq('id', 'gateway_api_keys')
      .maybeSingle();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Default empty keys if not set
    const keys = {
      email_provider: data?.value?.email_provider || 'airo',
      resend_api_key: data?.value?.resend_api_key || '',
      stripe_secret_key: data?.value?.stripe_secret_key || '',
      stripe_webhook_secret: data?.value?.stripe_webhook_secret || '',
      razorpay_key_id: data?.value?.razorpay_key_id || '',
      razorpay_key_secret: data?.value?.razorpay_key_secret || '',
      paypal_client_id: data?.value?.paypal_client_id || '',
      paypal_client_secret: data?.value?.paypal_client_secret || '',
    };

    res.status(200).json(keys);
  } catch (err) {
    console.error('Error fetching gateway API keys:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
