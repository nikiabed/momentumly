import { auth } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/mongodb";
import Todo from "@/app/models/Todo";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, context: any) {
  await connectDB();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  const body = await req.json();
  console.log(body);
  const update: Record<string, any> = {};

  if (body.attachment !== undefined) {
    update.attachment = body.attachment;
  }
  if (body.deadline !== undefined) {
    update.deadline = body.deadline;
  }
  if (body.myDayDate !== undefined) {
    update.myDayDate = body.myDayDate;
  }
  if (body.boardKey !== undefined) {
    update.boardKey = body.boardKey;
  }

  const result = await Todo.findOneAndUpdate(
    {
      _id: id,
      userId: session.user.id,
    },
    {
      $set: update,
    },
    {
      returnDocument: "after",
    },
  );

  if (!result) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    todo: result,
  });
}
