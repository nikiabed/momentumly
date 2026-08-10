import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { auth } from "@/app/lib/auth";
import Todo from "@/app/models/Todo";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  await connectDB();


  const todos = await Todo.find({
    userId: session.user.id,
  })
    .select(
      "_id title status isImportant item boardKey isEdit myDayDate deadline attachment completedAt completionSource trackedTimeSeconds parentTodoId isAIStep createdAt updatedAt",
    )
    .lean();

  return NextResponse.json(todos);
}
export async function POST(req: Request) {
  
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const body = await req.json();
  const result = await Todo.create({
    ...body,
    userId: session.user.id,
  });

  return NextResponse.json(result);
}
