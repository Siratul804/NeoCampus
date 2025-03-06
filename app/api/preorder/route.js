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
    const { quantity, pickupTime, name, price, totalPrice, clerkId, stuName } =
      body;

    console.log(
      quantity,
      pickupTime,
      name,
      price,
      totalPrice,
      clerkId,
      stuName
    );

    // Validate required fields
    if (
      !quantity ||
      !pickupTime ||
      !name ||
      !price ||
      !totalPrice ||
      !clerkId ||
      !stuName
    ) {
      return NextResponse.json(
        {
          error:
            "All fields ( quantity, pickupTime, name, price, totalPrice, clerkId, stuName) are required.",
        },
        { status: 400 }
      );
    }

    await connectToDB();

    // Create new pre-order
    const newOrder = new PreOrder({
      quantity,
      pickupTime,
      name,
      price,
      totalPrice,
      clerkId,
      stuName,

      status: "pending", // Default status
    });

    await newOrder.save();

    return NextResponse.json(
      { message: "Pre-order placed successfully.", order: newOrder },
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
