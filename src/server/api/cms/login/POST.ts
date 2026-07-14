import type { Request, Response } from 'express';

export default function handler(req: Request, res: Response) {
  const { password } = req.body as { password?: string };

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password !== expectedPassword) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  // Generate a simple base64 session token with 24-hour expiration
  const exp = Date.now() + 1000 * 60 * 60 * 24;
  const payload = { role: 'admin', exp };
  const token = Buffer.from(JSON.stringify(payload)).toString('base64');

  return res.status(200).json({ token });
}
