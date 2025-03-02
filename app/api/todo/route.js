import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { ToDo } from "@/app/db/models/ToDo";

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
      type,
      title,
      description,
      courseName,
      dueDate,
      status,
      priority,
    } = body;

    // Validate required fields
    if (!clerkId || !type || !title || !courseName || !dueDate) {
      return NextResponse.json(
        {
          error: "clerkId, type, title, courseName, and dueDate are required.",
        },
        { status: 400 }
      );
    }

    // Ensure valid status and priority values
    const validTypes = ["assignment", "exam"];
    const validStatuses = ["pending", "completed", "overdue"];
    const validPriorities = ["low", "medium", "high"];

    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: "Invalid type provided." },
        { status: 400 }
      );
    }
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status provided." },
        { status: 400 }
      );
    }
    if (priority && !validPriorities.includes(priority)) {
      return NextResponse.json(
        { error: "Invalid priority provided." },
        { status: 400 }
      );
    }

    await connectToDB();

    // Create a new To-Do task
    const newToDo = new ToDo({
      clerkId,
      type,
      title,
      description,
      courseName,
      dueDate,
      status: status || "pending",
      priority: priority || "medium",
    });

    await newToDo.save();

    return NextResponse.json(
      { message: "To-Do task added successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding To-Do task:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
