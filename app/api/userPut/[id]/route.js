import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { User } from "@/app/db/models/User";

export async function PUT(req, { params }) {
  try {
    const { id } = await params; // Get ID from URL params

    if (!id) {
      return NextResponse.json(
        { error: "clerkId is required in the request URL." },
        { status: 400 }
      );
    }

    // Parse the incoming request body (assuming JSON data is sent)
    const updatedData = await req.json();

    // Validate the incoming data if necessary (you can add more fields)
    if (
      !updatedData.department ||
      !updatedData.Section ||
      !updatedData.Semester
    ) {
      return NextResponse.json(
        { error: "Department, Section, and Semester are required to update." },
        { status: 400 }
      );
    }

    await connectToDB();

    // Find the user and update the fields
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      { $set: updatedData },
      { new: true, select: "department Section Semester" } // Ensure only the necessary fields are returned
    );

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
