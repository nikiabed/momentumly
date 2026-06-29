import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { auth } from "@/app/lib/auth";
import Todo from "@/app/models/Todo";

export async function GET() {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const todos = await Todo.find({
    userId: session.user.id,
  });

  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const result = await Todo.create({
    ...body,
    userId: session.user.id,
  });

  return NextResponse.json(result);
}