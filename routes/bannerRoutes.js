
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { auth } = require("../middleware/authMiddleware");
// const {
//   createBanner,
//   getBanners,
//   getBannerById,
//   updateBanner,
//   deleteBanner,
//   togglePublish,
//   getMoviesForDropdown,
// } = require("../controllers/bannerController");

// const storage = multer.memoryStorage();

// const upload = multer({ storage }).fields([
//   { name: "logoImage", maxCount: 1 },
//   { name: "bannerImage", maxCount: 1 },
// ]);

// // Movie dropdown endpoint
// router.get("/movies-dropdown", auth, getMoviesForDropdown);

// // Banner CRUD routes
// router.post("/", auth, upload, createBanner);
// router.get("/", auth, getBanners);
// router.get("/:id", auth, getBannerById);
// router.put("/:id", auth, upload, updateBanner);
// router.delete("/:id", auth, deleteBanner);
// router.patch("/:id/toggle-publish", auth, togglePublish);

// module.exports = router;



const express = require("express");
const router = express.Router();
const multer = require("multer");
const { protect } = require("../middleware/authMiddleware"); // apna auth middleware
const {
  getAllBanners,
  addBanner,
  editBanner,
  deleteBanner,
} = require("../controllers/bannerController");

// ⚠️ IMPORTANT: Bunny CDN ke liye memoryStorage chahiye (diskStorage nahi)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files allowed"), false);
    }
  },
});

const uploadFields = upload.fields([
  { name: "bannerImage", maxCount: 1 },
  { name: "logoImage", maxCount: 1 },
]);

// Public - frontend banner list fetch karta hai bina login ke
router.get("/public/banner/banners", getAllBanners);

// Protected
router.post("/banner",  uploadFields, addBanner);
router.put("/banner/:id", uploadFields, editBanner);
router.delete("/banner/:id",  deleteBanner);

module.exports = router;