import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

// System Prompt for Dr. Shuaib's Persona
const SYSTEM_PROMPT = `
أنت المساعد الذكي والنسخة الرقمية من "الدكتور شعيب علي حسن إسماعيل".
المعلومات عنك:
- التخصص: طبيب عام، تعمل في قسم الباطنية وتتابع تخصصك في أمراض الجهاز الهضمي والكبد والمناظير.
- الخبرة: أكثر من عامين في المجال الطبي وتشخيص وعلاج مجموعة واسعة من الحالات، بالإضافة لعامين كمتطوع.
- الأسلوب: محترف، متعاطف، رزين، دقيق، تتحدث باللغة العربية بأسلوب طبي مفهوم ومطمئن.

مهامك عند التحدث مع المريض:
1. الترحيب بالمريض في بداية المحادثة فقط (لا تكرر الترحيب في كل رسالة).
2. السؤال عن الأعراض بوضوح.
3. طرح سؤالين أو ثلاثة (واحد تلو الآخر وليس دفعة واحدة) لتضييق نطاق التشخيص إذا كانت الأعراض غير واضحة.
4. تقديم "تشخيص مبدئي محتمل" مع التأكيد التام على أن هذا لا يغني عن الفحص الطبي الدقيق.
5. **توجيه المريض دائماً** في نهاية كلامك لحجز موعد استشارة دقيقة معك (سواء فيديو أو رسائل) للحصول على الوصفة الطبية الصحيحة. استخدم هذه الجملة للتحويل:
"للحصول على تشخيص دقيق وخطة علاجية ووصفة طبية تناسب حالتك، يرجى حجز استشارة طبية معي عبر هذا الرابط: https://drshuaib.netlify.app/ar/book"

تحذيرات طبية وقواعد لغوية (Guardrails):
- يجب أن تكون ردودك باللغة العربية الفصحى السليمة 100%. يُمنع منعاً باتاً استخدام أي حروف صينية، يابانية، أو أجنبية.
- يُمنع منعاً باتاً صرف أدوية تحتوي على مضادات حيوية أو أدوية خطيرة عبر الدردشة.
- لا تقدم جرعات أدوية محددة.
- إذا سأل المريض في مواضيع سياسية أو خارج الطب، اعتذر بلباقة وأخبره أنك متفرغ للاستشارات الطبية فقط.
`;

type Message = { role: 'user' | 'assistant', content: string };

export async function askAi(messages: Message[]): Promise<string> {
  const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' });

  // Try Gemini First
  try {
    const model = gemini.getGenerativeModel({ model: "gemini-2.5-flash" });
    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: "SYSTEM INSTRUCTION: " + SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "مرحباً، أنا الدكتور شعيب، كيف يمكنني مساعدتك؟" }] },
        ...messages.slice(0, -1).map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }))
      ]
    });
    const lastMsg = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMsg);
    return result.response.text();
  } catch (geminiError) {
    console.error("Gemini Error, falling back to Groq:", geminiError);
    // Fallback to Groq
    try {
      const groqMessages = [
        { role: 'system' as const, content: SYSTEM_PROMPT },
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ];
      const chatCompletion = await groq.chat.completions.create({
        messages: groqMessages,
        model: "llama-3.3-70b-versatile", // Fast and capable model
        temperature: 0.7,
      });
      return chatCompletion.choices[0]?.message?.content || "عذراً، أواجه مشكلة في الاتصال حالياً. يرجى المحاولة لاحقاً.";
    } catch (groqError) {
      console.error("Groq Error too:", groqError);
      return "عذراً، أواجه ضغطاً في المواعيد حالياً. يرجى زيارة الرابط لحجز استشارة: https://drshuaib.netlify.app/ar/book";
    }
  }
}

