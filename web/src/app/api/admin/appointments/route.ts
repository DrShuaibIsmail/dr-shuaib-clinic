import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '@/db';
import { appointments } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

function verifyAdmin(request: NextRequest): boolean {
  const auth = request.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return false;
  try {
    jwt.verify(auth.slice(7), JWT_SECRET);
    return true;
  } catch { return false; }
}

// GET: List all appointments
export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const all = await db.select().from(appointments).orderBy(desc(appointments.createdAt));
  return NextResponse.json(all);
}

// PATCH: Update appointment status
export async function PATCH(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, status } = await request.json();
  if (!id || !status) {
    return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
  }

  await db.update(appointments).set({ status, updatedAt: new Date() }).where(eq(appointments.id, id));
  return NextResponse.json({ success: true });
}
