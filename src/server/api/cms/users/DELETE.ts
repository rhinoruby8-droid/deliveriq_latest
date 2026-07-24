import type { Response } from 'express';
import { supabaseAdmin } from '../../../supabase';
import type { AuthRequest } from '../../../auth';

export default async function handler(req: AuthRequest, res: Response) {
  try {
    const id = (req.body?.id || req.query?.id) as string;

    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Safety check: Prevent admin from deleting themselves
    if (req.user && req.user.id === id) {
      return res.status(400).json({ error: 'You cannot delete your own admin account' });
    }

    const { error } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
