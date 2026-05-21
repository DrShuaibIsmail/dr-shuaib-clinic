import { GoogleGenerativeAI } from '@google/generative-ai';

const gemini = new GoogleGenerativeAI('AIzaSyC2QWik9eY5kZDyMmoh4cw5-WdfBakJpn4');

async function test() {
  try {
    const models = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyC2QWik9eY5kZDyMmoh4cw5-WdfBakJpn4');
    const data = await models.json();
    console.log("Available models:", data.models.map((m: any) => m.name).join(', '));
  } catch (e: any) {
    console.error("Fetch Error:", e.message);
  }
}

test();
