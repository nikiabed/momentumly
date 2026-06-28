import { auth } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/mongodb";
import Todo from "@/app/models/Todo";

export async function PATCH(req: Request, context: any) {
  await connectDB();
  const { params } = context;
  const { id } = await params;
  const session = await auth();
  const body = await req.json();

  const result = await Todo.findOneAndUpdate(
    {
      _id: id,
      userId: session?.user?.id,
    },
    { $set: body },
  );

  return Response.json({ ok: true });
}
