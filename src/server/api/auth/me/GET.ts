import type { Response } from 'express';
import { supabaseAdmin } from '../../../supabase';
import type { AuthRequest } from '../../../auth';

export default async function handler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, name, role, registered_session_ids, minutes_attended, hours_watched')
      .eq('id', userId)
      .maybeSingle();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error('Me API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
