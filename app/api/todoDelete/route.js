import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { ToDo } from "@/app/db/models/ToDo";

export async function DELETE(req) {
  try {
    await connectToDB();

    const { todo_id } = await req.json(); // Extract todo_id from request body

    if (!todo_id) {
      return NextResponse.json(
        { error: "Todo ID is required." },
        { status: 400 }
      );
    }

    // Find and delete the To-Do item by todo_id
    const deletedTodo = await ToDo.findByIdAndDelete(todo_id);

    if (!deletedTodo) {
      return NextResponse.json(
        { error: "To-Do item not found or already deleted." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "To-Do item deleted successfully.", deletedTodo },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting To-Do item:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
