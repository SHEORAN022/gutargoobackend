// routes/downloadRoutes.js

const express = require("express");
const router = express.Router();

const { downloadFromBunny } = require("../controllers/downloadController");

router.get("/download/:videoId", downloadFromBunny);

module.exports = router;