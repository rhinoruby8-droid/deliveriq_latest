import crypto from 'node:crypto';
import type { Request, Response, NextFunction } from 'express';
import { getSecret } from '#airo/secrets';

// --- Cryptographic Helpers ---

const SCRYPT_PARAMS = { N: 16384, r: 8, p: 1, maxmem: 32 * 1024 * 1024 };
const KEY_LEN = 32; // 32 bytes

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, KEY_LEN, SCRYPT_PARAMS);
  return `${salt}:${derivedKey.toString('hex')}`;
}

export function verifyPassword(password: string, hash: string): boolean {
  if (!hash || !hash.includes(':')) return false;
  const [salt, key] = hash.split(':');
  if (!salt || !key) return false;
  
  try {
    const derivedKey = crypto.scryptSync(password, salt, KEY_LEN, SCRYPT_PARAMS);
    const keyBuffer = Buffer.from(key, 'hex');
    if (derivedKey.length !== keyBuffer.length) return false;
    return crypto.timingSafeEqual(derivedKey, keyBuffer);
  } catch (err) {
    return false;
  }
}

// --- Lightweight JWT (JSON Web Token) Implementation ---

function getJwtSecret(): string {
  return getSecret('JWT_SECRET') || process.env.VITE_SUPABASE_ANON_KEY || 'fallback-dev-secret-key-12345';
}

function base64urlEncode(buf: Buffer | string): string {
  const str = typeof buf === 'string' ? Buffer.from(buf).toString('base64') : buf.toString('base64');
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function generateToken(payload: Record<string, any>, expiresInMs = 1000 * 60 * 60 * 24 * 7): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Date.now() + expiresInMs;
  const extendedPayload = { ...payload, exp };
  
  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify(extendedPayload));
  
  const signature = crypto
    .createHmac('sha256', getJwtSecret())
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest();
  
  return `${encodedHeader}.${encodedPayload}.${base64urlEncode(signature)}`;
}

export function verifyToken(token: string): any | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  
  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  
  const expectedSignature = crypto
    .createHmac('sha256', getJwtSecret())
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest();
    
  if (encodedSignature !== base64urlEncode(expectedSignature)) return null;
  
  try {
    const payloadStr = Buffer.from(encodedPayload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8');
    const payload = JSON.parse(payloadStr);
    
    if (payload.exp && Date.now() > payload.exp) return null; // Expired
    return payload;
  } catch {
    return null;
  }
}

// --- Express Middleware ---

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  
  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);
  
  if (!payload || !payload.id) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  
  req.user = payload;
  next();
}

export function requireRole(allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    requireAuth(req, res, () => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access forbidden: insufficient permissions' });
      }
      next();
    });
  };
}

