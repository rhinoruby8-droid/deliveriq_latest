import type { Request, Response } from 'express';
import { supabaseAdmin } from '../../../supabase';
import { hashPassword } from '../../../auth';

export default async function handler(req: Request, res: Response) {
  try {
    const id = (req.body?.id || req.query?.id) as string;
    const { name, email, role, password, registeredSessionIds } = req.body || {};

    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // 1. Validate inputs if provided
    if (name !== undefined && !name.trim()) {
      return res.status(400).json({ error: 'Name cannot be empty' });
    }
    if (email !== undefined && !email.trim()) {
      return res.status(400).json({ error: 'Email cannot be empty' });
    }
    if (role !== undefined && role !== 'admin' && role !== 'delegate') {
      return res.status(400).json({ error: 'Role must be either admin or delegate' });
    }

    const updates: Record<string, any> = {};

    if (name !== undefined) updates.name = name.trim();
    if (role !== undefined) updates.role = role;
    if (registeredSessionIds !== undefined) updates.registered_session_ids = registeredSessionIds;

    // 2. Email format and uniqueness check
    if (email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      // Check if email already used by another user
      const { data: existingUser, error: checkError } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('email', email.trim().toLowerCase())
        .neq('id', id)
        .maybeSingle();

      if (checkError) {
        return res.status(500).json({ error: checkError.message });
      }
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already in use by another account' });
      }

      updates.email = email.trim().toLowerCase();
    }

    // 3. Password validation and hashing if provided
    if (password !== undefined && password.trim() !== '') {
      if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long' });
      }
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasDigit = /[0-9]/.test(password);
      if (!hasUppercase || !hasLowercase || !hasDigit) {
        return res.status(400).json({ error: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' });
      }
      updates.password_hash = hashPassword(password);
    }

    // 4. Update row
    const { data: updatedUser, error: updateError } = await supabaseAdmin
      .from('users')
      .update(updates)
      .eq('id', id)
      .select('id, name, email, role, registered_session_ids, created_at')
      .single();

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
