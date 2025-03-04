import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { CafeteriaMenu } from "@/app/db/models/Cafeteria";

export async function POST(req) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    const body = await req.json();
    const { clerkId, date, meals = [] } = body;

    if (!clerkId || !date || meals.length === 0) {
      return NextResponse.json(
        { error: "clerkId, date, and at least one meal are required." },
        { status: 400 }
      );
    }

    await connectToDB();

    // Create a new cafeteria entry
    const newEntry = new CafeteriaMenu({ clerkId, date, meals });

    await newEntry.save();

    return NextResponse.json(
      { message: "Cafeteria entry added successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding cafeteria entry:", error);

    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
