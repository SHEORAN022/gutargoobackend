const express = require("express");
const router = express.Router();

const {
  sendOtp,
  verifyOtp,getUsersDataAll
} = require("../controllers/otpController");

router.post("/send", sendOtp);
router.post("/verify", verifyOtp);
router.get("/getUsers",getUsersDataAll)

module.exports = router;
