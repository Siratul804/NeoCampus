import { NextResponse } from "next/server";
import { clubsData } from "@/data/ClubData";

const allEvents = clubsData.flatMap((club) => club.events || []);

export async function POST(req) {
  try {
    const { tag } = await req.json();

    if (!tag || typeof tag !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'tag' in request body." },
        { status: 400 }
      );
    }

    // Filter events based on the provided tag (case-insensitive)
    const filteredEvents = allEvents.filter((event) => {
      return (
        event.title.toLowerCase().includes(tag.toLowerCase()) ||
        event.description.toLowerCase().includes(tag.toLowerCase())
      );
    });

    // Ensure we return exactly 3 events
    const recommendedEvents = filteredEvents.slice(0, 3);

    return NextResponse.json({ events: recommendedEvents });
  } catch (err) {
    console.error("Error processing request:", err);
    return NextResponse.json(
      { error: "Failed to process the request." },
      { status: 500 }
    );
  }
}
