const Category = require("../models/Category");

/* 🌍 PUBLIC GET ALL */
exports.getPublicCategories = async (req, res) => {
  try {
    const data = await Category.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
