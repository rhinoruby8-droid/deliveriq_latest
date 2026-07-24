import type { Request, Response } from 'express';
import { supabaseAdmin } from '../../../supabase';

export default async function handler(req: Request, res: Response) {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Check if the user exists in the database
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email')
      .eq('email', email)
      .maybeSingle();

    if (error || !user) {
      return res.status(404).json({ error: "We couldn't find an account associated with that email address. Please check for typos or create a new account." });
    }

    // User exists. In a real system, you would generate a reset token and email it here.
    // For now, we simulate success to keep the UX smooth.
    return res.status(200).json({ success: true, message: 'Password reset link sent' });
  } catch (err: any) {
    console.error('[Forgot Password Error]:', err);
    return res.status(500).json({ error: 'An unexpected error occurred. Please try again.' });
  }
}
