import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { Event } from "@/app/db/models/Event";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, description, date, time, location, reminders } = body;

    // Validate required fields
    if (!title || !date || !time || !location) {
      return NextResponse.json(
        { error: "Title, date, time, location are required." },
        { status: 400 }
      );
    }

    await connectToDB();

    // Create a new event
    const newEvent = await Event.create({
      title,
      description: description || "",
      date,
      time,
      location,
      reminders: Array.isArray(reminders) ? reminders : [],
    });

    return NextResponse.json(
      { message: "Event created successfully.", event: newEvent },
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
