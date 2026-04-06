const express = require("express")
const router = express.Router();
const multer = require("multer");
const { auth } = require("../middleware/authMiddleware");
const {
  createCastAndCrew,
  getCastAndCrew,
  updateCastAndCrew,
  deleteCastAndCrew,
  getCastCrewByID,
} = require("../controllers/castCrewController");

const storage = multer.memoryStorage();

const upload = multer({ storage }).fields([
  { name: "profileImage", maxCount: 1 },
]);

router.get("/", auth, getCastAndCrew);
router.post("/", auth, upload, createCastAndCrew);
router.get("/:id", auth, getCastCrewByID);
router.put("/:id", auth, upload, updateCastAndCrew);
router.delete("/:id", auth,   deleteCastAndCrew);

module.exports = router;