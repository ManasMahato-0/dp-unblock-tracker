import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db/connect';
import { Progress } from '@/models/Progress';
import { getUserFromRequest } from '@/lib/auth/session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const entrySchema = z.object({
  td: z.boolean().optional(),
  bu: z.boolean().optional(),
  note: z.string().max(4000).optional(),
});

const putSchema = z.object({
  entries: z.record(z.string(), entrySchema),
});

export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ ok: false, message: 'Unauthenticated' }, { status: 401 });
  }
  try {
    await connectToDatabase();
    const doc = await Progress.findOne({ userId: user.uid }).lean({ flattenMaps: true });
    const raw = (doc?.entries ?? {}) as unknown;
    const entries =
      raw instanceof Map ? Object.fromEntries(raw) : (raw as Record<string, unknown>);
    return NextResponse.json({
      ok: true,
      data: { entries, updatedAt: doc?.updatedAt ?? null },
    });
  } catch (e) {
    console.error('progress GET error:', e);
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ ok: false, message: 'Unauthenticated' }, { status: 401 });
  }
  const parsed = putSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: 'Invalid input' }, { status: 400 });
  }

  // Normalize: fill defaults so the Map subdocs are complete.
  const entries: Record<string, { td: boolean; bu: boolean; note: string }> = {};
  for (const [k, v] of Object.entries(parsed.data.entries)) {
    entries[k] = { td: !!v.td, bu: !!v.bu, note: v.note ?? '' };
  }

  try {
    await connectToDatabase();
    const doc = await Progress.findOneAndUpdate(
      { userId: user.uid },
      { $set: { entries } },
      { upsert: true, new: true }
    );
    return NextResponse.json({ ok: true, data: { updatedAt: doc?.updatedAt ?? null } });
  } catch (e) {
    console.error('progress PUT error:', e);
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}
