const mongoose = require("mongoose");

const redeemCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["coins", "subscription", "premium"],
      required: true,
    },

    value: {
      type: Number,
      default: 0,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    maxUses: {
      type: Number,
      default: 1,
      min: 1,
    },

    usedCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    usersUsed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // ✅ FIXED
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// performance indexes
redeemCodeSchema.index({ isActive: 1 });
redeemCodeSchema.index({ expiryDate: 1 });

module.exports = mongoose.model("RedeemCode", redeemCodeSchema);