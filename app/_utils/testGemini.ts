import { GoogleGenerativeAI } from "@google/generative-ai";

export async function testGemini() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite",
  });

  const result = await model.generateContent(
    "یک جمله کوتاه درباره برنامه نویسی بگو",
  );

  return result.response.text();
}
