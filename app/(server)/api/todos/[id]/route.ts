import { auth } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/mongodb";
import Todo from "@/app/models/Todo";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, context: any) {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { params } = context;
  const { id } = params;

  const body = await req.json();

  const result = await Todo.findOneAndUpdate(
    {
      _id: id,
      userId: session.user.id,
    },
    {
      $set: {
        attachment: body.attachment,
      },
    },
    { new: true }
  );

  if (!result) {
    return NextResponse.json(
      { error: "Todo not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    todo: result,
  });
}