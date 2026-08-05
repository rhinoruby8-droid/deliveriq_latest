import type { Request, Response } from 'express';

export default function handler(req: Request, res: Response) {
  // Try to get country code from Vercel's Edge header
  const country = req.headers['x-vercel-ip-country'] as string;

  if (country) {
    return res.json({ country: country.toUpperCase() });
  }

  // Fallback to timezone heuristcs (since hobby plan might strip geo headers)
  const tz = req.headers['x-timezone'] as string || 'UTC';
  
  if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') {
    return res.json({ country: 'IN', source: 'timezone-heuristic' });
  }

  // Default to US for Stripe
  return res.json({ country: 'US', source: 'default' });
}
