const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true }, // Student's ID
    type: { type: String, enum: ["assignment", "exam"], required: true },
    title: { type: String, required: true }, // Assignment title or Exam subject
    description: { type: String }, // Additional details
    courseName: { type: String, required: true },
    dueDate: { type: Date, required: true }, // Deadline for submission or exam date
    status: {
      type: String,
      enum: ["pending", "completed", "overdue"],
      default: "pending",
    }, // Task status
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    }, // Task priority
  },
  { timestamps: true }
);

export const ToDo = mongoose.models.ToDo || mongoose.model("ToDo", toDoSchema);
