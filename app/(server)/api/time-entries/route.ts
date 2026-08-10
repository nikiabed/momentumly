import { auth } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/mongodb";
import Todo from "@/app/models/Todo";
import { TodoEntry } from "@/app/models/TodoEntry";
import { NextResponse } from "next/server";

type CreateTodoEntryBody = {
  todoId?: string;
  date?: string;
  durationSeconds?: number;
};

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();

    const entries = await TodoEntry.find({
      userId: session.user.id,
    }).sort({ date: 1 });

    return NextResponse.json({
      ok: true,
      entries,
    });
  } catch (error) {
    console.error("GET TIME ENTRIES ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch time entries" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();

    const body: CreateTodoEntryBody = await req.json();

    const { todoId, date, durationSeconds } = body;

    if (!todoId) {
      return NextResponse.json(
        { error: "todoId is required" },
        { status: 400 },
      );
    }

    if (!date) {
      return NextResponse.json({ error: "date is required" }, { status: 400 });
    }

    if (
      durationSeconds === undefined ||
      typeof durationSeconds !== "number" ||
      durationSeconds <= 0
    ) {
      return NextResponse.json(
        { error: "durationSeconds must be a positive number" },
        { status: 400 },
      );
    }

    const todo = await Todo.findOne({
      _id: todoId,
      userId: session.user.id,
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    const entry = await TodoEntry.findOneAndUpdate(
      {
        todoId,
        userId: session.user.id,
        date,
      },
      {
        $set: {
          durationSeconds,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    return NextResponse.json({
      ok: true,
      entry,
    });
  } catch (error) {
    console.error("POST TIME ENTRY ERROR:", error);

    return NextResponse.json(
      { error: "Failed to save time entry" },
      { status: 500 },
    );
  }
}
