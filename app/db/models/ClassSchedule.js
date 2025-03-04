const mongoose = require("mongoose");

const classScheduleSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true },
    courseName: { type: String, required: true },
    courseCode: { type: String, required: true },
    faculty: { type: String, required: true, unique: true }, // need to create dummy faculty json data
    days: [
      {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
    ],
    time: { type: String, required: true },
  },
  { timestamps: true }
);

export const ClassSchedule =
  mongoose.models.ClassSchedule ||
  mongoose.model("ClassSchedule", classScheduleSchema);
