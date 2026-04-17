const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  togglePublish,
  getVideoStreamUrl,
  setMovieSkipIntro   // ✅ MUST
} = require("../controllers/movieController");

// ─── Multer Setup ─────────────────────────────────────────────
const storage = multer.memoryStorage();

const CREW_ROLES = [
  "director",
  "producer",
  "writer",
  "musicDirector",
  "cinematographer",
  "editor"
];

const MAX_CREW_PER_ROLE = 20;
const MAX_CAST = 50;

// Crew fields
const crewImageFields = CREW_ROLES.flatMap((role) =>
  Array.from({ length: MAX_CREW_PER_ROLE }, (_, i) => ({
    name: `crewImages_${role}_${i}`,
    maxCount: 1,
  }))
);

// Cast fields
const castImageFields = Array.from({ length: MAX_CAST }, (_, i) => ({
  name: `castImage_${i}`,
  maxCount: 1,
}));

// Upload config
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 * 1024 }, // 5GB
}).fields([
  { name: "movieFile", maxCount: 1 },
  { name: "trailerFile", maxCount: 1 },
  { name: "horizontalBanner", maxCount: 1 },
  { name: "verticalPoster", maxCount: 1 },
  { name: "logo", maxCount: 1 },
  ...crewImageFields,
  ...castImageFields,
]);

// ─── ROUTES ───────────────────────────────────────────────────

// 🎬 Create
router.post("/", upload, createMovie);

// 📥 Get All
router.get("/", getMovies);

// 📄 Get Single
router.get("/:id", getMovieById);

// ✏️ Update
router.put("/:id", upload, updateMovie);

// ❌ Delete
router.delete("/:id", deleteMovie);

// 🔁 Toggle Publish
router.patch("/:id/publish", togglePublish);

// 🎥 Stream
router.get("/:id/stream", getVideoStreamUrl);

// 🔥 SKIP INTRO (IMPORTANT)
router.put("/:id/skip-intro", setMovieSkipIntro);

module.exports = router;
