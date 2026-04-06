
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
router.get("/movies-dropdown",  getMoviesForDropdown);

// Banner CRUD routes
router.post("/", upload, createBanner);
router.get("/", getBanners);
router.get("/:id",  getBannerById);
router.put("/:id",  upload, updateBanner);
router.delete("/:id",  deleteBanner);
router.patch("/:id/toggle-publish",  togglePublish);

module.exports = router;
