import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function GET() {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: "Explain AI in one sentence",
    });

    return NextResponse.json({
      answer: response.text,
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
