import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'No bot token found' }, { status: 500 });
  }

  // Get the host from the request
  const url = new URL(request.url);
  const protocol = url.protocol === 'http:' && url.hostname === 'localhost' ? 'https:' : url.protocol;
  // Note: Telegram requires HTTPS for webhooks. It won't work on localhost HTTP.
  const host = url.host;
  
  // The actual webhook URL
  const webhookUrl = `${protocol}//${host}/api/webhooks/telegram`;

  try {
    const telegramApiUrl = `https://api.telegram.org/bot${token}/setWebhook?url=${webhookUrl}`;
    const response = await fetch(telegramApiUrl);
    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Webhook configuration triggered',
      webhookUrl,
      telegramResponse: data
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
