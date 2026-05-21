import { GoogleGenerativeAI } from '@google/generative-ai';

const gemini = new GoogleGenerativeAI('AIzaSyC2QWik9eY5kZDyMmoh4cw5-WdfBakJpn4');

async function test() {
  try {
    const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("أجب بكلمة واحدة: مرحبا");
    console.log("Gemini 1.5 Flash Success:", result.response.text());
  } catch (e: any) {
    console.error("Gemini 1.5 Flash Error:", e.message);
  }
}

test();
