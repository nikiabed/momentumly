import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Board from "@/app/models/Board";
import { auth } from "@/app/lib/auth";

export async function GET() {
  try {
    await connectDB();
     const session = await auth();
    const boards = await Board.find({userId: session?.user?.id}).sort({ order: 1 });
    return NextResponse.json(boards);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch boards" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    let result;
    if (Array.isArray(body)) {
      result = await Board.insertMany(body);
    } else {
      result = await Board.create(body);
    }

    return NextResponse.json({
      ok: true,
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create board" },
      { status: 500 },
    );
  }
}
