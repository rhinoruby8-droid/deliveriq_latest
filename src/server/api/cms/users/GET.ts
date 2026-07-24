import type { Request, Response } from 'express';
import { supabaseAdmin } from '../../../supabase';

export default async function handler(req: Request, res: Response) {
  try {
    const { data: users, error } = await supabaseAdmin
      .from('users')
      .select('id, name, email, role, registered_session_ids, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const { data: profiles } = await supabaseAdmin
      .from('settings')
      .select('*')
      .like('id', 'user_profile_%');

    const mappedUsers = users.map((u: any) => {
      const profile = profiles?.find((p: any) => p.id === 'user_profile_' + u.id)?.value || {};
      return {
        ...u,
        jobTitle: profile.jobTitle || '',
        company: profile.company || '',
        country: profile.country || ''
      };
    });

    res.status(200).json(mappedUsers);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
