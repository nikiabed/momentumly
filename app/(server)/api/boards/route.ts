import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Board from "@/app/models/Board";
import { auth } from "@/app/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json([], { status: 200 });
    }
    await connectDB();

    let boards = await Board.find({
      userId: session.user.id,
    }).lean();

    if (!boards.length) {
      const defaultBoards = [
        {
          title: "My Day",
          boardKey: "myDay",
          icon: "Sun1",
          color: "myDay",
          order: 0,
          state: true,
          editable: false,
          isEdit: false,
          theme: "sunset",
          userId: session.user.id,
        },
        {
          title: "All",
          boardKey: "all",
          icon: "Card",
          color: "all",
          order: 1,
          state: false,
          editable: false,
          isEdit: false,
          theme: "lavender",
          userId: session.user.id,
        },
        {
          title: "Complete",
          boardKey: "complete",
          icon: "TickCircle",
          color: "complete",
          order: 2,
          state: false,
          editable: false,
          isEdit: false,
          theme: "ocean",
          userId: session.user.id,
        },
        {
          title: "Progress",
          boardKey: "progress",
          icon: "Chart",
          color: "progress",
          order: 3,
          state: false,
          editable: false,
          isEdit: false,
          theme: "mint",
          userId: session.user.id,
        },
      ];

      await Board.insertMany(defaultBoards);

      boards = defaultBoards;
    }

    return NextResponse.json(boards);
  } catch (err) {
    console.error("GET BOARDS ERROR:", err);
    return NextResponse.json([], { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    if (!body?.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const board = await Board.create({
      ...body,
      userId: session.user.id,
    });

    return NextResponse.json(board, { status: 201 });
  } catch (error: any) {
    console.error("POST /board error:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error?.message ?? "Unknown error",
      },
      { status: 500 },
    );
  }
}
