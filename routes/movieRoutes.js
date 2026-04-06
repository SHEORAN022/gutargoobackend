// // const express = require("express");
// // const router = express.Router();
// // const multer = require("multer");
// // const { auth } = require("../middleware/authMiddleware");
// // const {
// //   createMovie,
// //   getMovies,
// //   getMovieById,
// //   updateMovie,
// //   deleteMovie,
// //   togglePublish,
// //   getVideoStreamUrl
// // } = require("../controllers/movieController");

// // const storage = multer.memoryStorage();
// // const upload = multer({ 
// //   storage, 
// //   limits: { 
// //     fileSize: 5 * 1024 * 1024 * 1024
// //   } 
// // }).fields([
// //   { name: "movieFile", maxCount: 1 },
// //   { name: "horizontalBanner", maxCount: 1 },
// //   { name: "verticalPoster", maxCount: 1 },
// //   { name: "logo", maxCount: 1 }  // ✅ ADD LOGO FIELD
// // ]);

// // router.post("/", auth, upload, createMovie);
// // router.get("/", auth, getMovies);
// // router.get("/:id", auth, getMovieById);
// // router.put("/:id", auth, upload, updateMovie);
// // router.delete("/:id", auth, deleteMovie);
// // router.patch("/:id/publish", auth, togglePublish);
// // router.get("/:id/stream", auth, getVideoStreamUrl);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { auth } = require("../middleware/authMiddleware");
// const {
//   createMovie,
//   getMovies,
//   getMovieById,
//   updateMovie,
//   deleteMovie,
//   togglePublish,
//   getVideoStreamUrl,
// } = require("../controllers/movieController");

// const storage = multer.memoryStorage();

// // ─── Dynamic field builder ─────────────────────────────────────────────────
// // Crew roles supported
// const CREW_ROLES = ["director", "producer", "writer", "musicDirector", "cinematographer", "editor"];

// // Max 20 crew members per role  |  Max 50 cast members
// const MAX_CREW_PER_ROLE = 20;
// const MAX_CAST = 50;

// const crewImageFields = CREW_ROLES.flatMap((role) =>
//   Array.from({ length: MAX_CREW_PER_ROLE }, (_, i) => ({
//     name: `crewImages_${role}_${i}`,
//     maxCount: 1,
//   }))
// );

// const castImageFields = Array.from({ length: MAX_CAST }, (_, i) => ({
//   name: `castImage_${i}`,
//   maxCount: 1,
// }));

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 * 1024 }, // 5 GB per file
// }).fields([
//   // Videos
//   { name: "movieFile",        maxCount: 1 },
//   { name: "trailerFile",      maxCount: 1 },   // ← NEW: trailer upload

//   // Posters / banners
//   { name: "horizontalBanner", maxCount: 1 },
//   { name: "verticalPoster",   maxCount: 1 },
//   { name: "logo",             maxCount: 1 },

//   // Crew member photos  (crewImages_<role>_<index>)
//   ...crewImageFields,

//   // Cast member photos  (castImage_<index>)
//   ...castImageFields,
// ]);

// // ─── Routes ────────────────────────────────────────────────────────────────
// router.post(   "/",              auth, upload, createMovie);
// router.get(    "/",              auth,         getMovies);
// router.get(    "/:id",           auth,         getMovieById);
// router.put(    "/:id",           auth, upload, updateMovie);
// router.delete( "/:id",           auth,         deleteMovie);
// router.patch(  "/:id/publish",   auth,         togglePublish);
// router.get(    "/:id/stream",    auth,         getVideoStreamUrl);

// module.exports = router;




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
} = require("../controllers/movieController");

const storage = multer.memoryStorage();

// ─── Dynamic field builder ─────────────────────────────────────────────────
// Crew roles supported
const CREW_ROLES = ["director", "producer", "writer", "musicDirector", "cinematographer", "editor"];

// Max 20 crew members per role  |  Max 50 cast members
const MAX_CREW_PER_ROLE = 20;
const MAX_CAST = 50;

const crewImageFields = CREW_ROLES.flatMap((role) =>
  Array.from({ length: MAX_CREW_PER_ROLE }, (_, i) => ({
    name: `crewImages_${role}_${i}`,
    maxCount: 1,
  }))
);

const castImageFields = Array.from({ length: MAX_CAST }, (_, i) => ({
  name: `castImage_${i}`,
  maxCount: 1,
}));

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 * 1024 }, // 5 GB per file
}).fields([
  // Videos
  { name: "movieFile",        maxCount: 1 },
  { name: "trailerFile",      maxCount: 1 },   // ← NEW: trailer upload

  // Posters / banners
  { name: "horizontalBanner", maxCount: 1 },
  { name: "verticalPoster",   maxCount: 1 },
  { name: "logo",             maxCount: 1 },

  // Crew member photos  (crewImages_<role>_<index>)
  ...crewImageFields,

  // Cast member photos  (castImage_<index>)
  ...castImageFields,
]);

// ─── Routes ────────────────────────────────────────────────────────────────
router.post(   "/",               upload, createMovie);
router.get(    "/",                       getMovies);
router.get(    "/:id",                    getMovieById);
router.put(    "/:id",            upload, updateMovie);
router.delete( "/:id",                    deleteMovie);
router.patch(  "/:id/publish",            togglePublish);
router.get(    "/:id/stream",             getVideoStreamUrl);

module.exports = router;
