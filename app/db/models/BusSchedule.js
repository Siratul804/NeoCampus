const mongoose = require("mongoose");

const busScheduleSchema = new mongoose.Schema(
  {
    scheduleId: { type: String, required: true }, // Use string for scheduleId
    clerkId: { type: String, required: true },
    routeNumber: { type: String, required: true },
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    stops: [{ type: String, required: true }],
    departureTimes: [{ type: String, required: true }],
    currentLocation: { lat: Number, lng: Number },
    delayInfo: { type: String, default: "On Time" },
  },
  { timestamps: true }
);

export const BusSchedule =
  mongoose.models.BusSchedule ||
  mongoose.model("BusSchedule", busScheduleSchema);
