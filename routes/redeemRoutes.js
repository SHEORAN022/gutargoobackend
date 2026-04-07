const express = require("express");
const router = express.Router();

const {
  createRedeemCode,
  getAllCodes,
  deleteCode,
  redeemCode,
  getAvailableCodes,
} = require("../controllers/redeemController");

// ✅ ONLY USER AUTH (admin ke liye hata diya)
const { auth } = require("../middleware/authMiddleware");


/* ================= ADMIN ROUTES (NO AUTH) ================= */

// ➕ Create Redeem Code
router.post("/redeem/admin/create", createRedeemCode);

// 📋 Get All Redeem Codes
router.get("/redeem/admin/all", getAllCodes);

// ❌ Delete Redeem Code
router.delete("/redeem/admin/:id", deleteCode);


/* ================= USER ROUTES (WITH AUTH) ================= */

// 📋 Get Available Codes (login required)
router.get("/redeem/list", auth, getAvailableCodes);

// 🎁 Apply Redeem Code (login required)
router.post("/redeem", auth, redeemCode);


module.exports = router;