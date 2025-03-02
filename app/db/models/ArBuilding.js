const mongoose = require("mongoose");

// Schema for Building (e.g., Library, Auditorium)
const BuildingSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the building
  location: {
    latitude: { type: Number, required: true }, // Latitude for map
    longitude: { type: Number, required: true }, // Longitude for map
  },
  arLabel: { type: String }, // AR label for building
});

export const ArBuilding =
  mongoose.models.ArBuilding || mongoose.model("ArBuilding", BuildingSchema);
