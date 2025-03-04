import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { User } from "@/app/db/models/User";

export async function GET(req) {
  try {
    await connectToDB();

    const users = await User.find({});

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
