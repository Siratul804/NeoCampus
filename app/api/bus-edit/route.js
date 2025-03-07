import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { BusSchedule } from "@/app/db/models/BusSchedule";
import mongoose from "mongoose";

export async function PUT(req) {
  try {
    const body = await req.json();
    const {
      scheduleId,
      clerkId,
      routeNumber,
      startLocation,
      endLocation,
      stops,
      departureTimes,
      delayInfo,
    } = body;

    console.log(
      scheduleId,
      clerkId,
      routeNumber,
      startLocation,
      endLocation,
      stops,
      departureTimes,
      delayInfo
    );

    // Validate required fields
    if (
      !scheduleId ||
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

    // Ensure scheduleId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(scheduleId)) {
      return NextResponse.json(
        { error: "Invalid scheduleId format." },
        { status: 400 }
      );
    }

    await connectToDB();

    // Find and update the bus schedule by scheduleId (using ObjectId)
    const updatedSchedule = await BusSchedule.findByIdAndUpdate(
      mongoose.Types.ObjectId(scheduleId), // Convert to ObjectId
      {
        clerkId,
        routeNumber,
        startLocation,
        endLocation,
        stops,
        departureTimes,
        currentLocation: { lat: 0, lng: 0 }, // Default if not provided
        delayInfo: delayInfo || "On Time",
      },
      { new: true } // Return the updated document
    );

    if (!updatedSchedule) {
      return NextResponse.json(
        { error: "Bus schedule not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Bus schedule updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating bus schedule:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
