import { auth } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/mongodb";
import Todo from "@/app/models/Todo";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type TodoUpdate = {
  title?: string;
  status?: boolean;
  completedAt?: Date | null;
  isImportant?: boolean;
  boardKey?: string | null;
  myDayDate?: string | null;
  deadline?: Date | null;
  attachment?: string | null;
  isEdit?: boolean;
  completionSource?: "realtime" | "manual" | null;
  trackedTimeSeconds?: number;
};

export async function PATCH(req: Request, context: RouteContext) {
  await connectDB();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  const body = await req.json();
  const update: TodoUpdate = {};

  if (body.title !== undefined) {
    update.title = body.title;
  }

  if (body.status !== undefined) {
    update.status = body.status;
    if (body.status) {
      update.completedAt = body.completedAt
        ? new Date(body.completedAt)
        : new Date();
    } else {
      update.completedAt = null;
    }
  }
  if (body.completionSource !== undefined) {
    update.completionSource = body.completionSource;
  }

  if (body.isImportant !== undefined) {
    update.isImportant = body.isImportant;
  }

  if (body.boardKey !== undefined) {
    update.boardKey = body.boardKey;
  }

  if (body.myDayDate !== undefined) {
    update.myDayDate = body.myDayDate;
  }

  if (body.deadline !== undefined) {
    update.deadline = body.deadline;
  }

  if (body.attachment !== undefined) {
    update.attachment = body.attachment;
  }

  if (body.isEdit !== undefined) {
    update.isEdit = body.isEdit;
  }
  const inc: Record<string, number> = {};

  if (body.addTrackedTimeSeconds !== undefined) {
    inc.trackedTimeSeconds = body.addTrackedTimeSeconds;
  }

  const mongoUpdate: any = {};

  if (Object.keys(update).length) {
    mongoUpdate.$set = update;
  }

  if (Object.keys(inc).length) {
    mongoUpdate.$inc = inc;
  }

  const result = await Todo.findOneAndUpdate(
    {
      _id: id,
      userId: session.user.id,
    },
    mongoUpdate,
    {
      returnDocument: "after",
    },
  );

  console.log("DB AFTER UPDATE", result.trackedTimeSeconds);

  if (!result) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    todo: result,
  });
}

export async function DELETE(req: Request, context: RouteContext) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { id } = await context.params;

  const result = await Todo.findOneAndDelete({
    _id: id,
    userId: session.user.id,
  });

  if (!result) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  await Todo.deleteMany({
    parentTodoId: id,
    userId: session.user.id,
  });

  return NextResponse.json({
    ok: true,
  });
}
