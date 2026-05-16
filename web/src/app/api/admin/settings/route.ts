import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '@/db';
import { doctorSettings } from '@/db/schema';
import { eq } from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

function verifyAdmin(request: NextRequest): boolean {
  const auth = request.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return false;
  try {
    jwt.verify(auth.slice(7), JWT_SECRET);
    return true;
  } catch { return false; }
}

export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const settings = await db.select().from(doctorSettings);
  const result: Record<string, any> = {};
  for (const s of settings) {
    try {
      result[s.key] = JSON.parse(s.value);
    } catch {
      result[s.key] = s.value;
    }
  }
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { key, value } = await request.json();
  if (!key || !value) return NextResponse.json({ error: 'Missing key or value' }, { status: 400 });

  const valueStr = typeof value === 'string' ? value : JSON.stringify(value);

  // Upsert pattern
  const existing = await db.select().from(doctorSettings).where(eq(doctorSettings.key, key));
  if (existing.length > 0) {
    await db.update(doctorSettings).set({ value: valueStr, updatedAt: new Date() }).where(eq(doctorSettings.key, key));
  } else {
    await db.insert(doctorSettings).values({ key, value: valueStr });
  }

  return NextResponse.json({ success: true });
}
