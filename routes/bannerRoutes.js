
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth } = require("../middleware/authMiddleware");
const {
  createBanner,
  getBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
  togglePublish,
  getMoviesForDropdown,
} = require("../controllers/bannerController");

const storage = multer.memoryStorage();

const upload = multer({ storage }).fields([
  { name: "logoImage", maxCount: 1 },
  { name: "bannerImage", maxCount: 1 },
]);

// Movie dropdown endpoint
router.get("/movies-dropdown", auth, getMoviesForDropdown);

// Banner CRUD routes
router.post("/", auth, upload, createBanner);
router.get("/", auth, getBanners);
router.get("/:id", auth, getBannerById);
router.put("/:id", auth, upload, updateBanner);
router.delete("/:id", auth, deleteBanner);
router.patch("/:id/toggle-publish", auth, togglePublish);

module.exports = router;
