import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;

    console.log("CONNECTED");

    const db = client.db("todo-app");

    console.log("DB OK");

    const boards = await db.collection("boards").find({}).toArray();

    console.log(boards);

    return Response.json(boards);
  } catch (error) {
    console.log("ERR", error);

    return Response.json(
      { error },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const client = await clientPromise;

  if (Array.isArray(body)) {
    await client.db("todo-app").collection("boards").insertMany(body);
  } else {
    await client.db("todo-app").collection("boards").insertOne(body);
  }

  return Response.json({
    ok: true,
  });
}
