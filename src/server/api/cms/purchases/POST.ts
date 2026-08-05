import type { Request, Response } from 'express';
import { supabaseAdmin } from '../../../supabase';

export interface Purchase {
  id: string;
  userId?: string;
  userEmail: string;
  userName: string;
  sessionId: string;
  sessionTitle: string;
  amount: number;
  currency: string;
  gateway: string;
  status: 'completed' | 'refunded' | 'initiated' | 'failed';
  createdAt: string;
}

export default async function handler(req: Request, res: Response) {
  try {
    const purchaseData = req.body as Purchase;
    if (!purchaseData.userEmail || !purchaseData.sessionId || !purchaseData.sessionTitle) {
      return res.status(400).json({ error: 'Missing required purchase fields' });
    }

    // 1. Fetch current purchases
    const { data: record } = await supabaseAdmin
      .from('settings')
      .select('value')
      .eq('id', 'purchases')
      .maybeSingle();

    const purchases: Purchase[] = record?.value || [];

    // Find if user exists in database to associate userId
    const { data: userRecord } = await supabaseAdmin
      .from('users')
      .select('id, registered_session_ids')
      .eq('email', purchaseData.userEmail.toLowerCase().trim())
      .maybeSingle();

    const verifiedUserId = userRecord?.id || purchaseData.userId || '';
    const updatedPurchase: Purchase = {
      ...purchaseData,
      id: purchaseData.id || `txn_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      userId: verifiedUserId,
      userEmail: purchaseData.userEmail.toLowerCase().trim(),
      createdAt: purchaseData.createdAt || new Date().toISOString()
    };

    const index = purchases.findIndex((p: Purchase) => p.id === updatedPurchase.id);
    if (index !== -1) {
      purchases[index] = updatedPurchase;
    } else {
      purchases.push(updatedPurchase);
    }

    // 2. Update settings table
    const { error: saveError } = await supabaseAdmin
      .from('settings')
      .upsert({ id: 'purchases', value: purchases });

    if (saveError) {
      return res.status(500).json({ error: saveError.message });
    }

    // 3. Sync user database entitlements if user exists
    if (userRecord && updatedPurchase.sessionId) {
      const currentIds = userRecord.registered_session_ids || [];
      if (updatedPurchase.status === 'completed') {
        if (!currentIds.includes(updatedPurchase.sessionId)) {
          await supabaseAdmin
            .from('users')
            .update({ registered_session_ids: [...currentIds, updatedPurchase.sessionId] })
            .eq('id', userRecord.id);
        }
      } else if (updatedPurchase.status === 'refunded') {
        if (currentIds.includes(updatedPurchase.sessionId)) {
          await supabaseAdmin
            .from('users')
            .update({ registered_session_ids: currentIds.filter((id: string) => id !== updatedPurchase.sessionId) })
            .eq('id', userRecord.id);
        }
      }
    }

    res.status(200).json({ success: true, purchase: updatedPurchase });
  } catch (err) {
    console.error('Error saving purchase:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
