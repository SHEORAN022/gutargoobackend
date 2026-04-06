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
router.post("/",  createCategory);
router.get("/",  getCategories);
router.delete("/:id",  deleteCategory);
router.put("/:id",  updateCategory);  // ✅ ADD UPDATE ROUTE

module.exports = router;