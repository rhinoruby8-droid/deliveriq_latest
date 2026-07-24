import type { Request, Response } from 'express';
import Razorpay from 'razorpay';
import { supabaseAdmin } from '../../../supabase';

export default async function handler(req: Request, res: Response) {
  try {
    // 1. Fetch locally logged transactions (Stripe, Admin, etc.)
    const { data: record, error } = await supabaseAdmin
      .from('settings')
      .select('value')
      .eq('id', 'purchases')
      .maybeSingle();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const localPurchases = record?.value || [];

    // 2. Fetch live transactions directly from Razorpay
    let razorpayPurchases: any[] = [];
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keyId && keySecret) {
      try {
        const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
        // Fetch last 100 payments
        const paymentsResponse = await razorpay.payments.all({ count: 100 });
        const items = paymentsResponse.items || [];

        razorpayPurchases = items.map((p: any) => {
          let status: 'completed' | 'refunded' | 'initiated' | 'failed' = 'initiated';
          if (p.status === 'captured') {
            status = 'completed';
          } else if (p.status === 'failed') {
            status = 'failed';
          } else if (p.status === 'refunded') {
            status = 'refunded';
          }

          return {
            id: p.id,
            userId: p.notes?.userId || '',
            userEmail: p.email || '',
            userName: p.notes?.userName || p.email?.split('@')[0] || 'Razorpay User',
            sessionId: p.notes?.sessionId || 'pro_yearly',
            sessionTitle: p.notes?.sessionTitle || p.description || 'Live Session Payment',
            amount: p.amount / 100, // convert paise to INR/USD units
            currency: p.currency || 'INR',
            gateway: 'razorpay',
            status,
            createdAt: new Date(p.created_at * 1000).toISOString()
          };
        });
      } catch (rzErr) {
        console.error('Failed to fetch payments from Razorpay API:', rzErr);
      }
    }

    // 3. Merge: filter out local duplicate razorpay transactions and combine lists
    const nonRzLocal = localPurchases.filter((p: any) => p.gateway !== 'razorpay');
    
    // Sort combined list by date descending
    const combined = [...razorpayPurchases, ...nonRzLocal].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    res.status(200).json(combined);
  } catch (err) {
    console.error('Error fetching purchases:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
