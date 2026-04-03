const mongoose = require("mongoose");

const crewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Director", "Producer", "Writer", "Music Director", "Cinematographer", "Editor"],
      required: true,
    },
    bio: String,
    image: String,
    dateOfBirth: Date,
    nationality: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Crew", crewSchema);