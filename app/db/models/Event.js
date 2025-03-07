const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    club: { type: String, required: true },
    reminders: [{ type: String, required: false }],
    rsvp: [{ type: String, required: false }],
  },
  { timestamps: true }
);

export const Event =
  mongoose.models.Event || mongoose.model("Event", eventSchema);
