import { connectToDB } from "@/app/db/connection";
import { ToDo } from "@/app/db/models/ToDo";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params; // Extract clerkId from URL params

    // console.log("Fetching To-Do tasks for Clerk ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "Clerk ID is required." },
        { status: 400 }
      );
    }

    // Find To-Do tasks by clerkId
    const toDoTasks = await ToDo.find({ clerkId: id });

    if (!toDoTasks.length) {
      return NextResponse.json(
        { error: "No To-Do tasks found for this user." },
        { status: 404 }
      );
    }

    // console.log("Fetched To-Do tasks:", JSON.stringify(toDoTasks, null, 2));

    return NextResponse.json({ toDoList: toDoTasks }, { status: 200 });
  } catch (error) {
    console.error("Error fetching To-Do tasks:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
