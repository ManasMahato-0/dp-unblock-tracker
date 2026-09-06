import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string | undefined;
if (!JWT_SECRET) throw new Error('Missing JWT_SECRET environment variable');

export interface AuthTokenPayload {
  uid: string;
  email: string;
}

export function signAuthToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: '7d' });
}

export function verifyAuthToken(token: string): AuthTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET as string) as AuthTokenPayload;
  } catch {
    return null;
  }
}
