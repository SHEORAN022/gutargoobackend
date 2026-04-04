

// // controllers/bannerController.js
// const Banner = require("../models/Banner");
// const Movie = require("../models/Movie");
// const Category = require("../models/Category");
// const bunnyService = require("../services/bunnyService");

// // 🔥 upload helper
// const uploadImage = async (file, prefix) => {
//   try {
//     const result = await bunnyService.uploadImage(
//       file.buffer,
//       `${prefix}_${Date.now()}_${file.originalname}`,
//       file.mimetype
//     );

//     return {
//       url: result.url,
//       publicId: result.publicId,
//     };
//   } catch (err) {
//     console.log("Upload error:", err.message);
//     return null;
//   }
// };

// // ✅ CREATE BANNER
// exports.createBanner = async (req, res) => {
//   try {
//     console.log("BODY:", req.body);
//     console.log("FILES:", req.files);

//     const { 
//       title, 
//       description,
//       categoryId, 
//       movieId,
//       moviesList,
//       bannerType,
//       displayOrder,
//       visibleOn
//     } = req.body;

//     if (!title || !categoryId) {
//       return res.status(400).json({
//         success: false,
//         message: "Title & categoryId are required",
//       });
//     }

//     let data = {
//       title,
//       description: description || "",
//       categoryId,
//       bannerType: bannerType || "category_movies",
//       displayOrder: parseInt(displayOrder) || 0,
//       visibleOn: visibleOn || "home",
//       createdBy: req.user?.id,
//     };

//     // Handle movie selection based on banner type
//     if (bannerType === "single_movie" && movieId) {
//       data.movieId = movieId;
//     }

//     if (bannerType === "custom_list" && moviesList) {
//       // Parse moviesList if it's a string (from form-data)
//       const parsedMoviesList = typeof moviesList === 'string' 
//         ? JSON.parse(moviesList) 
//         : moviesList;
//       data.moviesList = parsedMoviesList;
//     }

//     // logo upload
//     if (req.files?.logoImage?.[0]) {
//       const logo = await uploadImage(req.files.logoImage[0], "logo");
//       if (logo) data.logoImage = logo;
//     }

//     // banner upload
//     if (req.files?.bannerImage?.[0]) {
//       const banner = await uploadImage(req.files.bannerImage[0], "banner");
//       if (banner) data.bannerImage = banner;
//     }

//     const banner = await Banner.create(data);

//     // Populate the response
//     const populatedBanner = await Banner.findById(banner._id)
//       .populate("categoryId", "name slug")
//       .populate("movieId", "movieTitle posterImage verticalPoster")
//       .populate("moviesList", "movieTitle posterImage verticalPoster releaseYear");

//     res.status(201).json({
//       success: true,
//       message: "Banner created successfully",
//       data: populatedBanner,
//     });
//   } catch (err) {
//     console.error("Create error:", err);
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// // ✅ GET ALL BANNERS (Admin)
// exports.getBanners = async (req, res) => {
//   try {
//     const banners = await Banner.find()
//       .populate("categoryId", "name slug")
//       .populate("movieId", "movieTitle posterImage verticalPoster releaseYear")
//       .populate("moviesList", "movieTitle posterImage verticalPoster releaseYear imdbRating")
//       .sort({ displayOrder: 1, createdAt: -1 });

//     res.json({
//       success: true,
//       data: banners,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ GET SINGLE BANNER
// exports.getBannerById = async (req, res) => {
//   try {
//     const banner = await Banner.findById(req.params.id)
//       .populate("categoryId", "name slug")
//       .populate("movieId", "movieTitle posterImage verticalPoster releaseYear duration imdbRating")
//       .populate("moviesList", "movieTitle posterImage verticalPoster releaseYear duration imdbRating");

//     if (!banner) {
//       return res.status(404).json({
//         success: false,
//         message: "Banner not found",
//       });
//     }

//     res.json({ success: true, data: banner });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ UPDATE BANNER
// exports.updateBanner = async (req, res) => {
//   try {
//     let updateData = {};

//     // Basic fields
//     if (req.body.title) updateData.title = req.body.title;
//     if (req.body.description !== undefined) updateData.description = req.body.description;
//     if (req.body.categoryId) updateData.categoryId = req.body.categoryId;
//     if (req.body.bannerType) updateData.bannerType = req.body.bannerType;
//     if (req.body.displayOrder !== undefined) updateData.displayOrder = parseInt(req.body.displayOrder);
//     if (req.body.visibleOn) updateData.visibleOn = req.body.visibleOn;
//     if (req.body.publishStatus !== undefined) updateData.publishStatus = req.body.publishStatus === "true" || req.body.publishStatus === true;

//     // Handle movie selection based on banner type
//     if (req.body.bannerType === "single_movie" && req.body.movieId) {
//       updateData.movieId = req.body.movieId;
//       updateData.moviesList = [];
//     } else if (req.body.bannerType === "custom_list" && req.body.moviesList) {
//       const parsedMoviesList = typeof req.body.moviesList === 'string' 
//         ? JSON.parse(req.body.moviesList) 
//         : req.body.moviesList;
//       updateData.moviesList = parsedMoviesList;
//       updateData.movieId = null;
//     } else if (req.body.bannerType === "category_movies") {
//       updateData.movieId = null;
//       updateData.moviesList = [];
//     }

//     // Image uploads
//     if (req.files?.logoImage?.[0]) {
//       const logo = await uploadImage(req.files.logoImage[0], "logo");
//       if (logo) updateData.logoImage = logo;
//     }

//     if (req.files?.bannerImage?.[0]) {
//       const banner = await uploadImage(req.files.bannerImage[0], "banner");
//       if (banner) updateData.bannerImage = banner;
//     }

//     const banner = await Banner.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     )
//       .populate("categoryId", "name slug")
//       .populate("movieId", "movieTitle posterImage verticalPoster")
//       .populate("moviesList", "movieTitle posterImage verticalPoster releaseYear");

//     if (!banner) {
//       return res.status(404).json({
//         success: false,
//         message: "Banner not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Banner updated successfully",
//       data: banner,
//     });
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ DELETE BANNER
// exports.deleteBanner = async (req, res) => {
//   try {
//     const banner = await Banner.findByIdAndDelete(req.params.id);

//     if (!banner) {
//       return res.status(404).json({
//         success: false,
//         message: "Banner not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Banner deleted successfully",
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ TOGGLE PUBLISH STATUS
// exports.togglePublish = async (req, res) => {
//   try {
//     const banner = await Banner.findById(req.params.id);

//     if (!banner) {
//       return res.status(404).json({
//         success: false,
//         message: "Banner not found",
//       });
//     }

//     banner.publishStatus = !banner.publishStatus;
//     await banner.save();

//     res.json({
//       success: true,
//       message: `Banner ${banner.publishStatus ? "published" : "unpublished"}`,
//       data: banner,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ GET MOVIES FOR DROPDOWN (API endpoint)
// exports.getMoviesForDropdown = async (req, res) => {
//   try {
//     const { search, categoryId, limit = 50 } = req.query;
    
//     let query = { publishStatus: true };
    
//     // Filter by publish date
//     query.publishDate = { $lte: new Date() };
    
//     // Search by title
//     if (search) {
//       query.movieTitle = { $regex: search, $options: "i" };
//     }
    
//     // Filter by category
//     if (categoryId) {
//       query.categoryId = categoryId;
//     }
    
//     const movies = await Movie.find(query)
//       .select("movieTitle posterImage verticalPoster releaseYear imdbRating duration")
//       .sort({ movieTitle: 1 })
//       .limit(parseInt(limit));
    
//     // Format for dropdown
//     const formattedMovies = movies.map(movie => ({
//       _id: movie._id,
//       title: movie.movieTitle,
//       poster: movie.posterImage?.url || movie.verticalPoster?.url,
//       releaseYear: movie.releaseYear,
//       imdbRating: movie.imdbRating,
//       duration: movie.duration,
//       label: `${movie.movieTitle} (${movie.releaseYear || "N/A"})`,
//       value: movie._id
//     }));
    
//     res.json({
//       success: true,
//       data: formattedMovies,
//     });
//   } catch (err) {
//     console.error("Error fetching movies:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };






const Banner = require("../models/Banner");
const bunnyService = require("../services/bunnyService");

/* ============================================
   🔥 IMAGE UPLOAD HELPER
============================================ */
const uploadImage = async (file, prefix) => {
  try {
    const result = await bunnyService.uploadImage(
      file.buffer,
      `${prefix}_${Date.now()}_${file.originalname}`,
      file.mimetype
    );

    return {
      url: result.url,
      publicId: result.publicId,
    };
  } catch (err) {
    console.log("Upload error:", err.message);
    return null;
  }
};

/* ============================================
   ✅ CREATE BANNER
============================================ */
exports.createBanner = async (req, res) => {
  try {
    const {
      title,
      description,
      categoryId,
      movieId,
      displayOrder,
      visibleOn,
    } = req.body;

    // validation
    if (!title || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Title & categoryId are required",
      });
    }

    const data = {
      title,
      description: description || "",
      categoryId,
      movieId: movieId || null, // 🔥 SINGLE MOVIE
      displayOrder: Number(displayOrder) || 0,
      visibleOn: visibleOn || "home",
      createdBy: req.user?.id || null,
    };

    // logo upload
    if (req.files?.logoImage?.[0]) {
      const logo = await uploadImage(req.files.logoImage[0], "logo");
      if (logo) data.logoImage = logo;
    }

    // banner upload
    if (req.files?.bannerImage?.[0]) {
      const banner = await uploadImage(req.files.bannerImage[0], "banner");
      if (banner) data.bannerImage = banner;
    }

    const banner = await Banner.create(data);

    // populate
    const result = await Banner.findById(banner._id)
      .populate("categoryId", "name")
      .populate("movieId", "movieTitle posterImage verticalPoster releaseYear");

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: result,
    });

  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ============================================
   ✅ GET ALL BANNERS
============================================ */
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find()
      .populate("categoryId", "name")
      .populate("movieId", "movieTitle posterImage verticalPoster releaseYear")
      .sort({ displayOrder: 1, createdAt: -1 });

    res.json({
      success: true,
      data: banners,
    });

  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ============================================
   ✅ GET SINGLE BANNER
============================================ */
exports.getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id)
      .populate("categoryId", "name")
      .populate(
        "movieId",
        "movieTitle posterImage verticalPoster releaseYear duration imdbRating"
      );

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.json({
      success: true,
      data: banner,
    });

  } catch (err) {
    console.error("GET ONE ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ============================================
   ✅ UPDATE BANNER
============================================ */
exports.updateBanner = async (req, res) => {
  try {
    let updateData = {};

    if (req.body.title) updateData.title = req.body.title;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.categoryId) updateData.categoryId = req.body.categoryId;
    if (req.body.movieId !== undefined) updateData.movieId = req.body.movieId;
    if (req.body.displayOrder !== undefined) updateData.displayOrder = Number(req.body.displayOrder);
    if (req.body.visibleOn) updateData.visibleOn = req.body.visibleOn;

    if (req.body.publishStatus !== undefined) {
      updateData.publishStatus =
        req.body.publishStatus === true || req.body.publishStatus === "true";
    }

    // logo
    if (req.files?.logoImage?.[0]) {
      const logo = await uploadImage(req.files.logoImage[0], "logo");
      if (logo) updateData.logoImage = logo;
    }

    // banner
    if (req.files?.bannerImage?.[0]) {
      const banner = await uploadImage(req.files.bannerImage[0], "banner");
      if (banner) updateData.bannerImage = banner;
    }

    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
      .populate("categoryId", "name")
      .populate("movieId", "movieTitle posterImage verticalPoster releaseYear");

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.json({
      success: true,
      message: "Banner updated successfully",
      data: banner,
    });

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ============================================
   ✅ DELETE BANNER
============================================ */
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.json({
      success: true,
      message: "Banner deleted successfully",
    });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ============================================
   ✅ TOGGLE PUBLISH
============================================ */
exports.togglePublish = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    banner.publishStatus = !banner.publishStatus;
    await banner.save();

    res.json({
      success: true,
      message: `Banner ${banner.publishStatus ? "Published" : "Unpublished"}`,
      data: banner,
    });

  } catch (err) {
    console.error("TOGGLE ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};exports.getMoviesForDropdown = async (req, res) => {
  try {
    const movies = await require("../models/Movie")
      .find()
      .select("movieTitle")
      .limit(50);

    res.json({
      success: true,
      data: movies,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
