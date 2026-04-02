const express = require("express");
const router = express.Router();

const controller = require("../controllers/sectionItemController");
const { auth, requireAdmin } = require("../middleware/auth");

/* 🔐 ADMIN ONLY */
router.post("/section-items", auth, requireAdmin, controller.addItem);

router.get(
  "/section-items/:sectionId",
  auth,
  requireAdmin,
  controller.getItemsBySection
);

router.delete(
  "/section-items/:id",
  auth,
  requireAdmin,
  controller.deleteItem
);

router.put(
  "/section-items/reorder",
  auth,
  requireAdmin,
  controller.reorderItems
);

module.exports = router;
