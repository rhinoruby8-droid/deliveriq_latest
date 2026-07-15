import type { Request, Response } from 'express';
import { supabaseAdmin } from '../../../supabase';
import { hashPassword, generateToken } from '../../../auth';
import { RegisterSchema } from '../../../../lib/schemas/validation';

export default async function handler(req: Request, res: Response) {
  try {
    const parseResult = RegisterSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.errors[0].message });
    }
    const { email, name, password } = parseResult.data;

    // Check if email already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    // Hash the user-provided password
    const password_hash = hashPassword(password);

    const { data: newUser, error } = await supabaseAdmin
      .from('users')
      .insert({
        email,
        password_hash,
        name,
        role: 'delegate',
        registered_session_ids: []
      })
      .select('id, email, name, role')
      .single();

    if (error || !newUser) {
      console.error('Registration failed:', error);
      return res.status(500).json({ error: 'Failed to create account' });
    }

    // Generate JWT session token
    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role
    });

    return res.status(201).json({ token, user: newUser });
  } catch (err) {
    console.error('Register API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
