// const express = require("express");
// const router = express.Router();

// const { streamVideo } = require("../controllers/downloadController");
// const { auth } = require("../middleware/authMiddleware");


// router.get("/download/:videoId",  streamVideo);

// module.exports = router;
const express = require("express");
const router = express.Router();

const { streamVideo } = require("../controllers/downloadController");

// 👉 अब clean route
// router.get("/:videoId", streamVideo);
router.get("/download/:videoId",  streamVideo);

module.exports = router;