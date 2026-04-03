// const Banner = require("../models/Banner");
// const Category = require("../models/Category");
// const bunnyService = require("../services/bunnyService");
// const fs = require("fs");
// const path = require("path");

// // Create Banner
// exports.createBanner = async (req, res) => {
//   try {
//     console.log("\n========================================");
//     console.log("🎨 CREATING BANNER");
//     console.log("========================================");

//     const { title, description, categoryId, link, order, isActive } = req.body;

//     // Validate category
//     const category = await Category.findById(categoryId);
//     if (!category) {
//       return res.status(404).json({ success: false, error: "Category not found" });
//     }

//     // Validate title
//     if (!title) {
//       return res.status(400).json({ success: false, error: "Title is required" });
//     }

//     let imageUrl = "";

//     // Upload banner image to Bunny CDN
//     if (req.file) {
//       console.log("📸 Uploading banner image...");
//       const uploadResult = await bunnyService.uploadImage(
//         req.file.buffer,
//         `banner_${Date.now()}_${req.file.originalname}`,
//         req.file.mimetype
//       );
//       if (uploadResult && uploadResult.url) {
//         imageUrl = uploadResult.url;
//         console.log("✅ Image uploaded:", imageUrl);
//       } else {
//         // Fallback to local storage
//         const uploadDir = path.join(__dirname, "../uploads");
//         if (!fs.existsSync(uploadDir)) {
//           fs.mkdirSync(uploadDir, { recursive: true });
//         }
//         const fileName = `banner_${Date.now()}_${req.file.originalname}`;
//         const localPath = `/uploads/${fileName}`;
//         fs.writeFileSync(path.join(uploadDir, fileName), req.file.buffer);
//         imageUrl = `http://localhost:3001${localPath}`;
//         console.log("✅ Image saved locally:", imageUrl);
//       }
//     } else {
//       return res.status(400).json({ success: false, error: "Banner image is required" });
//     }

//     const bannerData = {
//       title,
//       description: description || "",
//       imageUrl,
//       categoryId,
//       categoryName: category.name,
//       link: link || "",
//       order: parseInt(order) || 0,
//       isActive: isActive === "true" || isActive === true,
//       createdBy: req.user?.id,
//     };

//     const banner = await Banner.create(bannerData);

//     console.log("✅ Banner created successfully!");
//     console.log("   Title:", banner.title);
//     console.log("   Category:", banner.categoryName);
//     console.log("   Image:", banner.imageUrl);

//     res.status(201).json({
//       success: true,
//       message: "Banner created successfully",
//       data: banner,
//     });
//   } catch (error) {
//     console.error("❌ Create banner error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Get All Banners (Admin)
// exports.getAllBanners = async (req, res) => {
//   try {
//     const banners = await Banner.find()
//       .populate("categoryId", "name")
//       .sort({ order: 1, createdAt: -1 });

//     res.json({ success: true, data: banners });
//   } catch (error) {
//     console.error("Get banners error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Get Banners by Category (Public)
// exports.getBannersByCategory = async (req, res) => {
//   try {
//     const { categoryId } = req.params;

//     const banners = await Banner.find({
//       categoryId,
//       isActive: true,
//     })
//       .populate("categoryId", "name")
//       .sort({ order: 1 });

//     res.json({ success: true, data: banners });
//   } catch (error) {
//     console.error("Get banners by category error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Get Active Banners for Homepage
// exports.getHomeBanners = async (req, res) => {
//   try {
//     const banners = await Banner.find({ isActive: true })
//       .populate("categoryId", "name")
//       .sort({ order: 1, createdAt: -1 })
//       .limit(10);

//     res.json({ success: true, data: banners });
//   } catch (error) {
//     console.error("Get home banners error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Get Single Banner
// exports.getBannerById = async (req, res) => {
//   try {
//     const banner = await Banner.findById(req.params.id).populate("categoryId", "name");

//     if (!banner) {
//       return res.status(404).json({ success: false, error: "Banner not found" });
//     }

//     res.json({ success: true, data: banner });
//   } catch (error) {
//     console.error("Get banner error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Update Banner
// exports.updateBanner = async (req, res) => {
//   try {
//     const { title, description, categoryId, link, order, isActive } = req.body;

//     const updateData = {
//       title,
//       description: description || "",
//       link: link || "",
//       order: parseInt(order) || 0,
//       isActive: isActive === "true" || isActive === true,
//     };

//     // Update category if changed
//     if (categoryId) {
//       const category = await Category.findById(categoryId);
//       if (category) {
//         updateData.categoryId = categoryId;
//         updateData.categoryName = category.name;
//       }
//     }

//     // Upload new image if provided
//     if (req.file) {
//       console.log("📸 Uploading new banner image...");
//       const uploadResult = await bunnyService.uploadImage(
//         req.file.buffer,
//         `banner_${Date.now()}_${req.file.originalname}`,
//         req.file.mimetype
//       );
//       if (uploadResult && uploadResult.url) {
//         updateData.imageUrl = uploadResult.url;
//       } else {
//         // Fallback to local storage
//         const uploadDir = path.join(__dirname, "../uploads");
//         if (!fs.existsSync(uploadDir)) {
//           fs.mkdirSync(uploadDir, { recursive: true });
//         }
//         const fileName = `banner_${Date.now()}_${req.file.originalname}`;
//         const localPath = `/uploads/${fileName}`;
//         fs.writeFileSync(path.join(uploadDir, fileName), req.file.buffer);
//         updateData.imageUrl = `http://localhost:3001${localPath}`;
//       }
//     }

//     const banner = await Banner.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//     }).populate("categoryId", "name");

//     if (!banner) {
//       return res.status(404).json({ success: false, error: "Banner not found" });
//     }

//     console.log("✅ Banner updated successfully:", banner.title);

//     res.json({
//       success: true,
//       message: "Banner updated successfully",
//       data: banner,
//     });
//   } catch (error) {
//     console.error("Update banner error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Delete Banner
// exports.deleteBanner = async (req, res) => {
//   try {
//     const banner = await Banner.findByIdAndDelete(req.params.id);

//     if (!banner) {
//       return res.status(404).json({ success: false, error: "Banner not found" });
//     }

//     console.log("🗑️ Banner deleted:", banner.title);

//     res.json({ success: true, message: "Banner deleted successfully" });
//   } catch (error) {
//     console.error("Delete banner error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Toggle Banner Status
// exports.toggleBannerStatus = async (req, res) => {
//   try {
//     const banner = await Banner.findById(req.params.id);

//     if (!banner) {
//       return res.status(404).json({ success: false, error: "Banner not found" });
//     }

//     banner.isActive = !banner.isActive;
//     await banner.save();

//     res.json({
//       success: true,
//       message: `Banner ${banner.isActive ? "activated" : "deactivated"}`,
//       data: banner,
//     });
//   } catch (error) {
//     console.error("Toggle banner status error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };




// const Banner = require("../models/Banner");
// const Category = require("../models/Category");
// const bunnyService = require("../services/bunnyService");
// const fs = require("fs");
// const path = require("path");

// // Create Banner
// exports.createBanner = async (req, res) => {
//   try {
//     console.log("\n========================================");
//     console.log("🎨 CREATING BANNER");
//     console.log("========================================");

//     const { title, description, categoryId, link, order, isActive } = req.body;

//     // Validate category
//     const category = await Category.findById(categoryId);
//     if (!category) {
//       return res.status(404).json({ success: false, error: "Category not found" });
//     }

//     // Validate title
//     if (!title) {
//       return res.status(400).json({ success: false, error: "Title is required" });
//     }

//     let imageUrl = "";

//     // Upload banner image to Bunny CDN
//     if (req.file) {
//       console.log("📸 Uploading banner image...");
//       const uploadResult = await bunnyService.uploadImage(
//         req.file.buffer,
//         `banner_${Date.now()}_${req.file.originalname}`,
//         req.file.mimetype
//       );
//       if (uploadResult && uploadResult.url) {
//         imageUrl = uploadResult.url;
//         console.log("✅ Image uploaded:", imageUrl);
//       } else {
//         // Fallback to local storage
//         const uploadDir = path.join(__dirname, "../uploads");
//         if (!fs.existsSync(uploadDir)) {
//           fs.mkdirSync(uploadDir, { recursive: true });
//         }
//         const fileName = `banner_${Date.now()}_${req.file.originalname}`;
//         const localPath = `/uploads/${fileName}`;
//         fs.writeFileSync(path.join(uploadDir, fileName), req.file.buffer);
//         imageUrl = `http://localhost:3001${localPath}`;
//         console.log("✅ Image saved locally:", imageUrl);
//       }
//     } else {
//       return res.status(400).json({ success: false, error: "Banner image is required" });
//     }

//     const bannerData = {
//       title,
//       description: description || "",
//       imageUrl,
//       categoryId,
//       categoryName: category.name,
//       link: link || "",
//       order: parseInt(order) || 0,
//       isActive: isActive === "true" || isActive === true,
//       createdBy: req.user?.id,
//     };

//     const banner = await Banner.create(bannerData);

//     console.log("✅ Banner created successfully!");
//     console.log("   Title:", banner.title);
//     console.log("   Category:", banner.categoryName);
//     console.log("   Image:", banner.imageUrl);

//     res.status(201).json({
//       success: true,
//       message: "Banner created successfully",
//       data: banner,
//     });
//   } catch (error) {
//     console.error("❌ Create banner error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Get All Banners (Admin)
// exports.getAllBanners = async (req, res) => {
//   try {
//     const banners = await Banner.find()
//       .populate("categoryId", "name")
//       .sort({ order: 1, createdAt: -1 });

//     res.json({ success: true, data: banners });
//   } catch (error) {
//     console.error("Get banners error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Get Banners by Category (Public)
// exports.getBannersByCategory = async (req, res) => {
//   try {
//     const { categoryId } = req.params;

//     const banners = await Banner.find({
//       categoryId,
//       isActive: true,
//     })
//       .populate("categoryId", "name")
//       .sort({ order: 1 });

//     res.json({ success: true, data: banners });
//   } catch (error) {
//     console.error("Get banners by category error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Get Active Banners for Homepage
// exports.getHomeBanners = async (req, res) => {
//   try {
//     const banners = await Banner.find({ isActive: true })
//       .populate("categoryId", "name")
//       .sort({ order: 1, createdAt: -1 })
//       .limit(10);

//     res.json({ success: true, data: banners });
//   } catch (error) {
//     console.error("Get home banners error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Get Single Banner
// exports.getBannerById = async (req, res) => {
//   try {
//     const banner = await Banner.findById(req.params.id).populate("categoryId", "name");

//     if (!banner) {
//       return res.status(404).json({ success: false, error: "Banner not found" });
//     }

//     res.json({ success: true, data: banner });
//   } catch (error) {
//     console.error("Get banner error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Update Banner
// exports.updateBanner = async (req, res) => {
//   try {
//     const { title, description, categoryId, link, order, isActive } = req.body;

//     const updateData = {
//       title,
//       description: description || "",
//       link: link || "",
//       order: parseInt(order) || 0,
//       isActive: isActive === "true" || isActive === true,
//     };

//     // Update category if changed
//     if (categoryId) {
//       const category = await Category.findById(categoryId);
//       if (category) {
//         updateData.categoryId = categoryId;
//         updateData.categoryName = category.name;
//       }
//     }

//     // Upload new image if provided
//     if (req.file) {
//       console.log("📸 Uploading new banner image...");
//       const uploadResult = await bunnyService.uploadImage(
//         req.file.buffer,
//         `banner_${Date.now()}_${req.file.originalname}`,
//         req.file.mimetype
//       );
//       if (uploadResult && uploadResult.url) {
//         updateData.imageUrl = uploadResult.url;
//       } else {
//         // Fallback to local storage
//         const uploadDir = path.join(__dirname, "../uploads");
//         if (!fs.existsSync(uploadDir)) {
//           fs.mkdirSync(uploadDir, { recursive: true });
//         }
//         const fileName = `banner_${Date.now()}_${req.file.originalname}`;
//         const localPath = `/uploads/${fileName}`;
//         fs.writeFileSync(path.join(uploadDir, fileName), req.file.buffer);
//         updateData.imageUrl = `http://localhost:3001${localPath}`;
//       }
//     }

//     const banner = await Banner.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//     }).populate("categoryId", "name");

//     if (!banner) {
//       return res.status(404).json({ success: false, error: "Banner not found" });
//     }

//     console.log("✅ Banner updated successfully:", banner.title);

//     res.json({
//       success: true,
//       message: "Banner updated successfully",
//       data: banner,
//     });
//   } catch (error) {
//     console.error("Update banner error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Delete Banner
// exports.deleteBanner = async (req, res) => {
//   try {
//     const banner = await Banner.findByIdAndDelete(req.params.id);

//     if (!banner) {
//       return res.status(404).json({ success: false, error: "Banner not found" });
//     }

//     console.log("🗑️ Banner deleted:", banner.title);

//     res.json({ success: true, message: "Banner deleted successfully" });
//   } catch (error) {
//     console.error("Delete banner error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Toggle Banner Status
// exports.toggleBannerStatus = async (req, res) => {
//   try {
//     const banner = await Banner.findById(req.params.id);

//     if (!banner) {
//       return res.status(404).json({ success: false, error: "Banner not found" });
//     }

//     banner.isActive = !banner.isActive;
//     await banner.save();

//     res.json({
//       success: true,
//       message: `Banner ${banner.isActive ? "activated" : "deactivated"}`,
//       data: banner,
//     });
//   } catch (error) {
//     console.error("Toggle banner status error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };




const Banner = require("../models/Banner");
const Category = require("../models/Category");
const bunnyService = require("../services/bunnyService");
const parseField = (field) => {
  if (!field) return [];

  if (Array.isArray(field)) return field;

  try {
    return JSON.parse(field);
  } catch (err) {
    return [];
  }
};
/* ================= CREATE ================= */
exports.createBanner = async (req, res) => {
  try {
    // const {
    //   title,
    //   description,
    //   categoryId,
    //   cast,
    //   crew,
    //   ageLimit,
    //   visibleOn,
    //   isActive,
    // } = req.body;
    const {
  title,
  description,
  categoryId,
  cast,
  crew,
  ageLimit,
  visibleOn,
  isActive,
  movieUrl,
  trailerUrl,
  genres,
  imdbRating
} = req.body;

    if (!title || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Title and Category required",
      });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    let mobileImage = "";
    let logoImage = "";

    /* IMAGE UPLOAD */
    if (req.files?.mobileImage) {
      const file = req.files.mobileImage[0];
      const upload = await bunnyService.uploadImage(
        file.buffer,
        `banner/mobile_${Date.now()}_${file.originalname}`,
        file.mimetype
      );
      mobileImage = upload?.url || "";
    }

    if (req.files?.logoImage) {
      const file = req.files.logoImage[0];
      const upload = await bunnyService.uploadImage(
        file.buffer,
        `banner/logo_${Date.now()}_${file.originalname}`,
        file.mimetype
      );
      logoImage = upload?.url || "";
    }
    const banner = await Banner.create({
  title,
  description,
  categoryId,
  cast: parseField(cast),
  crew: parseField(crew),
  ageLimit,
  visibleOn: visibleOn ? JSON.parse(visibleOn) : ["home"],
  isActive: isActive !== undefined ? isActive : true,
  mobileImage,
  logoImage,

  // ✅ NEW FIELDS
  movieUrl,
  trailerUrl,
  // genres: genres ? JSON.parse(genres) : [],
  genres: Array.isArray(genres)
  ? genres
  : typeof genres === "string"
    ? genres.split(",")
    : [],
  imdbRating,

  createdBy: req.user?.id,
});
    

//     const banner = await Banner.create({
//       title,
//       description,
//       categoryId,
//       cast: parseField(cast),
// crew: parseField(crew),
//       // cast: cast ? JSON.parse(cast) : [],
//       // crew: crew ? JSON.parse(crew) : [],
//       ageLimit,
//       visibleOn: visibleOn ? JSON.parse(visibleOn) : ["home"],
//       isActive: isActive !== undefined ? isActive : true,
//       mobileImage,
//       logoImage,
//       createdBy: req.user?.id,
//     });
    const bannerData = banner.toObject();

// ✅ cast + crew merge into cast
bannerData.cast = [
  ...(banner.cast || []),
  ...(banner.crew || [])
];

// ❌ crew hata de
delete bannerData.crew;

res.status(201).json({
  success: true,
  message: "Banner created",
  data: bannerData,
});

    // res.status(201).json({
    //   success: true,
    //   message: "Banner created",
    //   data: banner,
    // });
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


/* ================= GET ALL ================= */
exports.getAllBanners = async (req, res) => {
  try {
    const data = await Banner.find()
      .populate("categoryId", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


/* ================= HOME ================= */
exports.getHomeBanners = async (req, res) => {
  try {
    const data = await Banner.find({
      isActive: true,
      visibleOn: "home",
    })
      .populate("categoryId", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


/* ================= CATEGORY ================= */
exports.getBannersByCategory = async (req, res) => {
  try {
    const data = await Banner.find({
      categoryId: req.params.categoryId,
      isActive: true,
    })
      .populate("categoryId", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


/* ================= SINGLE ================= */
exports.getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id).populate(
      "categoryId",
      "name"
    );

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


/* ================= UPDATE ================= */
exports.updateBanner = async (req, res) => {
  try {
    const {
      title,
      description,
      categoryId,
      cast,
      crew,
      ageLimit,
      visibleOn,
      isActive,
    } = req.body;

    const updateData = {
      title,
      description,
      categoryId,
      ageLimit,
      isActive,
    };
if (movieUrl) updateData.movieUrl = movieUrl;
if (trailerUrl) updateData.trailerUrl = trailerUrl;
if (genres) updateData.genres = JSON.parse(genres);
if (imdbRating) updateData.imdbRating = imdbRating;
    if (cast) updateData.cast = JSON.parse(cast);
    if (crew) updateData.crew = JSON.parse(crew);
    if (visibleOn) updateData.visibleOn = JSON.parse(visibleOn);

    /* IMAGE UPDATE */
    if (req.files?.mobileImage) {
      const file = req.files.mobileImage[0];
      const upload = await bunnyService.uploadImage(
        file.buffer,
        `banner/mobile_${Date.now()}_${file.originalname}`,
        file.mimetype
      );
      updateData.mobileImage = upload?.url;
    }

    if (req.files?.logoImage) {
      const file = req.files.logoImage[0];
      const upload = await bunnyService.uploadImage(
        file.buffer,
        `banner/logo_${Date.now()}_${file.originalname}`,
        file.mimetype
      );
      updateData.logoImage = upload?.url;
    }

    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate("categoryId", "name");

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.json({
      success: true,
      message: "Banner updated",
      data: banner,
    });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


/* ================= DELETE ================= */
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.json({ success: true, message: "Banner deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


/* ================= TOGGLE ================= */
exports.toggleBannerStatus = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    banner.isActive = !banner.isActive;
    await banner.save();

    res.json({
      success: true,
      message: `Banner ${banner.isActive ? "activated" : "deactivated"}`,
      data: banner,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
