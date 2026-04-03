// const express = require("express");
// const router = express.Router();

// const controller = require("../controllers/sectionItemController");
// const { auth, requireAdmin } = require("../middleware/auth");

// /* 🔐 ADMIN ONLY */
// router.post("/section-items", auth, requireAdmin, controller.addItem);

// router.get(
//   "/section-items/:sectionId",
//   auth,
//   requireAdmin,
//   controller.getItemsBySection
// );

// router.delete(
//   "/section-items/:id",
//   auth,
//   requireAdmin,
//   controller.deleteItem
// );

// router.put(
//   "/section-items/reorder",
//   auth,
//   requireAdmin,
//   controller.reorderItems
// );

// module.exports = router;
const express = require("express");
const router = express.Router();

const controller = require("../controllers/sectionItemController");
const { auth, requireAdmin } = require("../middleware/authMiddleware");

/* 🔐 ADMIN ONLY */
router.post("/section-items", auth,  controller.addItem);

router.get(
  "/section-items/:sectionId",
  auth,
 
  controller.getItemsBySection
);

router.delete(
  "/section-items/:id",
  auth,
  controller.deleteItem
);

router.put(
  "/section-items/reorder",
  auth,
  controller.reorderItems
);

module.exports = router;
