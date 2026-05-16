import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '@/db';
import { medicalCards } from '@/db/schema';
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

// GET: List all medical cards
export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const all = await db.select().from(medicalCards).orderBy(desc(medicalCards.createdAt));
  return NextResponse.json(all);
}

// POST: Create a new medical card
export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { appointmentId, patientName, patientAge, diagnosis, treatment, prescription, nextVisit, doctorNotes } = body;

  if (!patientName) {
    return NextResponse.json({ error: 'Patient name is required' }, { status: 400 });
  }

  const [card] = await db.insert(medicalCards).values({
    appointmentId,
    patientName,
    patientAge,
    diagnosis,
    treatment,
    prescription,
    nextVisit,
    doctorNotes,
  }).returning();

  return NextResponse.json(card, { status: 201 });
}
