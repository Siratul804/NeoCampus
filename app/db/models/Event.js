const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    clerkId: { type: String, required: true, unique: true }, // Creator's ID or Admin ID
    reminders: [
      {
        type: Date,
      },
    ],
  },
  { timestamps: true }
);
export const Event =
  mongoose.models.Event || mongoose.model("Event", eventSchema);
