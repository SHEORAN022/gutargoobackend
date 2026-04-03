const mongoose = require("mongoose");

const castSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    character: String,
    profileImage: String,
    bio: String,
    dateOfBirth: Date,
    nationality: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cast", castSchema);