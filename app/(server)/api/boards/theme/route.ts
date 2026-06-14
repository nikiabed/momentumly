import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const client = await clientPromise;
  const db = client.db("todo-app");

  const { boardId, theme } = await req.json();

  if (!boardId || !theme) {
    return NextResponse.json(
      { message: "Missing data" },
      { status: 400 }
    );
  }

  if (!ObjectId.isValid(boardId)) {
    return NextResponse.json(
      { message: "Invalid boardId" },
      { status: 400 }
    );
  }

  try {
    const result = await db.collection("boards").updateOne(
      { _id: new ObjectId(boardId) },
      {
        $set: { theme },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Board not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Theme updated",
      success: true,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}