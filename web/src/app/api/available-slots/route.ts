import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { doctorSettings, appointments } from '@/db/schema';
import { eq, and, ne } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get('date');

  if (!dateStr) {
    return NextResponse.json({ error: 'Date is required' }, { status: 400 });
  }

  // 1. Get weekly schedule from settings
  const scheduleSetting = await db.select().from(doctorSettings).where(eq(doctorSettings.key, 'weekly_schedule'));
  let weeklySchedule: Record<number, string[]> = {};
  
  if (scheduleSetting.length > 0) {
    try {
      weeklySchedule = JSON.parse(scheduleSetting[0].value);
    } catch {}
  } else {
    // Default schedule if doctor hasn't set one yet
    weeklySchedule = {
      0: [], // Sunday
      1: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'], // Mon
      2: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'], // Tue
      3: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'], // Wed
      4: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'], // Thu
      5: ['14:00', '15:00', '16:00'], // Fri
      6: [], // Saturday
    };
  }

  // 2. Compute day of week (0 = Sunday, 1 = Monday...)
  const dateObj = new Date(dateStr);
  const dayOfWeek = dateObj.getDay();
  const rawSlots = weeklySchedule[dayOfWeek] || [];

  // 3. Find booked slots (we only filter out confirmed or completed slots)
  const bookedAppointments = await db
    .select({ time: appointments.preferredTime })
    .from(appointments)
    .where(
      and(
        eq(appointments.preferredDate, dateStr),
        ne(appointments.status, 'cancelled') // Everything except cancelled occupies a slot
      )
    );

  const bookedTimes = new Set(bookedAppointments.map(a => a.time).filter(Boolean));

  // 4. Return available slots
  const availableSlots = rawSlots.filter(slot => !bookedTimes.has(slot));

  return NextResponse.json({ availableSlots });
}
