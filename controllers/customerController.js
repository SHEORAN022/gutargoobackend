const Customer = require("../models/Customer");


// ✅ GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await Customer.findById(req.user._id).select("-__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      data: user,
    });

  } catch (error) {
    console.log("❌ GET PROFILE ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};


// ✅ UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const { mobile } = req.body;

    const user = await Customer.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 🔥 optional update
    if (mobile) user.mobile = mobile;

    await user.save();

    return res.json({
      success: true,
      message: "Profile updated",
      data: user,
    });

  } catch (error) {
    console.log("❌ UPDATE PROFILE ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};


// ✅ DELETE ACCOUNT
exports.deleteAccount = async (req, res) => {
  try {
    const user = await Customer.findByIdAndDelete(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      message: "Account deleted successfully",
    });

  } catch (error) {
    console.log("❌ DELETE ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};