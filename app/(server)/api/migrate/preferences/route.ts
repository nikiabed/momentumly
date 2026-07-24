import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const before = await User.find({});

    console.log("🔥 USERS BEFORE");
    console.log(JSON.stringify(before, null, 2));

    const result = await User.updateMany(
      {},
      {
        $set: {
          "preferences.systemBoards.important.theme": "fire",
          "preferences.systemBoards.search.theme": "purple",
        },
      },
    );

    console.log("🔥 UPDATE RESULT");
    console.log(result);

    const after = await User.find({});

    console.log("🔥 USERS AFTER");
    console.log(JSON.stringify(after, null, 2));

    return NextResponse.json({
      message: "preferences updated",
      modified: result.modifiedCount,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
