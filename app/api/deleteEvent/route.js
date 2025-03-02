import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { Event } from "@/app/db/models/Event";

export async function DELETE(req) {
  try {
    await connectToDB();

    const { event_id } = await req.json(); // Extract event_id from request body

    if (!event_id) {
      return NextResponse.json(
        { error: "Event ID is required." },
        { status: 400 }
      );
    }

    // Find and delete the event by event_id
    const deletedEvent = await Event.findByIdAndDelete(event_id);

    if (!deletedEvent) {
      return NextResponse.json(
        { error: "Event not found or already deleted." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Event deleted successfully.", deletedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
