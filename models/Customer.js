const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    lastLogin: {
      type: Date,
    },
    isPremiusm:{
      type:Boolean,
      default:false
    },
    coins:{
      type:Number,
      default:0
    },
    subscriptionDays:{
      type:Number,
      default:0
    }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);