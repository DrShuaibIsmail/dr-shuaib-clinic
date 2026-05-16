const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

export async function sendTelegramMessage(message: string): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram not configured. Skipping notification.');
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });
    return res.ok;
  } catch (error) {
    console.error('Telegram send error:', error);
    return false;
  }
}

export function formatAppointmentNotification(data: {
  patientName: string;
  patientPhone: string;
  age?: number;
  location?: string;
  symptoms?: string;
  hasMedicalTests?: boolean;
  consultationType: string;
  preferredDate: string;
  preferredTime?: string;
  notes?: string;
  contactMethod?: string;
}): string {
  return `
🏥 <b>حجز موعد جديد</b>

👤 <b>الاسم:</b> ${data.patientName} ${data.age ? `(العمر: ${data.age} سنة)` : ''}
📱 <b>الهاتف:</b> ${data.patientPhone}
${data.location ? `📍 <b>المدينة:</b> ${data.location}` : ''}
${data.contactMethod ? `💬 <b>التواصل المفضل:</b> ${data.contactMethod}` : ''}
🩺 <b>نوع الاستشارة:</b> ${data.consultationType}
${data.symptoms ? `\n🤒 <b>الأعراض/الشكوى:</b>\n${data.symptoms}` : ''}
${data.hasMedicalTests ? `\n📁 <b>يوجد فحوصات طبية سابقة جاهزة للإرسال</b>` : ''}

📅 <b>الموعد المفضل:</b> ${data.preferredDate} ${data.preferredTime ? `| ⏰ ${data.preferredTime}` : ''}
${data.notes ? `📝 <b>ملاحظات:</b> ${data.notes}` : ''}

🔔 يرجى تأكيد أو إلغاء الموعد من لوحة التحكم.
  `.trim();
}

export function formatContactNotification(data: {
  name: string;
  phone?: string;
  email?: string;
  message: string;
}): string {
  return `
✉️ <b>رسالة جديدة من الموقع</b>

👤 <b>الاسم:</b> ${data.name}
${data.phone ? `📱 <b>الهاتف:</b> ${data.phone}` : ''}
${data.email ? `📧 <b>البريد:</b> ${data.email}` : ''}
💬 <b>الرسالة:</b>
${data.message}
  `.trim();
}
