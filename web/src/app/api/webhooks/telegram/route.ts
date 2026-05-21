import { Bot, webhookCallback } from 'grammy';
import { askAi } from '@/lib/ai-router';
import { getRecentChatHistory, saveMessage } from '@/lib/bot-memory';

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) throw new Error('TELEGRAM_BOT_TOKEN is not set');

export const bot = new Bot(token);

bot.on('message:text', async (ctx) => {
  const chatId = ctx.chat.id.toString();
  const userText = ctx.message.text;

  // Show typing indicator
  await ctx.replyWithChatAction('typing');

  try {
    // 1. Fetch recent history
    const history = await getRecentChatHistory('telegram', chatId, 10);
    
    // 2. Add current message to history for AI
    const messages = [...history, { role: 'user' as const, content: userText }];
    
    // 3. Save user message to DB asynchronously
    saveMessage('telegram', chatId, 'user', userText);

    // 4. Get response from AI (Gemini -> Groq fallback)
    const aiResponse = await askAi(messages);

    // 5. Reply to user
    await ctx.reply(aiResponse);

    // 6. Save AI response to DB
    saveMessage('telegram', chatId, 'assistant', aiResponse);

  } catch (error) {
    console.error("Bot Error:", error);
    await ctx.reply("عذراً، أواجه مشكلة تقنية حالياً. يرجى المحاولة لاحقاً أو حجز استشارة مباشرة عبر الموقع: https://drshuaib.netlify.app/ar/book");
  }
});

export const POST = webhookCallback(bot, 'std/http');
