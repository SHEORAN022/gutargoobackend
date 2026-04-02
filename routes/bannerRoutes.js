
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { auth, requireAdmin } = require("../middleware/authMiddleware");
// const {
//   createBanner,
//   getAllBanners,
//   getBannersByCategory,
//   getHomeBanners,
//   getBannerById,
//   updateBanner,
//   deleteBanner,
//   toggleBannerStatus,
// } = require("../controllers/bannerController");

// // Multer configuration for file upload
// const storage = multer.memoryStorage();
// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/gif"];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only JPEG, PNG, WEBP, and GIF images are allowed"));
//     }
//   },
// });

// // ============ PUBLIC ROUTES (No Authentication) ============
// // ✅ These must come BEFORE admin routes to avoid 403
// router.get("/public/home", getHomeBanners);
// router.get("/public/category/:categoryId", getBannersByCategory);

// // ============ ADMIN ROUTES (with authentication) ============
// router.post("/", auth, requireAdmin, upload.single("image"), createBanner);
// router.get("/", auth, requireAdmin, getAllBanners);
// router.get("/:id", auth, requireAdmin, getBannerById);
// router.put("/:id", auth, requireAdmin, upload.single("image"), updateBanner);
// router.delete("/:id", auth, requireAdmin, deleteBanner);
// router.patch("/:id/toggle", auth, requireAdmin, toggleBannerStatus);

// module.exports = router;


 const express = require("express");
const router = express.Router();
const multer = require("multer");

const { auth, requireAdmin } = require("../middleware/authMiddleware");

const {
  createBanner,
  getAllBanners,
  getBannersByCategory,
  getHomeBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
  toggleBannerStatus,
} = require("../controllers/bannerController");

/* ================= MULTER CONFIG ================= */
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed"));
    }
  },
});

/* ================= PUBLIC ROUTES ================= */
// ⚠️ Always keep public routes above admin routes

// Home banners
router.get("/public/home", getHomeBanners);

// Category banners
router.get("/public/category/:categoryId", getBannersByCategory);


/* ================= ADMIN ROUTES ================= */

// Create banner
router.post(
  "/",
  auth,

  upload.fields([
    { name: "mobileImage", maxCount: 1 },
    { name: "logoImage", maxCount: 1 },
  ]),
  createBanner
);

// Get all banners
router.get("/", auth,  getAllBanners);

// Get single banner
router.get("/:id", auth,  getBannerById);

// Update banner
router.put(
  "/:id",
  auth,
  requireAdmin,
  upload.fields([
    { name: "mobileImage", maxCount: 1 },
    { name: "logoImage", maxCount: 1 },
  ]),
  updateBanner
);

// Delete banner
router.delete("/:id", auth,  deleteBanner);

// Toggle active/inactive
router.patch("/:id/toggle", auth,  toggleBannerStatus);

module.exports = router;
