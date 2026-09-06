import { NextResponse } from 'next/server';
import { TOKEN_COOKIE } from '@/lib/auth/cookies';

export const dynamic = 'force-dynamic';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(TOKEN_COOKIE, '', { path: '/', httpOnly: true, maxAge: 0 });
  return res;
}
