const express = require("express");
const router = express.Router();

const { streamVideo } = require("../controllers/downloadController");
const { auth } = require("../middleware/authMiddleware");

// 🔥 secure route
router.get("/download/:videoId", auth, streamVideo);

module.exports = router;