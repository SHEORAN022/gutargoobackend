const express = require("express");
const router = express.Router();

const {
  createSubCategory,
  getSubCategories,
  deleteSubCategory,
} = require("../controllers/subCategoryController");

const { auth } = require("../middleware/authMiddleware");

router.post("/", auth, createSubCategory);
router.get("/", auth, getSubCategories);
router.delete("/:id", auth, deleteSubCategory);

module.exports = router;
