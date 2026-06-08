import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const boards = await client.db().collection("boards").find({}).toArray();

  return NextResponse.json(boards);
}

export async function POST(req: Request) {
  const body = await req.json();
  const client = await clientPromise;

  if (Array.isArray(body)) {
    await client.db().collection("boards").insertMany(body);
  } else {
    await client.db().collection("boards").insertOne(body);
  }

  return Response.json({
    ok: true,
  });
}
