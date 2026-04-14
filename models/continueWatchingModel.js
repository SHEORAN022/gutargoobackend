const mongoose = require("mongoose");

const continueWatchingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    // ⏱ kaha tak dekha
    watchedTime: {
      type: Number,
      default: 0, // seconds
    },

    // 🎬 total duration
    duration: {
      type: Number,
      default: 0,
    },

    // 🔥 completed ya nahi
    isCompleted: {
      type: Boolean,
      default: false,
    },

    // 🧠 last watched
    lastWatchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// ⚡ unique (same user + same movie ek hi entry)
continueWatchingSchema.index({ user: 1, movie: 1 }, { unique: true });

module.exports = mongoose.model("ContinueWatching", continueWatchingSchema);
