import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { Event } from "@/app/db/models/Event";

export async function GET() {
  try {
    await connectToDB();

    const events = await Event.find({}).lean(); // Use `.lean()` for performance boost

    if (!events.length) {
      return NextResponse.json(
        { message: "No events found." },
        { status: 404 }
      );
    }

    console.log("Fetched Events:", JSON.stringify(events, null, 2));

    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
