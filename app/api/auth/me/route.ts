import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ ok: false, message: 'Unauthenticated' }, { status: 401 });
  }
  return NextResponse.json({ ok: true, data: { uid: user.uid, email: user.email } });
}
