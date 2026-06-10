import clientPromise from "@/app/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
 const client = await clientPromise
 const db = client.db("yourDB")
 const todos = await db
  .collection("todos")
  .find({})
  .toArray()
 return Response.json(todos)
}

export async function POST(req: Request) {
 const body = await req.json()
 const client = await clientPromise
 const db = client.db("yourDB")
 const result = await db
  .collection("todos")
  .insertOne({
   ...body,
   createdAt: new Date(),
  })
 return Response.json(result)
}

export async function PUT(req: Request) {
 const body = await req.json()
 const client = await clientPromise
 const db = client.db("yourDB")
 const { id, ...updateData } = body
 await db
  .collection("todos")
  .updateOne(
   { _id: new ObjectId(id) },
   { $set: updateData }
  )
 return Response.json({ ok: true })
}