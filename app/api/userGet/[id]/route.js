import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { User } from "@/app/db/models/User";

export async function GET(req, { params }) {
  try {
    const { id } = params; // Get ID from URL params

    if (!id) {
      return NextResponse.json(
        { error: "clerkId is required in the request URL." },
        { status: 400 }
      );
    }

    await connectToDB();

    const user = await User.findOne(
      { clerkId: id },
      "department Section Semester"
    ); // Select only required fields

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
