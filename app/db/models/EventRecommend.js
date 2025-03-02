const mongoose = require("mongoose");

const eventRecommendSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true }, // Student's ID
    interests: [{ type: String, required: true }], // Example: ["Tech", "Music", "Sports"]
    recommendedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

export const EventRecommend =
  mongoose.models.EventRecommend ||
  mongoose.model("EventRecommend", eventRecommendSchema);
