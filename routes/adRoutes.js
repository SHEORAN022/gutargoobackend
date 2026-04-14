const express = require("express");
const router = express.Router();

const adController = require("../controllers/adController");
const { auth, requireAdmin } = require("../middleware/authMiddleware");

// 🎬 PLAYER
router.get("/player", adController.getAdsForPlayer);

// 🔐 ADMIN
router.post("/create", auth, requireAdmin, adController.createAd);
router.get("/all", auth, requireAdmin, adController.getAllAds);
router.get("/:id", auth, requireAdmin, adController.getAdById);
router.put("/update/:id", auth, requireAdmin, adController.updateAd);
router.delete("/delete/:id", auth, requireAdmin, adController.deleteAd);
router.put("/toggle/:id", auth, requireAdmin, adController.toggleAdStatus);

module.exports = router;
