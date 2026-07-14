import type { Response } from 'express';
import { supabaseAdmin } from '../../../supabase';
import type { AuthRequest } from '../../../auth';

export default async function handler(req: AuthRequest, res: Response) {
  try {
    const { sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data: user, error: userErr } = await supabaseAdmin
      .from('users')
      .select('registered_session_ids')
      .eq('id', userId)
      .single();

    if (userErr || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const currentIds = user.registered_session_ids || [];
    if (!currentIds.includes(sessionId)) {
      const updatedIds = [...currentIds, sessionId];
      const { error: updateErr } = await supabaseAdmin
        .from('users')
        .update({ registered_session_ids: updatedIds })
        .eq('id', userId);

      if (updateErr) {
        return res.status(500).json({ error: 'Failed to register for session' });
      }
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Register Session API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
