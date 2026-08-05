import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function GET() {
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "Explain AI in one sentence",
        },
      ],
      model: "llama-3.1-8b-instant",
    });

    return NextResponse.json({
      answer: completion.choices[0].message.content,
    });

  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}