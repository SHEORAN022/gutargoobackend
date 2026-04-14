const Ad = require("../models/adModel");

/* ================= CREATE ================= */
exports.createAd = async (req, res) => {
  try {
    const ad = await Ad.create({
      ...req.body,
      createdBy: req.user?._id,
    });

    res.status(201).json({
      success: true,
      message: "Ad created successfully",
      data: ad,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= GET ALL (ADMIN) ================= */
exports.getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find()
      .sort({ showAt: 1, createdAt: -1 });

    res.json({
      success: true,
      count: ads.length,
      data: ads,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= GET SINGLE ================= */
exports.getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Ad not found",
      });
    }

    res.json({
      success: true,
      data: ad,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= UPDATE ================= */
exports.updateAd = async (req, res) => {
  try {
    const ad = await Ad.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Ad not found",
      });
    }

    res.json({
      success: true,
      message: "Ad updated",
      data: ad,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= DELETE ================= */
exports.deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findByIdAndDelete(req.params.id);

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Ad not found",
      });
    }

    res.json({
      success: true,
      message: "Ad deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= TOGGLE ================= */
exports.toggleAdStatus = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Ad not found",
      });
    }

    ad.isActive = !ad.isActive;
    await ad.save();

    res.json({
      success: true,
      message: `Ad ${ad.isActive ? "Activated" : "Deactivated"}`,
      data: ad,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= PLAYER API (MAIN 🔥) ================= */
exports.getAdsForPlayer = async (req, res) => {
  try {
    const ads = await Ad.find({ isActive: true })
      .sort({ showAt: 1 });

    res.json({
      success: true,
      data: ads,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
