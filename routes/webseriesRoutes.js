const express = require("express");
const router = express.Router();

const {
  createWebSeries,
  getAllWebSeries,
  getWebSeriesById,
  updateWebSeries,
  deleteWebSeries,
  setEpisodeSkipIntro   // ✅ ADD THIS
} = require("../controllers/webSeriesController");

// 🎬 CRUD
router.post("/", createWebSeries);
router.get("/", getAllWebSeries);
router.get("/:id", getWebSeriesById);
router.put("/:id", updateWebSeries);
router.delete("/:id", deleteWebSeries);

// 🔥 SKIP INTRO (IMPORTANT)
router.put(
  "/:seriesId/season/:seasonIndex/episode/:episodeIndex/skip-intro",
  setEpisodeSkipIntro
);

module.exports = router;
