const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory  // ✅ ADD THIS
} = require("../controllers/categoryController");
const { auth } = require("../middleware/authMiddleware");  // ✅ ADD AUTH

// All category routes require authentication
router.post("/", auth, createCategory);
router.get("/", auth, getCategories);
router.delete("/:id", auth, deleteCategory);
router.put("/:id", auth, updateCategory);  // ✅ ADD UPDATE ROUTE

module.exports = router;