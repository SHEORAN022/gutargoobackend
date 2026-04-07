const express = require("express");
const router = express.Router();

const {
  createRedeemCode,
  getAllCodes,
  deleteCode,
  redeemCode,
  getAvailableCodes,
} = require("../controllers/redeemController");

const { auth } = require("../middleware/authMiddleware");


router.post("/redeem/admin/create", createRedeemCode);


router.get("/redeem/admin/all", getAllCodes);
router.get("/redeem/list", getAvailableCodes);

router.post("/redeem",  redeemCode);

router.delete("/redeem/admin/:id", deleteCode);




module.exports = router;