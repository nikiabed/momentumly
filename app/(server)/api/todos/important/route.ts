import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { auth } from "@/app/lib/auth";
import Todo from "@/app/models/Todo";

export async function PUT(req: Request) {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id, isImportant } = await req.json();

    if (!id || typeof isImportant !== "boolean") {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const updated = await Todo.findOneAndUpdate(
      {
        _id: id,
        userId: session.user.id,
      },
      {
        isImportant,
      },
      { new: true },
    );

    if (!updated) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      todo: updated,
    });
  } catch (err) {
    console.error("PUT important error:", err);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
