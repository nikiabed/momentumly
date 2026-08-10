import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { auth } from "@/app/lib/auth";

import Board from "@/app/models/Board";

export async function PUT(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();

    const { id, title } = await req.json();

    if (!id || !title) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const updated = await Board.findOneAndUpdate(
      {
        _id: id,
        userId: session.user.id,
      },
      {
        title,
      },
      { new: true },
    );

    if (!updated) {
      return NextResponse.json({ message: "Board not found" }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      board: updated,
    });
  } catch (err) {
    console.error("Update board error:", err);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
