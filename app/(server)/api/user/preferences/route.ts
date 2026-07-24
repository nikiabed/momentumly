import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import User from "@/app/models/User";
import { connectDB } from "@/app/lib/mongodb";

export async function GET() {
  console.log("🔥 GET PREF HIT");

  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const user = await User.findById(session.user.id);

  return NextResponse.json({
    systemBoards: user.preferences?.systemBoards ?? {},
  });
}

export async function PATCH(req: Request) {
  console.log("🔥 PATCH PREF HIT");

  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  await connectDB();

  const user = await User.findById(session.user.id);
  console.log("PATCH BODY", body);
  console.log("BEFORE", user.preferences);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  user.preferences = {
    systemBoards: {
      ...user.preferences?.systemBoards,
      [body.boardKey]: {
        theme: body.theme,
      },
    },
  };
  console.log("AFTER", user.preferences);

  await user.save();

  return NextResponse.json({
    success: true,
    preferences: user.preferences,
  });
}
