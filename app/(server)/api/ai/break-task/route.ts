import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { task, context } = await req.json();

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
You are an ADHD-focused task breakdown assistant.

Your job is NOT to create a project plan.
Your job is to convert a stressful task into tiny executable Todo items.

Think like a supportive productivity coach.

Rules:

1. Create actions that the user can physically start doing immediately.
2. The first step must be extremely easy and reduce starting resistance.
3. Each step must be a Todo, not a goal or milestone.
4. Avoid vague verbs:
   - research
   - analyze
   - prepare
   - work on
   - study
   unless you specify the exact action.
5. Each step should ideally take 5-30 minutes.
6. Maximum 5 steps.
7. Do not include explanations longer than necessary.
8. Do not create nested project phases.
9. If the task is large, start with the smallest first movement, not the whole solution.
10. Keep the user motivated, but do not add motivational text.

Example:

Task:
"Start my thesis after months of avoiding it"

Bad output:
[
"Collect theoretical background sources",
"Review literature",
"Write theoretical framework"
]

Good output:
[
{
"title":"Open thesis documents",
"description":"Open your thesis folder and find the latest thesis file.",
"estimatedTime":"5 minutes",
"difficulty":"easy"
},
{
"title":"Review previous notes",
"description":"Read only the last page of your previous thesis notes.",
"estimatedTime":"10 minutes",
"difficulty":"easy"
}
]

Return ONLY JSON:

{
 "steps":[
   {
    "title":"",
    "description":"",
    "estimatedTime":"",
    "difficulty":"easy|medium|hard"
   }
 ]
}
`,
        },
        {
          role: "user",
          content: `
Task:
${task}
Context:
${context || "No extra context"}
`,
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
