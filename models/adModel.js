const mongoose = require("mongoose");

const adSchema = new mongoose.Schema(
  {
    // 🎬 VAST URL
    vastUrl: {
      type: String,
      required: true,
      trim: true,
    },

    // ⏱ Ad kab chale (seconds)
    showAt: {
      type: Number,
      required: true, // e.g. 0, 60, 300
    },

    // 🎬 Type (optional)
   

    // 🔥 Active / Inactive
    isActive: {
      type: Boolean,
      default: true,
    },

    // ⏱ Duration
    duration: {
      type: Number,
      default: 15,
    },

    // 👤 Admin
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// ⚡ index
adSchema.index({ isActive: 1, showAt: 1 });

module.exports = mongoose.model("Ad", adSchema);
