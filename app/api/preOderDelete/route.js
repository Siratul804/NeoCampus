import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { PreOrder } from "@/app/db/models/PreOrder";

export async function DELETE(req) {
  try {
    if (req.method !== "DELETE") {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    const { id } = await req.json(); // Extract todo_id from request body

    if (!id) {
      return NextResponse.json(
        { error: "Pre-order ID is required." },
        { status: 400 }
      );
    }

    await connectToDB();

    // Find and delete the pre-order by its _id
    const deletedOrder = await PreOrder.findByIdAndDelete({ _id: id });

    if (!deletedOrder) {
      return NextResponse.json(
        { error: "Pre-order not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Pre-order deleted successfully.", deletedOrder },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting pre-order:", error);

    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
