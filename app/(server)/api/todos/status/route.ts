import clientPromise from "@/app/lib/mongodb"
import { ObjectId } from "mongodb"

export async function PUT(req: Request) {
 const { id, status } = await req.json()

 const client = await clientPromise
 const db = client.db("todo-app")

 await db.collection("todos").updateOne(
  { _id: new ObjectId(id) },
  {
   $set: {
    status: !!status
   }
  }
 )

 return Response.json({ ok: true })
}