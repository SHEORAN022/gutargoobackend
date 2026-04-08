const WebSeries = require("../models/webseries") 

// ✅ CREATE WEB SERIES
// exports.createWebSeries = async (req, res) => {
//   try {
//     const data = req.body;

//     const webSeries = new WebSeries(data);

//     // calculate counts
//     webSeries.totalSeasons = data.seasons?.length || 0;

//     webSeries.totalEpisodes =
//       data.seasons?.reduce(
//         (total, s) => total + (s.episodes?.length || 0),
//         0
//       ) || 0;

//     await webSeries.save();

//     res.status(201).json({
//       success: true,
//       message: "WebSeries created successfully",
//       data: webSeries,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
exports.createWebSeries = async (req, res) => {
  try {
    const data = req.body;

    // 👉 Direct full structure pass kar
    const webSeries = new WebSeries({
      title: data.title,
      description: data.description,
      genre: data.genre,
      category: data.category,
      castAndCrew: data.castAndCrew,
      releaseDate: data.releaseDate,
      seasons: data.seasons || [],
    });

    // ✅ total seasons
    webSeries.totalSeasons = webSeries.seasons.length;

    // ✅ total episodes
    webSeries.totalEpisodes = webSeries.seasons.reduce(
      (total, season) => total + (season.episodes?.length || 0),
      0
    );

    await webSeries.save();

    res.status(201).json({
      success: true,
      message: "WebSeries + Seasons + Episodes created successfully",
      data: webSeries,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ GET ALL WEB SERIES
exports.getAllWebSeries = async (req, res) => {
  try {
    const data = await WebSeries.find()
      .populate("category")
      .populate("castAndCrew")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ✅ GET SINGLE WEB SERIES
exports.getWebSeriesById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await WebSeries.findById(id)
      .populate("category")
      .populate("castAndCrew");

    if (!data) {
      return res.status(404).json({ message: "WebSeries not found" });
    }

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ✅ ADD SEASON
exports.addSeason = async (req, res) => {
  try {
    const { webSeriesId } = req.params;

    const series = await WebSeries.findById(webSeriesId);

    if (!series) {
      return res.status(404).json({ message: "WebSeries not found" });
    }

    series.seasons.push(req.body);

    series.totalSeasons = series.seasons.length;

    await series.save();

    res.json({
      success: true,
      message: "Season added successfully",
      data: series,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ✅ ADD EPISODE
exports.addEpisode = async (req, res) => {
  try {
    const { webSeriesId, seasonNumber } = req.params;

    const series = await WebSeries.findById(webSeriesId);

    if (!series) {
      return res.status(404).json({ message: "WebSeries not found" });
    }

    const season = series.seasons.find(
      (s) => s.seasonNumber == seasonNumber
    );

    if (!season) {
      return res.status(404).json({ message: "Season not found" });
    }

    season.episodes.push(req.body);

    // update total episodes
    series.totalEpisodes = series.seasons.reduce(
      (total, s) => total + s.episodes.length,
      0
    );

    await series.save();

    res.json({
      success: true,
      message: "Episode added successfully",
      data: series,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ✅ UPDATE WEB SERIES
exports.updateWebSeries = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await WebSeries.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "WebSeries not found" });
    }

    res.json({
      success: true,
      message: "Updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ✅ DELETE WEB SERIES
exports.deleteWebSeries = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await WebSeries.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "WebSeries not found" });
    }

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};