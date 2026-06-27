import { connectDB } from "@/app/lib/mongodb";
import Todo from "@/app/models/Todo";
import { auth } from "@/app/lib/auth";

export async function GET() {
  await connectDB();
  const session = await auth();
  const todos = await Todo.find({ userId: session?.user?.id });
  return Response.json(todos);
}

export async function POST(req: Request) {
  await connectDB();

  const session = await auth();
  console.log("POST SESSION:", session);

  const body = await req.json();
  console.log("POST BODY:", body);

  const result = await Todo.create({
    ...body,
    userId: session?.user?.id,
  });

  console.log("CREATED TODO:", result);

  return Response.json(result);
}
