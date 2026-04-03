const express = require("express");
const router = express.Router();
const { auth, requireAdmin } = require("../middleware/authMiddleware");

router.get("/user", auth, (req, res) => {
  res.json({ message: "User Dashboard", user: req.user });
});

router.get("/admin", auth, requireAdmin, (req, res) => {
  res.json({ message: "Admin Dashboard", user: req.user });
});

module.exports = router;