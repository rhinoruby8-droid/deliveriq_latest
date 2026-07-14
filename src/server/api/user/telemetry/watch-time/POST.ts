import type { Response } from 'express';
import { supabaseAdmin } from '../../../../supabase';
import type { AuthRequest } from '../../../../auth';

export default async function handler(req: AuthRequest, res: Response) {
  try {
    const { type, minutes = 1 } = req.body;
    if (type !== 'live' && type !== 'recording') {
      return res.status(400).json({ error: 'Invalid watch type' });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data: user, error: userErr } = await supabaseAdmin
      .from('users')
      .select('minutes_attended, hours_watched')
      .eq('id', userId)
      .single();

    if (userErr || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updates: any = {};
    if (type === 'live') {
      updates.minutes_attended = (user.minutes_attended || 0) + minutes;
    } else {
      // Add minutes converted to hours
      const addedHours = minutes / 60;
      updates.hours_watched = Number(user.hours_watched || 0) + addedHours;
    }

    const { error: updateErr } = await supabaseAdmin
      .from('users')
      .update(updates)
      .eq('id', userId);

    if (updateErr) {
      return res.status(500).json({ error: 'Failed to update watch time' });
    }

    return res.status(200).json({ success: true, ...updates });
  } catch (err) {
    console.error('Watch time API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
