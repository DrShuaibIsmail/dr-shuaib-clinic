import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { appointments } from '@/db/schema';
import { sendTelegramMessage, formatAppointmentNotification } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { patientName, patientPhone, patientEmail, age, location, symptoms, hasMedicalTests, consultationType, preferredDate, preferredTime, notes, language, contactMethod } = body;

    if (!patientName || !patientPhone || !consultationType || !preferredDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to database
    const [appointment] = await db.insert(appointments).values({
      patientName,
      patientPhone,
      patientEmail,
      age: age ? parseInt(age) : undefined,
      location,
      symptoms,
      hasMedicalTests,
      consultationType,
      preferredDate,
      preferredTime,
      notes,
      contactMethod,
      language: language || 'ar',
    }).returning();

    // Send Telegram notification
    const message = formatAppointmentNotification({
      patientName,
      patientPhone,
      consultationType,
      preferredDate,
      preferredTime,
      notes,
      contactMethod,
    });
    await sendTelegramMessage(message);

    return NextResponse.json({ success: true, id: appointment.id }, { status: 201 });
  } catch (error) {
    console.error('Appointment creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
