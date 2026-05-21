import { db } from '../db'; // Assumes src/db/index.ts exports db
import { chatHistory } from '../db/schema';
import { eq, desc } from 'drizzle-orm';

export async function getRecentChatHistory(platform: string, chatId: string, limit: number = 10) {
  try {
    const history = await db.query.chatHistory.findMany({
      where: (history, { eq, and }) => and(eq(history.platform, platform), eq(history.chatId, chatId)),
      orderBy: (history, { desc }) => [desc(history.createdAt)],
      limit: limit,
    });
    // Reverse because we want chronological order for the AI (oldest first in the array)
    return history.reverse().map(h => ({
      role: h.role as 'user' | 'assistant',
      content: h.content,
    }));
  } catch (err) {
    console.error("Error fetching chat history:", err);
    return [];
  }
}

export async function saveMessage(platform: string, chatId: string, role: 'user' | 'assistant', content: string) {
  try {
    await db.insert(chatHistory).values({
      platform,
      chatId,
      role,
      content,
    });
  } catch (err) {
    console.error("Error saving message:", err);
  }
}
