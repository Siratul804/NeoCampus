import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { ArBuilding } from "@/app/db/models/ArBuilding";

export async function POST(req) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    const body = await req.json();
    const { name, location, arLabel } = body;

    // Validate required fields
    if (!name || !location?.latitude || !location?.longitude) {
      return NextResponse.json(
        { error: "Name, latitude, and longitude are required." },
        { status: 400 }
      );
    }

    await connectToDB();

    // Create a new building
    const newBuilding = new ArBuilding({
      name,
      location,
      arLabel: arLabel || "",
    });

    await newBuilding.save();

    return NextResponse.json(
      { message: "Building added successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding building:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}

// Fetch all buildings
// export async function GET() {
//   try {
//     await connectToDB();
//     const buildings = await ArBuilding.find({});
//     return NextResponse.json(buildings, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching buildings:", error);
//     return NextResponse.json(
//       { error: "An internal server error occurred." },
//       { status: 500 }
//     );
//   }
// }
