import type { Request, Response } from 'express';
import { clearCmsCache } from '../cache';
import { getSecret } from '#airo/secrets';

export default function handler(req: Request, res: Response) {
  try {
    const webhookSecret = getSecret('SUPABASE_WEBHOOK_SECRET');
    const authHeader = req.headers['authorization'];
    if (webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    clearCmsCache();
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ error: 'Failed to process webhook' });
  }
}