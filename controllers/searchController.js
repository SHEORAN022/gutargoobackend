const Movie = require("../models/Movie");

const searchMovies = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;

    // ❌ agar query nahi hai
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query required",
      });
    }

    const skip = (page - 1) * limit;

    // 🔥 MAIN SEARCH
    const movies = await Movie.find(
      {
        $text: { $search: query },
        publishStatus: true,
      },
      {
        score: { $meta: "textScore" },
      }
    )
      .sort({ score: { $meta: "textScore" } }) // best match first
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .select("-movieFile.url -movieFile.hlsUrl -movieFile.mp4Url"); // 🔒 secure

    // 🔢 total count (pagination ke liye)
    const total = await Movie.countDocuments({
      $text: { $search: query },
      publishStatus: true,
    });

    res.status(200).json({
      success: true,
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
      data: movies,
    });

  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { searchMovies };
