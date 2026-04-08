const express = require("express");
const router = express.Router();

const {
  createWebSeries,
  getAllWebSeries,
  getWebSeriesById,
  addSeason,
  addEpisode,
  updateWebSeries,
  deleteWebSeries,
} = require("../controllers/webSeriesController");

router.post("/", createWebSeries);
router.get("/", getAllWebSeries);
router.get("/:id", getWebSeriesById);
router.put("/:id", updateWebSeries);
router.delete("/:id", deleteWebSeries);

// nested
// router.post("/:webSeriesId/season", addSeason);
// router.post("/:webSeriesId/season/:seasonNumber/episode", addEpisode);

module.exports = router;