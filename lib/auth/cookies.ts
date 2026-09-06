import { cookies } from 'next/headers';

export const TOKEN_COOKIE = 'token';

export const cookieOptions = {
  httpOnly: true as const,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
};

export function getAuthCookie(): string | undefined {
  return cookies().get(TOKEN_COOKIE)?.value;
}
