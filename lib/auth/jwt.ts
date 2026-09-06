import jwt from 'jsonwebtoken';

function secret(): string {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error('Missing JWT_SECRET environment variable');
  return s;
}

export interface AuthTokenPayload {
  uid: string;
  email: string;
}

export function signAuthToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, secret(), { expiresIn: '7d' });
}

export function verifyAuthToken(token: string): AuthTokenPayload | null {
  try {
    return jwt.verify(token, secret()) as AuthTokenPayload;
  } catch {
    return null;
  }
}
