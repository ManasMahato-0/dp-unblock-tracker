import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db/connect';
import { User } from '@/models/User';
import { signAuthToken } from '@/lib/auth/jwt';
import { TOKEN_COOKIE, cookieOptions } from '@/lib/auth/cookies';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: 'Invalid input' }, { status: 400 });
    }
    const email = parsed.data.email.toLowerCase().trim();

    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
      return NextResponse.json({ ok: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const token = signAuthToken({ uid: user._id.toString(), email });
    const res = NextResponse.json({ ok: true });
    res.cookies.set(TOKEN_COOKIE, token, cookieOptions);
    return res;
  } catch (e) {
    console.error('login error:', e);
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}
