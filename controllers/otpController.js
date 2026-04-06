const axios = require("axios");
const Otp = require("../models/Otp");

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// SEND OTP
exports.sendOtp = async (req, res) => {
  try {
    let { mobile } = req.body;

    if (!mobile) {
      return res.json({ success: false, message: "Mobile required" });
    }

    if (!mobile.startsWith("91")) {
      mobile = "91" + mobile;
    }

    const otp = generateOtp();

    // save in DB
    await Otp.deleteMany({ mobile });
    await Otp.create({
      mobile,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // ✅ EXACT TEMPLATE (DLT MATCH)
    const message = `Your One Time Password (OTP) is ${otp} for Gutargoo+ app login. Do not share it with anyone. Valid till 5 minutes.www.gutargooplus.com`;

    const url = `${process.env.SMS_BASE_URL}?user=${process.env.SMS_USER}&authkey=${process.env.SMS_AUTH_KEY}&type=1&sender=${process.env.SMS_SENDER}&mobile=${mobile}&text=${encodeURIComponent(message)}&templateid=${process.env.SMS_TEMPLATE_ID}`;

    const response = await axios.get(url);

    console.log("SMS RESPONSE:", response.data);

    res.json({
      success: true,
      message: "OTP Sent",
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false });
  }
};

// VERIFY OTP
exports.verifyOtp = async (req, res) => {
  try {
    let { mobile, otp } = req.body;

    if (!mobile.startsWith("91")) {
      mobile = "91" + mobile;
    }

    const record = await Otp.findOne({ mobile, otp });

    if (!record) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (record.expiresAt < new Date()) {
      return res.json({ success: false, message: "Expired OTP" });
    }

    await Otp.deleteMany({ mobile });

    res.json({
      success: true,
      message: "OTP Verified",
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};
// const axios = require("axios");
// const Otp = require("../models/Otp");

// // 🔢 Generate OTP
// const generateOtp = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };
// // console.log("OTP Controller Loaded $generateOtp()");

// // ✅ SEND OTP
// exports.sendOtp = async (req, res) => {
//   try {
//     let { mobile } = req.body;

//     if (!mobile) {
//       return res.json({ success: false, message: "Mobile required" });
//     }

//     // 👉 add country code if not present
//     if (!mobile.startsWith("91")) {
//       mobile = "91" + mobile;
//     }

//     const otp = generateOtp();
//     const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

//     // delete old OTP
//     await Otp.deleteMany({ mobile });

//     // save new OTP
//     await Otp.create({ mobile, otp, expiresAt });

//     // 🔥 DLT SMS API call
//     const message = `Your One Time Password (OTP) is ${otp} for Gutargoo app login. Do not share it with anyone. Valid till 5 minutes.`;

//     const url = `${process.env.SMS_BASE_URL}?user=${process.env.SMS_USER}&authkey=${process.env.SMS_AUTH_KEY}&type=1&sender=${process.env.SMS_SENDER}&mobile=${mobile}&text=${encodeURIComponent(message)}&templateid=${process.env.SMS_TEMPLATE_ID}`;

//     const response = await axios.get(url);

//     console.log("📩 SMS RESPONSE:", response.data);

//     return res.json({
//       success: true,
//       message: "OTP Sent",
//     });

//   } catch (error) {
//     console.log("❌ SEND OTP ERROR:", error.message);
//     res.status(500).json({ success: false });
//   }
// };

// // ✅ VERIFY OTP
// exports.verifyOtp = async (req, res) => {
//   try {
//     let { mobile, otp } = req.body;

//     if (!mobile.startsWith("91")) {
//       mobile = "91" + mobile;
//     }

//     const record = await Otp.findOne({ mobile, otp });

//     if (!record) {
//       return res.json({ success: false, message: "Invalid OTP" });
//     }

//     if (record.expiresAt < new Date()) {
//       return res.json({ success: false, message: "OTP Expired" });
//     }

//     // delete after verify
//     await Otp.deleteMany({ mobile });

//     return res.json({
//       success: true,
//       message: "OTP Verified",
//     });

//   } catch (error) {
//     console.log("❌ VERIFY ERROR:", error.message);
//     res.status(500).json({ success: false });
//   }
// };
