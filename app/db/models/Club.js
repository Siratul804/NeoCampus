const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Club name
    description: { type: String }, // Club details
    events: [{ type: String, required: true, unique: true }], // Events organized by the club // will come from events schema
  },
  { timestamps: true }
);

export const Club =
  mongoose.models.Club || mongoose.model("StudentPreference", clubSchema);
