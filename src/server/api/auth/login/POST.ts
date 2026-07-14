import type { Request, Response } from 'express';
import { supabaseAdmin } from '../../../supabase';
import { verifyPassword, generateToken } from '../../../auth';
import { LoginSchema } from '../../../../lib/schemas/validation';

export default async function handler(req: Request, res: Response) {
  try {
    const parseResult = LoginSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.errors[0].message });
    }
    const { email, password } = parseResult.data;

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, password_hash, name, role')
      .eq('email', email)
      .maybeSingle();

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValid = verifyPassword(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT session token
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

    return res.status(200).json({ 
      token, 
      user: { id: user.id, email: user.email, name: user.name, role: user.role } 
    });
  } catch (err) {
    console.error('Login API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
