import type { Request, Response } from 'express';
import { supabaseAdmin } from '../../../supabase';
import { hashPassword } from '../../../auth';

export default async function handler(req: Request, res: Response) {
  try {
    const { name, email, role, password } = req.body || {};

    // 1. Basic validation checks
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!role || (role !== 'admin' && role !== 'delegate')) {
      return res.status(400).json({ error: 'Role must be either admin or delegate' });
    }
    if (!password || !password.trim()) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // 3. Password complexity validation (min 8 chars, 1 uppercase, 1 lowercase, 1 digit)
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    if (!hasUppercase || !hasLowercase || !hasDigit) {
      return res.status(400).json({ error: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' });
    }

    // 4. Uniqueness check for email
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email.trim().toLowerCase())
      .maybeSingle();

    if (checkError) {
      return res.status(500).json({ error: checkError.message });
    }
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use by another account' });
    }

    // 5. Hash password and insert
    const passwordHash = hashPassword(password);
    const { data: newUser, error: insertError } = await supabaseAdmin
      .from('users')
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role,
        password_hash: passwordHash,
        registered_session_ids: []
      })
      .select('id, name, email, role, registered_session_ids, created_at')
      .single();

    if (insertError) {
      return res.status(500).json({ error: insertError.message });
    }

    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
