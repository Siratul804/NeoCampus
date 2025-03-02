import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { User } from "@/app/db/models/User";

export async function POST(req) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    const body = await req.json();
    const {
      clerkId,
      email,
      name,
      profilePicture,
      role,
      department,
      notifications,
    } = body;

    // Validate required fields
    if (!clerkId || !email || !name) {
      return NextResponse.json(
        { error: "clerkId, email, and name are required." },
        { status: 400 }
      );
    }

    await connectToDB();

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ clerkId }, { email }] });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this clerkId or email already exists." },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = new User({
      clerkId,
      email,
      name,
      profilePicture: profilePicture || "",
      role: role || "student",
      department: department || "",
      notifications: notifications || [],
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
