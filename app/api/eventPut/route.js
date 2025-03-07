import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { Event } from "@/app/db/models/Event";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, reminders, rsvp } = body;

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { error: "Event ID is required for updating." },
        { status: 400 }
      );
    }

    // Validate that at least one of reminders or rsvp is provided
    if (reminders === undefined && rsvp === undefined) {
      return NextResponse.json(
        { error: "At least one of reminders or rsvp should be provided." },
        { status: 400 }
      );
    }

    await connectToDB();

    // Find the event by ID
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        $set: {
          ...(reminders !== undefined && { reminders }),
          ...(rsvp !== undefined && { rsvp }),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Event updated successfully.", event: updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
