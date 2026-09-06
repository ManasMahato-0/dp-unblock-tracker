import type { NextRequest } from 'next/server';
import { verifyAuthToken, type AuthTokenPayload } from './jwt';
import { TOKEN_COOKIE } from './cookies';

export function getUserFromRequest(req: NextRequest): AuthTokenPayload | null {
  const token = req.cookies.get(TOKEN_COOKIE)?.value;
  return token ? verifyAuthToken(token) : null;
}
