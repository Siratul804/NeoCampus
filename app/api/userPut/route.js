import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { User } from "@/app/db/models/User";

export async function PUT(req) {
  try {
    // Ensure method is PUT
    if (req.method !== "PUT") {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { clerkId, email, name, isAdmin, department, Section, Semester } =
      body;

    // Validate required fields (at least one of clerkId or email should be provided)
    if (!clerkId && !email) {
      return NextResponse.json(
        { error: "clerkId or email is required to update." },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDB();

    // Find the user by clerkId or email
    const userToUpdate = await User.findOne({ $or: [{ clerkId }, { email }] });

    // Check if the user exists
    if (!userToUpdate) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Update fields if provided, else retain the existing values
    userToUpdate.name = name || userToUpdate.name;
    userToUpdate.isAdmin =
      isAdmin !== undefined ? isAdmin : userToUpdate.isAdmin;
    userToUpdate.department = department || userToUpdate.department;
    userToUpdate.Section = Section || userToUpdate.Section;
    userToUpdate.Semester = Semester || userToUpdate.Semester;

    // Save the updated user
    await userToUpdate.save();

    // Return success response
    return NextResponse.json(
      { message: "User updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    // Log and return error if something goes wrong
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
