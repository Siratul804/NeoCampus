import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { BusSchedule } from "@/app/db/models/BusSchedule";

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
      clerkId,
      routeNumber,
      startLocation,
      endLocation,
      stops,
      departureTimes,
      currentLocation,
      delayInfo,
    } = body;

    // Validate required fields
    if (
      !clerkId ||
      !routeNumber ||
      !startLocation ||
      !endLocation ||
      !stops?.length ||
      !departureTimes?.length
    ) {
      return NextResponse.json(
        { error: "All required fields must be provided." },
        { status: 400 }
      );
    }

    await connectToDB();

    // Create a new bus schedule
    const newSchedule = new BusSchedule({
      clerkId,
      routeNumber,
      startLocation,
      endLocation,
      stops,
      departureTimes,
      currentLocation: currentLocation || { lat: 0, lng: 0 }, // Default if not provided
      delayInfo: delayInfo || "On Time",
    });

    await newSchedule.save();

    return NextResponse.json(
      { message: "Bus schedule added successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding bus schedule:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
