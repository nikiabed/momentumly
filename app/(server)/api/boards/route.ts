import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Board from "@/app/models/Board";
import { auth } from "@/app/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const session = await auth();
    const boards = await Board.find({ userId: session?.user?.id }).sort({
      order: 1,
    });
    return NextResponse.json(boards);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch boards" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const board = await Board.create({
    ...body,
    userId: session.user.id,
  });

  return NextResponse.json(board);
}
