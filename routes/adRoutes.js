const express = require("express");
const router = express.Router();

const adController = require("../controllers/adController");
const { auth, requireAdmin } = require("../middleware/authMiddleware");

// 🎬 PLAYER
router.get("/player", adController.getAdsForPlayer);

// 🔐 ADMIN
router.post("/create",  adController.createAd);
router.get("/all",  adController.getAllAds);
router.get("/:id",  adController.getAdById);
router.put("/update/:id",  adController.updateAd);
router.delete("/delete/:id",  adController.deleteAd);
router.put("/toggle/:id",  adController.toggleAdStatus);

module.exports = router;
