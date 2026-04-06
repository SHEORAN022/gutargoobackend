// const mongoose = require("mongoose");

// const customerSchema = new mongoose.Schema(
//   {
//     mobile: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     role: {
//       type: String,
//       enum: ["customer", "admin"],
//       default: "customer",
//     },
//     lastLogin: {
//       type: Date,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Customer", customerSchema);