import { supabaseAdmin } from './supabase';

export interface PurchaseLog {
  id: string;
  userId?: string;
  userEmail: string;
  userName: string;
  sessionId: string;
  sessionTitle: string;
  amount: number;
  currency: string;
  gateway: string;
  status: 'completed' | 'refunded' | 'initiated' | 'failed' | 'pending' | 'abandoned_notified';
  createdAt: string;
  notifiedAt?: string;
}

export async function logPurchase(log: Omit<PurchaseLog, 'createdAt'>, lookupId?: string) {
  try {
    const { data: record } = await supabaseAdmin
      .from('settings')
      .select('value')
      .eq('id', 'purchases')
      .maybeSingle();

    const purchases: PurchaseLog[] = record?.value || [];
    
    // Find index by lookupId or log.id
    const searchId = lookupId || log.id;
    const index = purchases.findIndex((p: PurchaseLog) => p.id === searchId);

    if (index !== -1) {
      purchases[index] = {
        ...purchases[index],
        ...log,
        createdAt: purchases[index].createdAt || new Date().toISOString()
      };
    } else {
      const newLog: PurchaseLog = {
        ...log,
        createdAt: new Date().toISOString()
      };
      purchases.push(newLog);
    }

    await supabaseAdmin
      .from('settings')
      .upsert({ id: 'purchases', value: purchases });

    console.log(`[Purchases] Successfully logged transaction ${log.id}`);
  } catch (err) {
    console.error('Failed to log purchase transaction:', err);
  }
}
