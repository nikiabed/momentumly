import { connectDB } from "@/app/lib/mongodb";
import Todo from "@/app/models/Todo";

export async function GET() {
  await connectDB();
  const todos = await Todo.find();
  return Response.json(todos);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const result = await Todo.create(body);
  return Response.json(result);
}
