import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { Club } from "@/app/db/models/Club";

export async function POST(req) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    const body = await req.json();
    const { name, description, events } = body;

    // Validate required fields
    if (!name || !events || !Array.isArray(events) || events.length === 0) {
      return NextResponse.json(
        { error: "Club name and at least one event are required." },
        { status: 400 }
      );
    }

    await connectToDB();

    // Create a new club
    const newClub = new Club({
      name,
      description: description || "",
      events,
    });

    await newClub.save();

    return NextResponse.json(
      { message: "Club created successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating club:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}

// Fetch all clubs
// export async function GET() {
//   try {
//     await connectToDB();
//     const clubs = await Club.find({});
//     return NextResponse.json(clubs, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching clubs:", error);
//     return NextResponse.json(
//       { error: "An internal server error occurred." },
//       { status: 500 }
//     );
//   }
// }
