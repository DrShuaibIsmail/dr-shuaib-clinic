import { config } from 'dotenv';
config({ path: '.env.local' });

import { Bot } from 'grammy';
import { askAi } from './src/lib/ai-router';
import { getRecentChatHistory, saveMessage } from './src/lib/bot-memory';

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) throw new Error('TELEGRAM_BOT_TOKEN is not set');

const bot = new Bot(token);

// In-memory store just for local testing to bypass Neon DB connection issues
const localMemory = new Map<string, { role: 'user' | 'assistant', content: string }[]>();

bot.on('message:text', async (ctx) => {
  const chatId = ctx.chat.id.toString();
  const userText = ctx.message.text;

  console.log(`[Message from ${chatId}]: ${userText}`);
  await ctx.replyWithChatAction('typing');

  try {
    const history = localMemory.get(chatId) || [];
    const messages = [...history, { role: 'user' as const, content: userText }];
    
    // Save to local memory
    localMemory.set(chatId, messages);
    
    // Also try to save to DB (will fail silently if ECONNREFUSED)
    saveMessage('telegram', chatId, 'user', userText).catch(() => {});

    const aiResponse = await askAi(messages);

    await ctx.reply(aiResponse);
    console.log(`[Bot replied to ${chatId}]`);

    // Save AI response
    messages.push({ role: 'assistant', content: aiResponse });
    localMemory.set(chatId, messages);
    saveMessage('telegram', chatId, 'assistant', aiResponse).catch(() => {});

  } catch (error) {
    console.error("Bot Error:", error);
    await ctx.reply("عذراً، أواجه مشكلة تقنية حالياً.");
  }
});


// Delete webhook so polling works
bot.api.deleteWebhook().then(() => {
  console.log('🤖 بدء تشغيل البوت محلياً (وضع الاختبار)...');
  bot.start();
}).catch(console.error);

