const express = require("express");
const router = express.Router();

const controller = require("../controllers/homeSectionController");
const { auth,  } = require("../middleware/authMiddleware");

/* 🔐 ADMIN ROUTES */
router.post("/sections", auth,  controller.createSection);

router.get("/sections", auth,  controller.getSections);

router.get("/sections/:id", auth,  controller.getSectionById);

router.put("/sections/:id", auth,  controller.updateSection);

router.delete("/sections/:id", auth,  controller.deleteSection);

router.patch("/sections/:id/toggle", auth,  controller.toggleSection);

router.put("/sections/reorder", auth,  controller.reorderSections);

/* 🌍 USER SIDE (PUBLIC) */
router.get("/home", controller.getHomeSections);

module.exports = router;
