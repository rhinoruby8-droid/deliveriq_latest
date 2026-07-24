import type { Request, Response } from 'express';
import { verifyToken } from '../../../auth';

export default async function handler(req: Request, res: Response) {
  try {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
      return res.status(400).send('Missing or invalid token');
    }

    const payload = verifyToken(token);

    if (!payload) {
      return res.status(401).send('Invalid or expired join link. Please generate a new one from your dashboard.');
    }

    const destination = payload.dest;
    
    if (!destination) {
      return res.status(400).send('Invalid join link payload.');
    }

    // Redirect the user to the underlying meeting URL
    return res.redirect(destination);
  } catch (err) {
    console.error('Proxy Join API error:', err);
    return res.status(500).send('Internal server error while processing join link');
  }
}
