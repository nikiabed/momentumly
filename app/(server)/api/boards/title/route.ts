import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req: Request) {
  const { id, title } = await req.json();
  const client = await clientPromise;
  const db = client.db("todo-app");
  await db.collection("boards").updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        title,
        isEdit: false,
      },
    },
  );

  return Response.json({
    ok: true,
  });
}
