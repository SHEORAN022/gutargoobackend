const Category = require("../models/Category");

// ✅ CREATE
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const exist = await Category.findOne({ name });
    if (exist) return res.status(400).json({ error: "Category already exists" });

    const category = await Category.create({ name });

    res.status(201).json({ success: true, data: category });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET ALL
exports.getCategories = async (req, res) => {
  try {
    const data = await Category.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    // Check if category exists
    const exist = await Category.findOne({ name, _id: { $ne: req.params.id } });
    if (exist) return res.status(400).json({ error: "Category name already exists" });

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};