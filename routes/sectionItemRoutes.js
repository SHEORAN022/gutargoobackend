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
<<<<<<< HEAD
const { auth, requireAdmin } = require("../middleware/auth");

/* 🔐 ADMIN ONLY */
router.post("/section-items", auth, requireAdmin, controller.addItem);
=======
const { auth, requireAdmin } = require("../middleware/authMiddleware");

/* 🔐 ADMIN ONLY */
router.post("/section-items", auth,  controller.addItem);
>>>>>>> 0ae6b69712cacb775221b9a27225705777fede1d

router.get(
  "/section-items/:sectionId",
  auth,
<<<<<<< HEAD
  requireAdmin,
=======
 
>>>>>>> 0ae6b69712cacb775221b9a27225705777fede1d
  controller.getItemsBySection
);

router.delete(
  "/section-items/:id",
  auth,
<<<<<<< HEAD
  requireAdmin,
=======

>>>>>>> 0ae6b69712cacb775221b9a27225705777fede1d
  controller.deleteItem
);

router.put(
  "/section-items/reorder",
  auth,
<<<<<<< HEAD
  requireAdmin,
=======

>>>>>>> 0ae6b69712cacb775221b9a27225705777fede1d
  controller.reorderItems
);

module.exports = router;
