import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { ClassSchedule } from "@/app/db/models/ClassSchedule";

export async function POST(req) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    const body = await req.json();
    const { clerkId, courseName, courseCode, faculty, days, time } = body;

    // Validate required fields
    if (!clerkId || !courseName || !courseCode || !faculty || !days || !time) {
      return NextResponse.json(
        {
          error:
            "clerkId, courseName, courseCode, faculty, days, and time are required.",
        },
        { status: 400 }
      );
    }

    await connectToDB();

    // Check if class schedule already exists for the faculty
    const existingSchedule = await ClassSchedule.findOne({ faculty });

    if (existingSchedule) {
      return NextResponse.json(
        { error: "A schedule for this faculty already exists." },
        { status: 409 }
      );
    }

    // Create new class schedule
    const newSchedule = new ClassSchedule({
      clerkId,
      courseName,
      courseCode,
      faculty,
      days,
      time,
    });

    await newSchedule.save();

    return NextResponse.json(
      { message: "Class schedule added successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding class schedule:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
