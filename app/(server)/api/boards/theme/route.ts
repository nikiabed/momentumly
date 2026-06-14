import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
 const client = await clientPromise
 const db = client.db("todo-app")
  const { boardId, theme } = await req.json();

  if (!boardId || !theme) {
    return NextResponse.json(
      { message: "Missing data" },
      { status: 400 }
    );
  }

  await db.collection("boards").updateOne(
    {  _id: new ObjectId(boardId) },
    {
      $set: {
        theme,
      },
    }
  );

  return NextResponse.json({
    message: "Theme updated",
    success: true,
  });
}