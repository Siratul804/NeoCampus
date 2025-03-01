const mongoose = require("mongoose");

const cafeteriaMenuSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true },
    date: { type: Date, required: true },
    meals: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        nutrition: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const CafeteriaMenu =
  mongoose.models.CafeteriaMenu ||
  mongoose.model("CafeteriaMenu", cafeteriaMenuSchema);
