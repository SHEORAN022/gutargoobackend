const express = require("express");
const router = express.Router();

const controller = require("../controllers/publicSectionController");

/* 🌍 PUBLIC (NO AUTH) */
router.get("/sections", controller.getPublicSections);

module.exports = router;