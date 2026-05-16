import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { contactMessages } from '@/db/schema';
import { sendTelegramMessage, formatContactNotification } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await db.insert(contactMessages).values({ name, email, phone, message });

    const notification = formatContactNotification({ name, email, phone, message });
    await sendTelegramMessage(notification);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Contact message error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
