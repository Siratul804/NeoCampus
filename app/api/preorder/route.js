import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { PreOrder } from "@/app/db/models/PreOrder";

export async function POST(req) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    const body = await req.json();
    const { clerkId, mealId, quantity, pickupTime } = body;

    // Validate required fields
    if (!clerkId || !mealId || !quantity || !pickupTime) {
      return NextResponse.json(
        { error: "clerkId, mealId, quantity, and pickupTime are required." },
        { status: 400 }
      );
    }

    await connectToDB();

    // Check if a pre-order with the same clerkId or mealId already exists
    // const existingOrder = await PreOrder.findOne({ $or: [{ clerkId }, { mealId }] });

    // if (existingOrder) {
    //   return NextResponse.json(
    //     { error: "Pre-order already exists for this clerkId or mealId." },
    //     { status: 409 }
    //   );
    // }

    // Create new pre-order
    const newOrder = new PreOrder({
      clerkId,
      mealId,
      quantity,
      pickupTime,
      status: "pending", // Default status
    });

    await newOrder.save();

    return NextResponse.json(
      { message: "Pre-order placed successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing pre-order:", error);

    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
