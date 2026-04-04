const express = require("express");
const router = express.Router();

const controller = require("../controllers/publicCategoryController");

/* 🌍 NO AUTH */
router.get("/category", controller.getPublicCategories);

module.exports = router;