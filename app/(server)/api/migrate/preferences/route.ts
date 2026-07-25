import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const before = await User.find({});
    const result = await User.updateMany(
      {},
      {
        $set: {
          "preferences.systemBoards.important.theme": "fire",
          "preferences.systemBoards.search.theme": "purple",
        },
      },
    );

    const after = await User.find({});

    return NextResponse.json({
      message: "preferences updated",
      modified: result.modifiedCount,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
