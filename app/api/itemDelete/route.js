import { NextResponse } from "next/server";
import { connectToDB } from "@/app/db/connection";
import { CafeteriaMenu } from "@/app/db/models/Cafeteria";

export async function DELETE(req) {
  try {
    if (req.method !== "DELETE") {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    const { menuId, mealId } = await req.json(); // Extract menuId and mealId from request body

    if (!menuId || !mealId) {
      return NextResponse.json(
        { error: "Both menuId and mealId are required." },
        { status: 400 }
      );
    }

    await connectToDB();

    // Find the CafeteriaMenu document by its menuId
    const cafeteriaMenu = await CafeteriaMenu.findById({ _id: menuId });

    if (!cafeteriaMenu) {
      return NextResponse.json(
        { error: "Cafeteria menu not found." },
        { status: 404 }
      );
    }

    // Remove the meal from the meals array based on its mealId
    const mealIndex = cafeteriaMenu.meals.findIndex(
      (meal) => meal._id.toString() === mealId
    );

    if (mealIndex === -1) {
      return NextResponse.json(
        { error: "Meal not found in the specified menu." },
        { status: 404 }
      );
    }

    // Remove the meal from the meals array
    cafeteriaMenu.meals.splice(mealIndex, 1);

    // Save the updated CafeteriaMenu document
    await cafeteriaMenu.save();

    return NextResponse.json(
      { message: "Meal deleted successfully.", updatedMenu: cafeteriaMenu },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting meal:", error);

    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
