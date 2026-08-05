import type { Request, Response } from 'express';
import { supabaseAdmin } from '../../../supabase';

export default async function handler(req: Request, res: Response) {
  try {
    const { id } = req.body as { id: string };
    if (!id) {
      return res.status(400).json({ error: 'Purchase transaction id is required' });
    }

    // 1. Fetch current purchases
    const { data: record } = await supabaseAdmin
      .from('settings')
      .select('value')
      .eq('id', 'purchases')
      .maybeSingle();

    const purchases = record?.value || [];
    const purchaseToDelete = purchases.find((p: any) => p.id === id);

    if (!purchaseToDelete) {
      return res.status(404).json({ error: 'Purchase record not found' });
    }

    // Filter out the deleted purchase
    const updatedPurchases = purchases.filter((p: any) => p.id !== id);

    // 2. Update settings table
    const { error: saveError } = await supabaseAdmin
      .from('settings')
      .upsert({ id: 'purchases', value: updatedPurchases });

    if (saveError) {
      return res.status(500).json({ error: saveError.message });
    }

    // 3. Remove user database entitlement if they exist
    if (purchaseToDelete.userEmail && purchaseToDelete.sessionId) {
      const { data: userRecord } = await supabaseAdmin
        .from('users')
        .select('id, registered_session_ids')
        .eq('email', purchaseToDelete.userEmail.toLowerCase().trim())
        .maybeSingle();

      if (userRecord) {
        const currentIds = userRecord.registered_session_ids || [];
        if (currentIds.includes(purchaseToDelete.sessionId)) {
          await supabaseAdmin
            .from('users')
            .update({ registered_session_ids: currentIds.filter((sid: string) => sid !== purchaseToDelete.sessionId) })
            .eq('id', userRecord.id);
        }
      }
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error deleting purchase:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
