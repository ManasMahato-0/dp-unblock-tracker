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
    if (await User.findOne({ email })) {
      return NextResponse.json({ ok: false, message: 'Email already registered' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    const user = await User.create({ email, passwordHash });

    const token = signAuthToken({ uid: user._id.toString(), email });
    const res = NextResponse.json({ ok: true });
    res.cookies.set(TOKEN_COOKIE, token, cookieOptions);
    return res;
  } catch {
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}
