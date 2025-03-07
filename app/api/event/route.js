import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { Event } from "@/app/db/models/Event";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, description, date, time, club, reminders, rsvp } = body;

    // Validate required fields
    if (!title || !date || !time || !club) {
      return NextResponse.json(
        { error: "Title, date, time, and club are required." },
        { status: 400 }
      );
    }

    await connectToDB();

    // Create a new event
    const newEvent = new Event({
      title,
      description,
      date,
      time,
      club,
      reminders,
      rsvp,
    });

    // Save event to the database
    const savedEvent = await newEvent.save();

    return NextResponse.json(
      { message: "Event created successfully.", event: savedEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
