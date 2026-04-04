// // const Banner = require("../models/Banner");
// // const Category = require("../models/Category");
// // const bunnyService = require("../services/bunnyService");
// // const fs = require("fs");
// // const path = require("path");

// // // Create Banner
// // exports.createBanner = async (req, res) => {
// //   try {
// //     console.log("\n========================================");
// //     console.log("🎨 CREATING BANNER");
// //     console.log("========================================");

// //     const { title, description, categoryId, link, order, isActive } = req.body;

// //     // Validate category
// //     const category = await Category.findById(categoryId);
// //     if (!category) {
// //       return res.status(404).json({ success: false, error: "Category not found" });
// //     }

// //     // Validate title
// //     if (!title) {
// //       return res.status(400).json({ success: false, error: "Title is required" });
// //     }

// //     let imageUrl = "";

// //     // Upload banner image to Bunny CDN
// //     if (req.file) {
// //       console.log("📸 Uploading banner image...");
// //       const uploadResult = await bunnyService.uploadImage(
// //         req.file.buffer,
// //         `banner_${Date.now()}_${req.file.originalname}`,
// //         req.file.mimetype
// //       );
// //       if (uploadResult && uploadResult.url) {
// //         imageUrl = uploadResult.url;
// //         console.log("✅ Image uploaded:", imageUrl);
// //       } else {
// //         // Fallback to local storage
// //         const uploadDir = path.join(__dirname, "../uploads");
// //         if (!fs.existsSync(uploadDir)) {
// //           fs.mkdirSync(uploadDir, { recursive: true });
// //         }
// //         const fileName = `banner_${Date.now()}_${req.file.originalname}`;
// //         const localPath = `/uploads/${fileName}`;
// //         fs.writeFileSync(path.join(uploadDir, fileName), req.file.buffer);
// //         imageUrl = `http://localhost:3001${localPath}`;
// //         console.log("✅ Image saved locally:", imageUrl);
// //       }
// //     } else {
// //       return res.status(400).json({ success: false, error: "Banner image is required" });
// //     }

// //     const bannerData = {
// //       title,
// //       description: description || "",
// //       imageUrl,
// //       categoryId,
// //       categoryName: category.name,
// //       link: link || "",
// //       order: parseInt(order) || 0,
// //       isActive: isActive === "true" || isActive === true,
// //       createdBy: req.user?.id,
// //     };

// //     const banner = await Banner.create(bannerData);

// //     console.log("✅ Banner created successfully!");
// //     console.log("   Title:", banner.title);
// //     console.log("   Category:", banner.categoryName);
// //     console.log("   Image:", banner.imageUrl);

// //     res.status(201).json({
// //       success: true,
// //       message: "Banner created successfully",
// //       data: banner,
// //     });
// //   } catch (error) {
// //     console.error("❌ Create banner error:", error);
// //     res.status(500).json({ success: false, error: error.message });
// //   }
// // };

// // // Get All Banners (Admin)
// // exports.getAllBanners = async (req, res) => {
// //   try {
// //     const banners = await Banner.find()
// //       .populate("categoryId", "name")
// //       .sort({ order: 1, createdAt: -1 });

// //     res.json({ success: true, data: banners });
// //   } catch (error) {
// //     console.error("Get banners error:", error);
// //     res.status(500).json({ success: false, error: error.message });
// //   }
// // };

// // // Get Banners by Category (Public)
// // exports.getBannersByCategory = async (req, res) => {
// //   try {
// //     const { categoryId } = req.params;

// //     const banners = await Banner.find({
// //       categoryId,
// //       isActive: true,
// //     })
// //       .populate("categoryId", "name")
// //       .sort({ order: 1 });

// //     res.json({ success: true, data: banners });
// //   } catch (error) {
// //     console.error("Get banners by category error:", error);
// //     res.status(500).json({ success: false, error: error.message });
// //   }
// // };

// // // Get Active Banners for Homepage
// // exports.getHomeBanners = async (req, res) => {
// //   try {
// //     const banners = await Banner.find({ isActive: true })
// //       .populate("categoryId", "name")
// //       .sort({ order: 1, createdAt: -1 })
// //       .limit(10);

// //     res.json({ success: true, data: banners });
// //   } catch (error) {
// //     console.error("Get home banners error:", error);
// //     res.status(500).json({ success: false, error: error.message });
// //   }
// // };

// // // Get Single Banner
// // exports.getBannerById = async (req, res) => {
// //   try {
// //     const banner = await Banner.findById(req.params.id).populate("categoryId", "name");

// //     if (!banner) {
// //       return res.status(404).json({ success: false, error: "Banner not found" });
// //     }

// //     res.json({ success: true, data: banner });
// //   } catch (error) {
// //     console.error("Get banner error:", error);
// //     res.status(500).json({ success: false, error: error.message });
// //   }
// // };

// // // Update Banner
// // exports.updateBanner = async (req, res) => {
// //   try {
// //     const { title, description, categoryId, link, order, isActive } = req.body;

// //     const updateData = {
// //       title,
// //       description: description || "",
// //       link: link || "",
// //       order: parseInt(order) || 0,
// //       isActive: isActive === "true" || isActive === true,
// //     };

// //     // Update category if changed
// //     if (categoryId) {
// //       const category = await Category.findById(categoryId);
// //       if (category) {
// //         updateData.categoryId = categoryId;
// //         updateData.categoryName = category.name;
// //       }
// //     }

// //     // Upload new image if provided
// //     if (req.file) {
// //       console.log("📸 Uploading new banner image...");
// //       const uploadResult = await bunnyService.uploadImage(
// //         req.file.buffer,
// //         `banner_${Date.now()}_${req.file.originalname}`,
// //         req.file.mimetype
// //       );
// //       if (uploadResult && uploadResult.url) {
// //         updateData.imageUrl = uploadResult.url;
// //       } else {
// //         // Fallback to local storage
// //         const uploadDir = path.join(__dirname, "../uploads");
// //         if (!fs.existsSync(uploadDir)) {
// //           fs.mkdirSync(uploadDir, { recursive: true });
// //         }
// //         const fileName = `banner_${Date.now()}_${req.file.originalname}`;
// //         const localPath = `/uploads/${fileName}`;
// //         fs.writeFileSync(path.join(uploadDir, fileName), req.file.buffer);
// //         updateData.imageUrl = `http://localhost:3001${localPath}`;
// //       }
// //     }

// //     const banner = await Banner.findByIdAndUpdate(req.params.id, updateData, {
// //       new: true,
// //     }).populate("categoryId", "name");

// //     if (!banner) {
// //       return res.status(404).json({ success: false, error: "Banner not found" });
// //     }

// //     console.log("✅ Banner updated successfully:", banner.title);

// //     res.json({
// //       success: true,
// //       message: "Banner updated successfully",
// //       data: banner,
// //     });
// //   } catch (error) {
// //     console.error("Update banner error:", error);
// //     res.status(500).json({ success: false, error: error.message });
// //   }
// // };

// // // Delete Banner
// // exports.deleteBanner = async (req, res) => {
// //   try {
// //     const banner = await Banner.findByIdAndDelete(req.params.id);

// //     if (!banner) {
// //       return res.status(404).json({ success: false, error: "Banner not found" });
// //     }

// //     console.log("🗑️ Banner deleted:", banner.title);

// //     res.json({ success: true, message: "Banner deleted successfully" });
// //   } catch (error) {
// //     console.error("Delete banner error:", error);
// //     res.status(500).json({ success: false, error: error.message });
// //   }
// // };

// // // Toggle Banner Status
// // exports.toggleBannerStatus = async (req, res) => {
// //   try {
// //     const banner = await Banner.findById(req.params.id);

// //     if (!banner) {
// //       return res.status(404).json({ success: false, error: "Banner not found" });
// //     }

// //     banner.isActive = !banner.isActive;
// //     await banner.save();

// //     res.json({
// //       success: true,
// //       message: `Banner ${banner.isActive ? "activated" : "deactivated"}`,
// //       data: banner,
// //     });
// //   } catch (error) {
// //     console.error("Toggle banner status error:", error);
// //     res.status(500).json({ success: false, error: error.message });
// //   }
// // };
// const Banner = require("../models/Banner");
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

// // ✅ CREATE
// exports.createBanner = async (req, res) => {
//   try {
//     console.log("BODY:", req.body);
//     console.log("FILES:", req.files);

//     const { title, categoryId } = req.body;

//     if (!title || !categoryId) {
//       return res.status(400).json({
//         success: false,
//         message: "title & categoryId required",
//       });
//     }

//     let data = {
//       title,
//       categoryId,
//     };

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

//     res.status(201).json({
//       success: true,
//       message: "Banner created successfully",
//       data: banner,
//     });
//   } catch (err) {
//     console.error("Create error:", err);
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// // ✅ GET ALL (with category + movies)
// exports.getBanners = async (req, res) => {
//   try {
//     const banners = await Banner.aggregate([
//       { $match: { publishStatus: true } },

//       {
//         $lookup: {
//           from: "categories",
//           localField: "categoryId",
//           foreignField: "_id",
//           as: "category",
//         },
//       },

//       {
//         $lookup: {
//           from: "movies",
//           let: { catId: "$categoryId" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $eq: ["$categoryId", "$$catId"],
//                 },
//               },
//             },
//             { $limit: 10 },
//           ],
//           as: "movies",
//         },
//       },

//       {
//         $project: {
//           title: 1,
//           logoImage: 1,
//           bannerImage: 1,
//           category: { $arrayElemAt: ["$category", 0] },
//           movies: 1,
//         },
//       },
//     ]);

//     res.json({
//       success: true,
//       data: banners,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ GET SINGLE
// exports.getBannerById = async (req, res) => {
//   try {
//     const banner = await Banner.findById(req.params.id).populate("categoryId");

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

// // ✅ UPDATE
// exports.updateBanner = async (req, res) => {
//   try {
//     let updateData = {};

//     if (req.body.title) updateData.title = req.body.title;
//     if (req.body.categoryId) updateData.categoryId = req.body.categoryId;

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
//     );

//     res.json({
//       success: true,
//       message: "Banner updated",
//       data: banner,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ DELETE
// exports.deleteBanner = async (req, res) => {
//   try {
//     await Banner.findByIdAndDelete(req.params.id);

//     res.json({
//       success: true,
//       message: "Banner deleted",
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// controllers/bannerController.js
const Banner = require("../models/Banner");
const Movie = require("../models/Movie");
const Category = require("../models/Category");
const bunnyService = require("../services/bunnyService");

// 🔥 upload helper
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

// ✅ CREATE BANNER
exports.createBanner = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { 
      title, 
      description,
      categoryId, 
      movieId,
      moviesList,
      bannerType,
      displayOrder,
      visibleOn
    } = req.body;

    if (!title || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Title & categoryId are required",
      });
    }

    let data = {
      title,
      description: description || "",
      categoryId,
      bannerType: bannerType || "category_movies",
      displayOrder: parseInt(displayOrder) || 0,
      visibleOn: visibleOn || "home",
      createdBy: req.user?.id,
    };

    // Handle movie selection based on banner type
    if (bannerType === "single_movie" && movieId) {
      data.movieId = movieId;
    }

    if (bannerType === "custom_list" && moviesList) {
      // Parse moviesList if it's a string (from form-data)
      const parsedMoviesList = typeof moviesList === 'string' 
        ? JSON.parse(moviesList) 
        : moviesList;
      data.moviesList = parsedMoviesList;
    }

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

    // Populate the response
    const populatedBanner = await Banner.findById(banner._id)
      .populate("categoryId", "name slug")
      .populate("movieId", "movieTitle posterImage verticalPoster")
      .populate("moviesList", "movieTitle posterImage verticalPoster releaseYear");

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: populatedBanner,
    });
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ GET ALL BANNERS (Admin)
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find()
      .populate("categoryId", "name slug")
      .populate("movieId", "movieTitle posterImage verticalPoster releaseYear")
      .populate("moviesList", "movieTitle posterImage verticalPoster releaseYear imdbRating")
      .sort({ displayOrder: 1, createdAt: -1 });

    res.json({
      success: true,
      data: banners,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ GET SINGLE BANNER
exports.getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id)
      .populate("categoryId", "name slug")
      .populate("movieId", "movieTitle posterImage verticalPoster releaseYear duration imdbRating")
      .populate("moviesList", "movieTitle posterImage verticalPoster releaseYear duration imdbRating");

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.json({ success: true, data: banner });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ UPDATE BANNER
exports.updateBanner = async (req, res) => {
  try {
    let updateData = {};

    // Basic fields
    if (req.body.title) updateData.title = req.body.title;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.categoryId) updateData.categoryId = req.body.categoryId;
    if (req.body.bannerType) updateData.bannerType = req.body.bannerType;
    if (req.body.displayOrder !== undefined) updateData.displayOrder = parseInt(req.body.displayOrder);
    if (req.body.visibleOn) updateData.visibleOn = req.body.visibleOn;
    if (req.body.publishStatus !== undefined) updateData.publishStatus = req.body.publishStatus === "true" || req.body.publishStatus === true;

    // Handle movie selection based on banner type
    if (req.body.bannerType === "single_movie" && req.body.movieId) {
      updateData.movieId = req.body.movieId;
      updateData.moviesList = [];
    } else if (req.body.bannerType === "custom_list" && req.body.moviesList) {
      const parsedMoviesList = typeof req.body.moviesList === 'string' 
        ? JSON.parse(req.body.moviesList) 
        : req.body.moviesList;
      updateData.moviesList = parsedMoviesList;
      updateData.movieId = null;
    } else if (req.body.bannerType === "category_movies") {
      updateData.movieId = null;
      updateData.moviesList = [];
    }

    // Image uploads
    if (req.files?.logoImage?.[0]) {
      const logo = await uploadImage(req.files.logoImage[0], "logo");
      if (logo) updateData.logoImage = logo;
    }

    if (req.files?.bannerImage?.[0]) {
      const banner = await uploadImage(req.files.bannerImage[0], "banner");
      if (banner) updateData.bannerImage = banner;
    }

    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
      .populate("categoryId", "name slug")
      .populate("movieId", "movieTitle posterImage verticalPoster")
      .populate("moviesList", "movieTitle posterImage verticalPoster releaseYear");

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
    console.error("Update error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ DELETE BANNER
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
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ TOGGLE PUBLISH STATUS
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
      message: `Banner ${banner.publishStatus ? "published" : "unpublished"}`,
      data: banner,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ GET MOVIES FOR DROPDOWN (API endpoint)
exports.getMoviesForDropdown = async (req, res) => {
  try {
    const { search, categoryId, limit = 50 } = req.query;
    
    let query = { publishStatus: true };
    
    // Filter by publish date
    query.publishDate = { $lte: new Date() };
    
    // Search by title
    if (search) {
      query.movieTitle = { $regex: search, $options: "i" };
    }
    
    // Filter by category
    if (categoryId) {
      query.categoryId = categoryId;
    }
    
    const movies = await Movie.find(query)
      .select("movieTitle posterImage verticalPoster releaseYear imdbRating duration")
      .sort({ movieTitle: 1 })
      .limit(parseInt(limit));
    
    // Format for dropdown
    const formattedMovies = movies.map(movie => ({
      _id: movie._id,
      title: movie.movieTitle,
      poster: movie.posterImage?.url || movie.verticalPoster?.url,
      releaseYear: movie.releaseYear,
      imdbRating: movie.imdbRating,
      duration: movie.duration,
      label: `${movie.movieTitle} (${movie.releaseYear || "N/A"})`,
      value: movie._id
    }));
    
    res.json({
      success: true,
      data: formattedMovies,
    });
  } catch (err) {
    console.error("Error fetching movies:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};