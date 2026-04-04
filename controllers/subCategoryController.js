const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");

// ✅ CREATE
exports.createSubCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({ error: "Name & categoryId required" });
    }

    // check category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const sub = await SubCategory.create({ name, categoryId });

    res.status(201).json({ success: true, data: sub });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Subcategory already exists" });
    }
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET BY CATEGORY
exports.getSubCategories = async (req, res) => {
  try {
    const { categoryId } = req.query;

    const data = await SubCategory.find({ categoryId }).sort({ createdAt: -1 });

    res.json({ success: true, data });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE
exports.deleteSubCategory = async (req, res) => {
  try {
    const deleted = await SubCategory.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    res.json({ success: true, message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};