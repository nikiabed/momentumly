import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { task } = await req.json();

    if (!task) {
      return NextResponse.json(
        {
          error: "Task is required",
        },
        {
          status: 400,
        },
      );
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",

      messages: [
        {
          role: "system",
          content: `
You are an ADHD productivity assistant.

Break the user's task into small actionable steps.

Rules:
- Make steps very small.
- Each step should take 5-30 minutes.
- Avoid vague steps.
- Return JSON only.

Format:

{
 "steps":[
   {
    "title":"",
    "description":"",
    "estimatedMinutes":0
   }
 ]
}
`,
        },

        {
          role: "user",
          content: task,
        },
      ],

      response_format: {
        type: "json_object",
      },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI ERROR:", error);

    return NextResponse.json(
      {
        error: "AI failed",
        details: error instanceof Error ? error.message : error,
      },
      {
        status: 500,
      },
    );
  }
}
