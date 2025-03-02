import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { Event } from "@/app/db/models/Event";

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
      title,
      description,
      date,
      time,
      location,
      clerkId,
      attendees,
      reminders,
    } = body;

    // Validate required fields
    if (!title || !date || !time || !location || !clerkId) {
      return NextResponse.json(
        { error: "Title, date, time, location, and clerkId are required." },
        { status: 400 }
      );
    }

    await connectToDB();

    // Create a new event
    const newEvent = new Event({
      title,
      description: description || "",
      date,
      time,
      location,
      clerkId,
      attendees: attendees || [],
      reminders: reminders || [],
    });

    await newEvent.save();

    return NextResponse.json(
      { message: "Event created successfully." },
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

// Fetch all events

// export async function GET() {
//   try {
//     await connectToDB();
//     const events = await Event.find({});
//     return NextResponse.json(events, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     return NextResponse.json(
//       { error: "An internal server error occurred." },
//       { status: 500 }
//     );
//   }
// }
