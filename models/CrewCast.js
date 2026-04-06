const mongoose = require("mongoose");

const CREW_ROLES = [
  "Director",
  "Producer",
  "Writer",
  "Music Director",
  "Cinematographer",
  "Editor",
];

const crewSchema = new mongoose.Schema(
  {
    personName: {
      type: String,
      required: true,
      trim: true,
    },

   
    role: {
      type: String,
      required: true,
      enum: [...CREW_ROLES, "Other"], // predefined + custom
    },

    customRole: {
      type: String,
      trim: true,
      default: "",
      validate: {
        validator: function (value) {
          if (this.role === "Other") {
            return value && value.length > 0;
          }
          return true;
        },
        message: "Custom role is required when role is 'Other'",
      },
    },

    // optional (only if needed)
    characterName: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CastAndCrew", crewSchema);
