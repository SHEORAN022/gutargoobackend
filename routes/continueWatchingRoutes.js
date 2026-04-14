const express = require("express");
const router = express.Router();

const controller = require("../controllers/continueWatchingController");
const { auth } = require("../middleware/authMiddleware");

// 🎬 save progress
router.post("/save", auth, controller.saveProgress);

// 🎬 get list
router.get("/", auth, controller.getContinueWatching);

// ❌ remove
router.delete("/:movieId", auth, controller.removeFromContinue);

module.exports = router;
