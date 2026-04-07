const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth } = require("../middleware/authMiddleware");
const {
  createCastAndCrew,
  getCastAndCrew,
  updateCastAndCrew,
  deleteCastAndCrew,
  getCastCrewByID,
  getAllCasetAndCrew
} = require("../controllers/castCrewController");

const storage = multer.memoryStorage();

const upload = multer({ storage }).fields([
  { name: "profileImage", maxCount: 1 },
]);

router.get("/",  getCastAndCrew);
router.post("/",  upload, createCastAndCrew);
router.get("/:id",  getCastCrewByID);
router.put("/:id",  upload, updateCastAndCrew);
router.delete("/:id",  deleteCastAndCrew);
router.get("/getAll",getAllCasetAndCrew)

module.exports = router;
