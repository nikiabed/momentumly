import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("todo-app");
  const todos = await db.collection("todos").find({}).toArray();
  return Response.json(todos);
}

export async function POST(req: Request) {
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db("todo-app");
  const result = await db.collection("todos").insertOne({
    ...body,
    createdAt: new Date(),
  });
  return Response.json(result);
}




