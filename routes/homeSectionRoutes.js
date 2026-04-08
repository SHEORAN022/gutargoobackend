const express = require("express");
const router = express.Router();

const controller = require("../controllers/homeSectionController");
const { auth,  } = require("../middleware/authMiddleware");

/* 🔐 ADMIN ROUTES */
router.post("/sections",   controller.createSection);

router.get("/sections",   controller.getSections);
router.get("/sections/allList",   controller.getSectionsMobile);
router.put("/sections/reorder",   controller.reorderSections);
router.get("/sections/:id",  controller.getSectionById);


router.put("/sections/:id",   controller.updateSection);

router.delete("/sections/:id",   controller.deleteSection);

router.patch("/sections/:id/toggle",   controller.toggleSection);


/* 🌍 USER SIDE (PUBLIC) */
router.get("/home", controller.getHomeSections);

module.exports = router;
