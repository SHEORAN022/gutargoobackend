const ContinueWatching = require("../models/continueWatchingModel");

/* ================= SAVE / UPDATE ================= */
exports.saveProgress = async (req, res) => {
  try {
    const { movieId, watchedTime, duration } = req.body;

    const progress = await ContinueWatching.findOneAndUpdate(
      {
        user: req.user._id,
        movie: movieId,
      },
      {
        watchedTime,
        duration,
        isCompleted: watchedTime >= duration - 10, // last 10 sec = complete
        lastWatchedAt: new Date(),
      },
      {
        new: true,
        upsert: true, // 🔥 auto create
      }
    );

    res.json({
      success: true,
      data: progress,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= GET CONTINUE WATCHING ================= */
exports.getContinueWatching = async (req, res) => {
  try {
    const list = await ContinueWatching.find({
      user: req.user._id,
      isCompleted: false,
    })
      .populate("movie")
      .sort({ lastWatchedAt: -1 });

    res.json({
      success: true,
      data: list,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= REMOVE ================= */
exports.removeFromContinue = async (req, res) => {
  try {
    await ContinueWatching.findOneAndDelete({
      user: req.user._id,
      movie: req.params.movieId,
    });

    res.json({
      success: true,
      message: "Removed",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
