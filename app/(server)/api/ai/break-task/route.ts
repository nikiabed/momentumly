import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { task } = await req.json();

    if (!task) {
      return NextResponse.json({ error: "Task is required" }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      response_format: {
        type: "json_object",
      },

      messages: [
        {
          role: "system",
          content: `
You are an ADHD productivity assistant.

Your job is to transform overwhelming tasks into small actionable next steps.

Important rules:
- Do not create a high-level project plan.
- Create small steps that the user can start immediately.
- Avoid vague actions like "research", "write", "prepare".
- The first step should be very easy and reduce resistance.
- Prefer steps that take less than 30 minutes.
- If the task is large, split it into phases.
- Maximum 5 steps.
- Consider motivation and cognitive load.

Return JSON with this exact structure:

{
  "steps": [
    {
      "title": "short action name",
      "description": "clear explanation of what to do",
      "estimatedTime": "example: 10 minutes",
      "difficulty": "easy"
    }
  ]
}

difficulty can only be:
easy, medium, hard
          `,
        },
        {
          role: "user",
          content: task,
        },
      ],

      temperature: 0.3,
    });

    const content = completion.choices[0].message.content;

    const result = JSON.parse(content ?? '{"steps":[]}');

    return NextResponse.json(result);
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: "AI failed",
        details: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
