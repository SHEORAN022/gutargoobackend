const RedeemCode = require("../models/RedeemCode");
const User = require("../models/User"); // ✅ FIXED


// ================= ADMIN =================

// CREATE CODE
exports.createRedeemCode = async (req, res) => {
  try {
    const { code, type, value, expiryDate, maxUses } = req.body;

    if (!code || !type || !expiryDate) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const exists = await RedeemCode.findOne({
      code: code.toUpperCase(),
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Code already exists",
      });
    }

    const newCode = await RedeemCode.create({
      code: code.toUpperCase(),
      type,
      value,
      expiryDate,
      maxUses,
    });

    res.json({
      success: true,
      message: "Redeem code created",
      data: newCode,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET ALL CODES
exports.getAllCodes = async (req, res) => {
  try {
    const codes = await RedeemCode.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: codes,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE CODE
exports.deleteCode = async (req, res) => {
  try {
    await RedeemCode.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Code deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= USER =================

// GET AVAILABLE CODES
// exports.getAvailableCodes = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const codes = await RedeemCode.find({
//       isActive: true,
//       expiryDate: { $gt: new Date() },
//     });

//     const formatted = codes.map((code) => ({
//       _id: code._id,
//       code: code.code,
//       type: code.type,
//       value: code.value,
//       expiryDate: code.expiryDate,
//       maxUses: code.maxUses,
//       usedCount: code.usedCount,
//       alreadyUsed: code.usersUsed.includes(userId),
//     }));

//     res.json({
//       success: true,
//       data: formatted,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


exports.getAvailableCodes = async (req, res) => {
  try {
    const codes = await RedeemCode.find({
      isActive: true,
      expiryDate: { $gt: new Date() },
    });

    const formatted = codes.map((code) => ({
      _id: code._id,
      code: code.code,
      type: code.type,
      value: code.value,
      expiryDate: code.expiryDate,
      maxUses: code.maxUses,
      usedCount: code.usedCount,
    }));

    res.json({
      success: true,
      data: formatted,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// APPLY CODE
exports.redeemCode = async (req, res) => {
  try {
    const userId = req.user._id;
    let { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code is required",
      });
    }

    code = code.toUpperCase();

    const redeem = await RedeemCode.findOne({ code });

    if (!redeem || !redeem.isActive) {
      return res.status(400).json({
        success: false,
        message: "Invalid code",
      });
    }

    if (new Date() > redeem.expiryDate) {
      return res.status(400).json({
        success: false,
        message: "Code expired",
      });
    }

    if (redeem.usedCount >= redeem.maxUses) {
      return res.status(400).json({
        success: false,
        message: "Code fully used",
      });
    }

    if (redeem.usersUsed.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "Already used",
      });
    }

    const user = await User.findById(userId);

    // 🎁 APPLY BENEFIT
    if (redeem.type === "coins") {
      user.coins = (user.coins || 0) + redeem.value;
    }

    if (redeem.type === "subscription") {
      const days = redeem.value;
      const current = user.subscriptionExpiry || new Date();
      user.subscriptionExpiry = new Date(
        current.getTime() + days * 86400000
      );
    }

    if (redeem.type === "premium") {
      user.isPremium = true;
    }

    await user.save();

    redeem.usedCount += 1;
    redeem.usersUsed.push(userId);
    await redeem.save();

    res.json({
      success: true,
      message: "Code applied successfully",
      type: redeem.type,
      value: redeem.value,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};