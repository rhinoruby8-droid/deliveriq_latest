import type { Response } from 'express';
import { supabaseAdmin } from '../../../supabase';
import type { AuthRequest } from '../../../auth';

export default async function handler(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data: user, error: userErr } = await supabaseAdmin
      .from('users')
      .select('registered_session_ids, minutes_attended, hours_watched')
      .eq('id', userId)
      .single();

    if (userErr || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { data: allSessions, error: sessionsErr } = await supabaseAdmin
      .from('sessions')
      .select('*')
      .eq('status', 'published');

    if (sessionsErr || !allSessions) {
      return res.status(500).json({ error: 'Failed to fetch sessions' });
    }

    const registeredIds = user.registered_session_ids || [];
    const registeredSessions = allSessions.filter((s: any) => registeredIds.includes(s.id));
    
    // Upcoming opportunities: published sessions in PM disciplines not yet registered for
    const targetTags = ['Project Controls', 'Project Management', 'PMO', 'Delivery Leadership'];
    
    const upcomingOpportunities = allSessions.filter((s: any) => {
      // Check if it's in target disciplines
      if (!targetTags.includes(s.tag)) return false;
      // Check if not already registered
      if (registeredIds.includes(s.id)) return false;
      
      // In a real app we'd compare dates, here we assume all non-recorded are upcoming or available
      return true; 
    });

    return res.status(200).json({ 
      metrics: {
        minutes_attended: user.minutes_attended || 0,
        hours_watched: user.hours_watched || 0,
      },
      registeredSessions,
      upcomingOpportunities
    });
  } catch (err) {
    console.error('Dashboard API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
