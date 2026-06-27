import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/mongodb";
import Board from "@/app/models/Board";

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { boardId, theme } = await req.json();
    if (!boardId || !theme) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }
    const board = await Board.findOneAndUpdate(
      {
        _id: boardId,
        userId: session?.user?.id,
      },
      {
        theme,
      },
      {
        new: true,
      },
    );

    if (!board) {
      return NextResponse.json({ message: "Board not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      board,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
