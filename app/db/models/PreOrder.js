const mongoose = require("mongoose");

const preOrderSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    pickupTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      default: "pending",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    clerkId: { type: String, required: true }, // Student's ID
    stuName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const PreOrder =
  mongoose.models.PreOrder || mongoose.model("PreOrder", preOrderSchema);
