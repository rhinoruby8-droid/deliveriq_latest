import type { Response } from 'express';
import { supabaseAdmin } from '../../../../supabase';
import type { AuthRequest } from '../../../../auth';
import { generateToken } from '../../../../auth';

export default async function handler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { sessionId } = req.params;
    if (!sessionId) {
      return res.status(400).json({ error: 'Missing sessionId' });
    }

    // Verify user exists and check registration
    const { data: user, error: userErr } = await supabaseAdmin
      .from('users')
      .select('registered_session_ids')
      .eq('id', userId)
      .single();

    if (userErr || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const registeredIds = user.registered_session_ids || [];
    if (!registeredIds.includes(sessionId)) {
      return res.status(403).json({ error: 'Forbidden: You are not registered for this session.' });
    }

    // Retrieve session registration URL
    const { data: session, error: sessionErr } = await supabaseAdmin
      .from('sessions')
      .select('registration_url')
      .eq('id', sessionId)
      .single();

    if (sessionErr || !session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    if (!session.registration_url) {
      return res.status(400).json({ error: 'Session does not have a registration URL configured.' });
    }

    // Generate short-lived token (60 seconds) with destination URL
    // In the future, this is where we'd hit the Zoom API to dynamically generate a unique user link.
    // For now, we redirect to the base URL but hide it behind the JWT.
    const token = generateToken({ dest: session.registration_url, u: userId, s: sessionId }, 60000);

    return res.status(200).json({ joinUrl: `/api/proxy/join?token=${token}` });
  } catch (err) {
    console.error('Join Call API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
