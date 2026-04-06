const Movie = require("../models/Movie");
const axios = require("axios");

const downloadFromBunny = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    const videoUrl = movie?.movieFile?.mp4Url;

    if (!videoUrl) {
      return res.status(400).json({
        success: false,
        message: "MP4 not available",
      });
    }

    console.log("👉 URL:", videoUrl);

    const response = await axios({
      method: "GET",
      url: videoUrl,
      responseType: "stream",
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${movie.movieTitle}.mp4`
    );
    res.setHeader("Content-Type", "video/mp4");

    response.data.pipe(res);

  } catch (error) {
    console.log("❌ ERROR:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { downloadFromBunny };