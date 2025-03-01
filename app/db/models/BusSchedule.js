const mongoose = require("mongoose");

const busScheduleSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    routeNumber: { type: String, required: true },
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    stops: [{ type: String, required: true }],
    departureTimes: [{ type: String, required: true }], // Example: ["08:00 AM", "10:00 AM"]
    currentLocation: { lat: Number, lng: Number }, // For real-time tracking (will build a function which can auto after a certain time triggers and change lat & lng)
    delayInfo: { type: String, default: "On Time" }, // If there's a delay, update this
  },
  { timestamps: true }
);

export const BusSchedule =
  mongoose.models.BusSchedule ||
  mongoose.model("BusSchedule", busScheduleSchema);
