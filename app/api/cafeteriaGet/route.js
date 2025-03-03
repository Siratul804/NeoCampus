import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { CafeteriaMenu } from "@/app/db/models/Cafeteria";

export async function GET() {
  try {
    await connectToDB();

    // Fetch all cafeteria menu entries
    const cafeteriaMenus = await CafeteriaMenu.find({});

    return NextResponse.json({ data: cafeteriaMenus }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cafeteria menu:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
