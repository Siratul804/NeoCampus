import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { PreOrder } from "@/app/db/models/PreOrder";

export async function GET(req) {
  try {
    if (req.method !== "GET") {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    await connectToDB();

    // Fetch the data from the PreOrder model
    const orders = await PreOrder.find({}, "name price stuName clerkId"); // Only select relevant fields

    if (!orders || orders.length === 0) {
      return NextResponse.json(
        { message: "No orders found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Orders fetched successfully.", orders },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching orders:", error);

    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
