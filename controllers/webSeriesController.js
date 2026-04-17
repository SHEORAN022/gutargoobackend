


const WebSeries = require("../models/webseries");

// CREATE
exports.createWebSeries = async (req, res) => {
  try {
    console.log("Received data:", JSON.stringify(req.body, null, 2));
    
    const { title, description, genre, lang, releaseDate, isPublished, 
            thumbnail, horizontalBanner, verticalPoster, trailer, seasons } = req.body;
    
    // Simple validation
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    
    // Create new web series
    const webSeries = new WebSeries({
      title,
      description: description || "",
      genre: genre || [],
      lang: lang || "Hindi",
      releaseDate: releaseDate || new Date(),
      isPublished: isPublished !== false,
      thumbnail: thumbnail || "",
      horizontalBanner: horizontalBanner || "",
      verticalPoster: verticalPoster || "",
      trailer: trailer || {},
      seasons: seasons || []
    });
    
    await webSeries.save();
    
    res.status(201).json({
      success: true,
      message: "WebSeries created successfully",
      data: webSeries
    });
    
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
exports.getAllWebSeries = async (req, res) => {
  try {
    const data = await WebSeries.find().sort({ createdAt: -1 });
    
    const transformedData = data.map(series => ({
      ...series.toObject(),
      status: series.isPublished ? 'published' : 'draft',
      total_seasons: series.seasons?.length || 0,
      total_episodes: series.seasons?.reduce((acc, s) => acc + (s.episodes?.length || 0), 0) || 0
    }));
    
    res.json({
      success: true,
      count: data.length,
      data: transformedData
    });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET ONE
exports.getWebSeriesById = async (req, res) => {
  try {
    const data = await WebSeries.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "WebSeries not found" });
    }
    
    res.json({
      success: true,
      data: {
        ...data.toObject(),
        status: data.isPublished ? 'published' : 'draft'
      }
    });
  } catch (err) {
    console.error("Fetch by ID error:", err);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateWebSeries = async (req, res) => {
  try {
    const { title, description, genre, lang, releaseDate, isPublished,
            thumbnail, horizontalBanner, verticalPoster, trailer, seasons } = req.body;
    
    const updated = await WebSeries.findByIdAndUpdate(
      req.params.id,
      {
        title, description, genre, lang, releaseDate, isPublished,
        thumbnail, horizontalBanner, verticalPoster, trailer, seasons
      },
      { new: true, runValidators: true }
    );
    
    if (!updated) {
      return res.status(404).json({ message: "WebSeries not found" });
    }
    
    res.json({
      success: true,
      message: "Updated successfully",
      data: updated
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteWebSeries = async (req, res) => {
  try {
    const deleted = await WebSeries.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "WebSeries not found" });
    }
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: err.message });
  }
};


// 📺 SET EPISODE SKIP INTRO
// exports.setEpisodeSkipIntro = async (req, res) => {
//   try {
//     const { seriesId, seasonIndex, episodeIndex } = req.params;
//     const { start, end } = req.body;

//     // ✅ validation
//     if (start == null || end == null) {
//       return res.status(400).json({
//         success: false,
//         message: "Start and End time required"
//       });
//     }

//     if (start < 0 || end <= start) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid intro timing"
//       });
//     }

//     // 🔍 find series
//     const series = await WebSeries.findById(seriesId);

//     if (!series) {
//       return res.status(404).json({
//         success: false,
//         message: "WebSeries not found"
//       });
//     }

//     // 🎬 find episode
//     const season = series.seasons?.[seasonIndex];
//     if (!season) {
//       return res.status(404).json({
//         success: false,
//         message: "Season not found"
//       });
//     }

//     const episode = season.episodes?.[episodeIndex];
//     if (!episode) {
//       return res.status(404).json({
//         success: false,
//         message: "Episode not found"
//       });
//     }

//     // ✅ update skip intro
//     episode.skipIntro = {
//       start,
//       end
//     };

//     await series.save();

//     res.json({
//       success: true,
//       message: "Episode skip intro updated successfully",
//       data: episode
//     });

//   } catch (err) {
//     console.error("Skip intro error:", err);
//     res.status(500).json({
//       success: false,
//       message: err.message
//     });
//   }
// };

exports.setEpisodeSkipIntro = async (req, res) => {
  try {
    const { seriesId } = req.params;
    const seasonIndex = Number(req.params.seasonIndex);
    const episodeIndex = Number(req.params.episodeIndex);
    const { start, end } = req.body;

    if (start == null || end == null) {
      return res.status(400).json({
        success: false,
        message: "Start and End required"
      });
    }

    if (start < 0 || end <= start) {
      return res.status(400).json({
        success: false,
        message: "Invalid timing"
      });
    }

    const series = await WebSeries.findById(seriesId);
    if (!series) {
      return res.status(404).json({ message: "WebSeries not found" });
    }

    const episode = series?.seasons?.[seasonIndex]?.episodes?.[episodeIndex];
    if (!episode) {
      return res.status(404).json({ message: "Episode not found" });
    }

    // optional check
    if (episode.videoFile?.duration && end > episode.videoFile.duration) {
      return res.status(400).json({
        message: "End time exceeds video duration"
      });
    }

    episode.skipIntro = { start, end };

    await series.save();

    res.json({
      success: true,
      message: "Skip intro updated",
      skipIntro: episode.skipIntro
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
