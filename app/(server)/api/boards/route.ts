import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("todo-app");
    const boards = await db.collection("boards").find({}).sort({ order: 1 }).toArray();
    return Response.json(boards);
  } catch (error) {
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
