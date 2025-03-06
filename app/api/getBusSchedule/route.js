import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { BusSchedule } from "@/app/db/models/BusSchedule";

export async function GET(req) {
  try {
    await connectToDB();

    // Fetch all bus schedules
    const busSchedules = await BusSchedule.find();

    return NextResponse.json(busSchedules, { status: 200 });
  } catch (error) {
    console.error("Error fetching bus schedules:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
