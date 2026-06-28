import { auth } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/mongodb";
import Todo from "@/app/models/Todo";

export async function PATCH(req: Request, context: any) {
  await connectDB();
  const { params } = context;
  const { id } = await params;
  const session = await auth();
  const body = await req.json();

  const result = await Todo.findByIdAndUpdate(
    {
      _id: id,
      userId: session?.user?.id, // مهم
    },
    {
      $set: {
        attachment: body.attachment,
      },
    },
    { new: true },
  );

  if (!result) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }

  return Response.json({ ok: true });
}
