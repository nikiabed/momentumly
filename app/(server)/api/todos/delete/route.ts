import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { auth } from "@/app/lib/auth";
import Todo from "@/app/models/Todo";

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Missing id" }, { status: 400 });
    }

    const deleted = await Todo.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!deleted) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      deletedId: id,
    });
  } catch (err) {
    console.error("DELETE todo error:", err);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
