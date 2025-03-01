const mongoose = require("mongoose");

const preOrderSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    mealId: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true },
    pickupTime: { type: String, required: true }, // when to pick the order
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const PreOrder =
  mongoose.models.PreOrder || mongoose.model("PreOrder", preOrderSchema);
