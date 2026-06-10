import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req: Request) {
  const { id, isImportant } = await req.json();

  const client = await clientPromise;
  const db = client.db("todo-app");

  await db.collection("todos").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        isImportant,
      },
    },
  );

  return Response.json({ ok: true });
}