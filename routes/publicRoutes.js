const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

const formatCrew = (movie) => {
  const roles = ["director", "producer", "writer", "musicDirector", "cinematographer", "editor"];
  let crew = [];

  roles.forEach((role) => {
    if (movie[role]) {
      movie[role].forEach((p) => {
        crew.push({
          role,
          name: p.name,
          imageUrl: p.imageUrl,
        });
      });
    }
  });

  return crew;
};

const formatMovie = (movie) => {
  const obj = movie.toObject ? movie.toObject() : movie;

  const crew = formatCrew(obj);
  const cast = [...(obj.castMembers || [])];

  delete obj.director;
  delete obj.producer;
  delete obj.writer;
  delete obj.musicDirector;
  delete obj.cinematographer;
  delete obj.editor;
  delete obj.castMembers;

  return {
    ...obj,
    crew,
    cast,
  };
};

// ✅ 1. Get all published movies
router.get("/movies", async (req, res) => {
  // try {
  //   const { page = 1, limit = 20, sortBy = "-createdAt" } = req.query;
    
  //   const movies = await Movie.find({ 
  //     publishStatus: true,
  //     publishDate: { $lte: new Date() }
  //   })
  //   .sort(sortBy)
  //   .limit(parseInt(limit))
  //   .skip((parseInt(page) - 1) * parseInt(limit));
    
  //   const total = await Movie.countDocuments({ 
  //     publishStatus: true,
  //     publishDate: { $lte: new Date() }
  //   });
    
  //   res.json({
  //     success: true,
  //     // data: movies,
  //     data: movies.map(movie => formatMovie(movie)),
  //     pagination: {
  //       page: parseInt(page),
  //       limit: parseInt(limit),
  //       total,
  //       totalPages: Math.ceil(total / parseInt(limit))
  //     }
  //   });
  // } catch (error) {
  //   res.status(500).json({ success: false, message: error.message });
  // }

    try {
    const {type} = req.query
    //select 
    const movies = await Movie.find().sort({ createdAt: -1 });
    // const moviesWithUrls = movies.map((movie) => ({
    //   ...movie.toObject(),
    //   ...buildResponseExtras(movie),
    // }));

   const moviesWithUrls = movies.map((movie) => {
  const movieObj = movie.toObject();

  // ❗ PEHLE crew bana
  // const crew = formatCrew(movieObj);
  const crew = formatCrew(movie);
  // const cast = movieObj.castMembers;
  const cast = [...(movieObj.castMembers || [])];

  // ❗ PHIR delete karo
  delete movieObj.director;
  delete movieObj.producer;
  delete movieObj.writer;
  delete movieObj.musicDirector;
  delete movieObj.cinematographer;
  delete movieObj.editor;
  delete movieObj.castMembers;

  return {
    ...movieObj,
    ...buildResponseExtras(movie),

    crew,
    cast,
  };
});  res.json({ success: true, data: moviesWithUrls });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});




// ✅ 2. Get single movie by ID
router.get("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findOne({ 
      _id: req.params.id, 
      publishStatus: true,
      publishDate: { $lte: new Date() }
    });
    
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }
    
    // Increment view count
    movie.viewCount += 1;
    await movie.save();
    
    // res.json({ success: true, data: movie });
    res.json({ success: true, data: formatMovie(movie) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ 3. Get featured movies
router.get("/featured", async (req, res) => {
  try {
    const movies = await Movie.find({
      featuredMovie: true,
      publishStatus: true,
      publishDate: { $lte: new Date() }
    })
    .limit(10)
    .sort({ viewCount: -1 });
    
    // res.json({ success: true, data: movies });
    res.json({ success: true, data: movies.map(movie => formatMovie(movie)) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ 4. Get movies by genre
router.get("/genre/:genre", async (req, res) => {
  try {
    const movies = await Movie.find({
      genres: req.params.genre,
      publishStatus: true,
      publishDate: { $lte: new Date() }
    })
    .limit(20)
    .sort({ releaseYear: -1 });
    
    // res.json({ success: true, data: movies });
    res.json({ success: true, data: movies.map(movie => formatMovie(movie)) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ 5. Get latest movies
router.get("/latest", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const movies = await Movie.find({
      publishStatus: true,
      publishDate: { $lte: new Date() }
    })
    .sort({ releaseYear: -1, createdAt: -1 })
    .limit(limit);
    
    // res.json({ success: true, data: movies });
    res.json({ success: true, data: movies.map(movie => formatMovie(movie)) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ 6. Get trending movies (by views)
router.get("/trending", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const movies = await Movie.find({
      publishStatus: true,
      publishDate: { $lte: new Date() }
    })
    .sort({ viewCount: -1 })
    .limit(limit);
    
    // res.json({ success: true, data: movies });
    res.json({ success: true, data: movies.map(movie => formatMovie(movie)) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ 7. Search movies
router.get("/search", async (req, res) => {
  try {
    const { q, page = 1, limit = 20 } = req.query;
    
    if (!q) {
      return res.status(400).json({ 
        success: false, 
        message: "Search query (q) is required" 
      });
    }
    
    const query = {
      publishStatus: true,
      publishDate: { $lte: new Date() },
      $or: [
        { movieTitle: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { genres: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
        { director: { $regex: q, $options: "i" } },
        { castMembers: { $elemMatch: { name: { $regex: q, $options: "i" } } } }
      ]
    };
    
    const movies = await Movie.find(query)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ viewCount: -1 });
    
    const total = await Movie.countDocuments(query);
    
    res.json({
      success: true,
      data: movies,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ 8. Get all genres with counts
router.get("/genres", async (req, res) => {
  try {
    const movies = await Movie.find({
      publishStatus: true,
      publishDate: { $lte: new Date() }
    });
    
    const genreMap = new Map();
    movies.forEach(movie => {
      if (movie.genres && Array.isArray(movie.genres)) {
        movie.genres.forEach(genre => {
          genreMap.set(genre, (genreMap.get(genre) || 0) + 1);
        });
      }
    });
    
    const genres = Array.from(genreMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
    
    res.json({ success: true, data: genres });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ 9. Get movie statistics
router.get("/stats", async (req, res) => {
  try {
    const totalMovies = await Movie.countDocuments({
      publishStatus: true,
      publishDate: { $lte: new Date() }
    });
    
    const totalViews = await Movie.aggregate([
      { $match: { publishStatus: true, publishDate: { $lte: new Date() } } },
      { $group: { _id: null, total: { $sum: "$viewCount" } } }
    ]);
    
    const topGenres = await Movie.aggregate([
      { $match: { publishStatus: true, publishDate: { $lte: new Date() } } },
      { $unwind: "$genres" },
      { $group: { _id: "$genres", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    const recentMovies = await Movie.find({
      publishStatus: true,
      publishDate: { $lte: new Date() }
    })
    .sort({ createdAt: -1 })
    .limit(5)
    .select("movieTitle releaseYear viewCount");
    
    res.json({
      success: true,
      data: {
        totalMovies,
        totalViews: totalViews[0]?.total || 0,
        topGenres,
        recentMovies
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ 10. Get random movies (for recommendations)
router.get("/random", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const movies = await Movie.aggregate([
      { $match: { publishStatus: true, publishDate: { $lte: new Date() } } },
      { $sample: { size: limit } }
    ]);
    
    // res.json({ success: true, data: movies });
    res.json({ success: true, data: movies.map(movie => formatMovie(movie)) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ 11. Get movies by year
router.get("/year/:year", async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const limit = parseInt(req.query.limit) || 20;
    
    const movies = await Movie.find({
      releaseYear: year,
      publishStatus: true,
      publishDate: { $lte: new Date() }
    })
    .limit(limit)
    .sort({ viewCount: -1 });
    
    // res.json({ success: true, data: movies });
    res.json({ success: true, data: movies.map(movie => formatMovie(movie)) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ 12. Get movies by language
router.get("/language/:language", async (req, res) => {
  try {
    const language = req.params.language;
    const limit = parseInt(req.query.limit) || 20;
    
    const movies = await Movie.find({
      language: { $regex: language, $options: "i" },
      publishStatus: true,
      publishDate: { $lte: new Date() }
    })
    .limit(limit)
    .sort({ releaseYear: -1 });
    
    // res.json({ success: true, data: movies });
    res.json({ success: true, data: movies.map(movie => formatMovie(movie)) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ 13. Get movies by age rating
router.get("/agerating/:rating", async (req, res) => {
  try {
    const rating = req.params.rating;
    const limit = parseInt(req.query.limit) || 20;
    
    const movies = await Movie.find({
      ageRating: rating,
      publishStatus: true,
      publishDate: { $lte: new Date() }
    })
    .limit(limit)
    .sort({ releaseYear: -1 });
    
    // res.json({ success: true, data: movies });
    res.json({ success: true, data: movies.map(movie => formatMovie(movie)) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ 14. Get movies by director
router.get("/director/:director", async (req, res) => {
  try {
    const director = req.params.director;
    const limit = parseInt(req.query.limit) || 20;
    
    const movies = await Movie.find({
      director: { $regex: director, $options: "i" },
      publishStatus: true,
      publishDate: { $lte: new Date() }
    })
    .limit(limit)
    .sort({ releaseYear: -1 });
    
    // res.json({ success: true, data: movies });
    res.json({ success: true, data: movies.map(movie => formatMovie(movie)) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ 15. Get movies by cast
router.get("/cast/:cast", async (req, res) => {
  try {
    const castName = req.params.cast;
    const limit = parseInt(req.query.limit) || 20;
    
    const movies = await Movie.find({
      "castMembers.name": { $regex: castName, $options: "i" },
      publishStatus: true,
      publishDate: { $lte: new Date() }
    })
    .limit(limit)
    .sort({ releaseYear: -1 });
    
    // res.json({ success: true, data: movies });
    res.json({ success: true, data: movies.map(movie => formatMovie(movie)) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ 16. Get featured + popular movies combo
router.get("/home", async (req, res) => {
  try {
    // Featured movies (5)
    const featured = await Movie.find({
      featuredMovie: true,
      publishStatus: true,
      publishDate: { $lte: new Date() }
    })
    .limit(5)
    .sort({ viewCount: -1 });
    
    // Trending movies (10)
    const trending = await Movie.find({
      publishStatus: true,
      publishDate: { $lte: new Date() }
    })
    .sort({ viewCount: -1 })
    .limit(10);
    
    // Latest movies (10)
    const latest = await Movie.find({
      publishStatus: true,
      publishDate: { $lte: new Date() }
    })
    .sort({ releaseYear: -1, createdAt: -1 })
    .limit(10);
    
    // Recommended (random 8)
    const recommended = await Movie.aggregate([
      { $match: { publishStatus: true, publishDate: { $lte: new Date() } } },
      { $sample: { size: 8 } }
    ]);
    
    res.json({
      success: true,
      data: {
        featured,
        trending,
        latest,
        recommended
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ 17. Get movie trailers (movies with video URLs)
router.get("/trailers", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const movies = await Movie.find({
      publishStatus: true,
      publishDate: { $lte: new Date() },
      $or: [
        { movieFileUrl: { $ne: "" } },
        { customVideoUrl: { $ne: "" } },
        { "movieFile.url": { $ne: "" } }
      ]
    })
    .limit(limit)
    .sort({ viewCount: -1 })
    .select("movieTitle tagline description genres releaseYear duration imdbRating verticalPoster horizontalBanner movieFileUrl customVideoUrl");
    
    // res.json({ success: true, data: movies });
    res.json({ success: true, data: movies.map(movie => formatMovie(movie)) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ 18. Health check for public API
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Public API is running",
    timestamp: new Date().toISOString(),
    endpoints: [
      "/api/public/movies",
      "/api/public/movies/:id",
      "/api/public/featured",
      "/api/public/genre/:genre",
      "/api/public/latest",
      "/api/public/trending",
      "/api/public/search?q=",
      "/api/public/genres",
      "/api/public/stats",
      "/api/public/random",
      "/api/public/year/:year",
      "/api/public/language/:language",
      "/api/public/agerating/:rating",
      "/api/public/director/:director",
      "/api/public/cast/:cast",
      "/api/public/home",
      "/api/public/trailers"
    ]
  });
});

module.exports = router;