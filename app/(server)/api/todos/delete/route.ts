import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const client = await clientPromise;
  const db = client.db("todo-app");
  await db.collection("todos").deleteOne({
    _id: new ObjectId(id),
  });

  return Response.json({ ok: true });
}
