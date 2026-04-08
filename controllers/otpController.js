    // const axios = require("axios");
    // const Otp = require("../models/Otp");

    // const generateOtp = () => {
    // return Math.floor(100000 + Math.random() * 900000).toString();
    // };

    // // SEND OTP
    // exports.sendOtp = async (req, res) => {
    // try {
    //     let { mobile } = req.body;

    //     if (!mobile) {
    //     return res.json({ success: false, message: "Mobile required" });
    //     }

    //     if (!mobile.startsWith("91")) {
    //     mobile = "91" + mobile;
    //     }

    //     const otp = generateOtp();

    //     // save in DB
    //     await Otp.deleteMany({ mobile });
    //     await Otp.create({
    //     mobile,
    //     otp,
    //     expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    //     });

    //     // ✅ EXACT TEMPLATE (DLT MATCH)
    //     const message = `Your One Time Password (OTP) is ${otp} for Gutargoo+ app login. Do not share it with anyone. Valid till 5 minutes.www.gutargooplus.com`;

    //     const url = `${process.env.SMS_BASE_URL}?user=${process.env.SMS_USER}&authkey=${process.env.SMS_AUTH_KEY}&type=1&sender=${process.env.SMS_SENDER}&mobile=${mobile}&text=${encodeURIComponent(message)}&templateid=${process.env.SMS_TEMPLATE_ID}`;

    //     const response = await axios.get(url);

    //     console.log("SMS RESPONSE:", response.data);

    //     res.json({
    //     success: true,
    //     message: "OTP Sent",
    //     });

    // } catch (err) {
    //     console.log(err.message);
    //     res.status(500).json({ success: false });
    // }
    // };

    // // VERIFY OTP
    // exports.verifyOtp = async (req, res) => {
    // try {
    //     let { mobile, otp } = req.body;

    //     if (!mobile.startsWith("91")) {
    //     mobile = "91" + mobile;
    //     }

    //     const record = await Otp.findOne({ mobile, otp });

    //     if (!record) {
    //     return res.json({ success: false, message: "Invalid OTP" });
    //     }

    //     if (record.expiresAt < new Date()) {
    //     return res.json({ success: false, message: "Expired OTP" });
    //     }

    //     await Otp.deleteMany({ mobile });

    //     res.json({
    //     success: true,
    //     message: "OTP Verified",
    //     });

    // } catch (err) {
    //     res.status(500).json({ success: false });
    // }
    // };
    


    const axios = require("axios");
const jwt = require("jsonwebtoken");
const Otp = require("../models/Otp");
const Customer = require("../models/Customer");


// 🔢 Generate OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ✅ SEND OTP
exports.sendOtp = async (req, res) => {
  try {
    let { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required",
      });
    }

    // 📱 validate mobile
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number",
      });
    }

    // 🇮🇳 add country code
    // if (!mobile.startsWith("+91")) {
    //   mobile = "+91" + mobile;
    // }

// mobile = mobile.replace(/\D/g, ""); // remove +, spaces, etc.

// if (mobile.length === 10) {
//   mobile = "91" + mobile;
// }
 if (!mobile.startsWith("91")) {
      mobile = "91" + mobile;
    }


    const otp = generateOtp();

    // 🗑️ delete old OTP
    await Otp.deleteMany({ mobile });

    // 💾 save OTP
    await Otp.create({
      mobile,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
    });

    // 📨 DLT message (EXACT MATCH REQUIRED)
    const message = `Your One Time Password (OTP) is ${otp} for Gutargoo+ app login. Do not share it with anyone. Valid till 5 minutes.www.gutargooplus.com`;

    // const url = `${process.env.SMS_BASE_URL}?user=${process.env.SMS_USER}&authkey=${process.env.SMS_AUTH_KEY}&type=1&sender=${process.env.SMS_SENDER}&mobile=${mobile}&text=${encodeURIComponent(message)}&templateid=${process.env.SMS_TEMPLATE_ID}`;
        const url = `${process.env.SMS_BASE_URL}?user=${process.env.SMS_USER}&authkey=${process.env.SMS_AUTH_KEY}&type=1&sender=${process.env.SMS_SENDER}&mobile=${mobile}&text=${encodeURIComponent(message)}&templateid=${process.env.SMS_TEMPLATE_ID}`;

    // 📡 Send SMS
    const response = await axios.get(url);
    console.log("📩 SMS RESPONSE:", response.data,message);

    return res.json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.log("❌ SEND OTP ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};
exports.getUsersDataAll = async(req,res) =>{
  try{
    let {page=1,limit=50} = req.query
    page= parseInt(page)
    limit = parseInt(limit)
    const totalRecords = await Customer.countDocuments()
    const skip = (page-1)*limit
    const data = await Customer.find().skip(skip).limit(limit).sort({createdAt:-1})

    res.status(200).json({
      data:data,
      message:"User get Successfully",
      page:page,
      total:totalRecords
    })
  }
  catch(error){
    console.log(error)
    res.status(500).json({
      success:false,
      message:"Something went wrong "
    })
  }
}

exports.verifyOtp = async (req, res) => {
  try {
    let { mobile, otp } = req.body;

    if (!mobile || !otp) {
      return res.status(400).json({
        success: false,
        message: "Mobile and OTP required",
      });
    }

    // ✅ FIX HERE
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

    let customer = await Customer.findOne({ mobile });

    if (!customer) {
      customer = await Customer.create({
        mobile,
        role:"customer",
        lastLogin: new Date(),
      });
    } else {
      customer.lastLogin = new Date();
      await customer.save();
    }

    const token = jwt.sign(
      {
        id: customer._id,
        role: "customer",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      message: "OTP Verified",
      token,
      user: { mobile },
    });

  } catch (error) {
    console.log("❌ VERIFY OTP ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
};
