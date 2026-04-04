// const express = require("express");
// const router = express.Router();
// const Banner = require("../models/Banner");
// console.log("🔥 bannerPublicRoutes loaded");
// /* ===== FORMAT (optional future use) ===== */
// // const formatBanner = (banner) => {
// //   const obj = banner.toObject ? banner.toObject() : banner;

// //   return {
// //     ...obj,
// //     cast: obj.cast || [],
// //     crew: obj.crew || [],
// //   };
// // };
// const formatBanner = (banner) => {
//   const obj = banner.toObject ? banner.toObject() : banner;

//   return {
//     ...obj,

//     // ✅ cast + crew merge
//     cast: [
//       ...(obj.cast || []),
//       ...(obj.crew || [])
//     ],

//     // ❌ crew remove
//     crew: undefined,
//   };
// };
// /* ================= GET ALL PUBLISHED BANNERS ================= */
// router.get("/banners", async (req, res) => {
//   try {
//     // const data = await Banner.find(); // ✅ NO FILTER

//     // res.json({
//     //   success: true,
//     //   data,
//     // });
//     const data = await Banner.find();

// res.json({
//   success: true,
//   data: data.map(formatBanner),
// });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });


// /* ================= SINGLE BANNER ================= */
// router.get("/banners/:id", async (req, res) => {
//   try {
//     const banner = await Banner.findById(req.params.id)
//   .populate("categoryId", "name");
//     // const banner = await Banner.findOne({
//     //   _id: req.params.id,
//     //   publishStatus: true,
//     //   publishDate: { $lte: new Date() },
//     //   isActive: true,
//     // })
//     // .populate("categoryId", "name");

//     if (!banner) {
//       return res.status(404).json({
//         success: false,
//         message: "Banner not found",
//       });
//     }

//     res.json({
//       success: true,
//       data: formatBanner(banner),
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });


// /* ================= HOME BANNERS ================= */
// // router.get("/home-banners", async (req, res) => {
// //   try {
// //     // const banners = await Banner.find({
// //     //   publishStatus: true,
// //     //   publishDate: { $lte: new Date() },
// //     //   isActive: true,
// //     //   visibleOn: "home",
// //     // })
    
     
// //       .sort({ createdAt: -1 });

// //     res.json({
// //       success: true,
// //       data: banners.map(formatBanner),
// //     });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // });
// router.get("/home-banners", async (req, res) => {
//   try {
//     const banners = await Banner.find({ visibleOn: "home" })
//       .sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       data: banners.map(formatBanner),
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// module.exports = router;
// routes/bannerPublicRoutes.js
const express = require("express");
const router = express.Router();
const Banner = require("../models/Banner");

const formatBannerForPublic = (banner) => {
  const obj = banner.toObject ? banner.toObject() : banner;
  
  // Format movies based on banner type
  let movies = [];
  
  if (obj.bannerType === "single_movie" && obj.movieId) {
    movies = [obj.movieId];
  } else if (obj.bannerType === "custom_list" && obj.moviesList?.length) {
    movies = obj.moviesList;
  } else if (obj.bannerType === "category_movies" && obj.categoryMovies?.length) {
    movies = obj.categoryMovies;
  }
  
  return {
    _id: obj._id,
    title: obj.title,
    description: obj.description,
    logoImage: obj.logoImage,
    bannerImage: obj.bannerImage,
    bannerType: obj.bannerType,
    visibleOn: obj.visibleOn,
    displayOrder: obj.displayOrder,
    category: obj.categoryId,
    movies: movies,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
  };
};

/* ================= GET ALL PUBLISHED BANNERS ================= */
router.get("/banners", async (req, res) => {
  try {
    const { visibleOn } = req.query;
    
    let query = { 
      publishStatus: true 
    };
    
    if (visibleOn && visibleOn !== "all") {
      query.visibleOn = { $in: [visibleOn, "all"] };
    }
    
    const banners = await Banner.find(query)
      .populate("categoryId", "name slug")
      .populate("movieId", "movieTitle posterImage verticalPoster releaseYear duration imdbRating description")
      .populate("moviesList", "movieTitle posterImage verticalPoster releaseYear duration imdbRating description")
      .sort({ displayOrder: 1, createdAt: -1 });
    
    // For category_movies type, fetch category movies
    const enrichedBanners = await Promise.all(banners.map(async (banner) => {
      const bannerObj = banner.toObject();
      
      if (bannerObj.bannerType === "category_movies" && bannerObj.categoryId) {
        const Movie = require("../models/Movie");
        const categoryMovies = await Movie.find({
          categoryId: bannerObj.categoryId._id,
          publishStatus: true,
          publishDate: { $lte: new Date() }
        })
        .select("movieTitle posterImage verticalPoster releaseYear duration imdbRating description")
        .limit(20)
        .sort({ releaseYear: -1 });
        
        bannerObj.categoryMovies = categoryMovies;
      }
      
      return bannerObj;
    }));
    
    res.json({
      success: true,
      data: enrichedBanners.map(formatBannerForPublic),
    });
  } catch (err) {
    console.error("Error fetching banners:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* ================= SINGLE BANNER ================= */
router.get("/banners/:id", async (req, res) => {
  try {
    const banner = await Banner.findOne({
      _id: req.params.id,
      publishStatus: true,
    })
      .populate("categoryId", "name slug")
      .populate("movieId", "movieTitle posterImage verticalPoster releaseYear duration imdbRating description")
      .populate("moviesList", "movieTitle posterImage verticalPoster releaseYear duration imdbRating description");
    
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }
    
    const bannerObj = banner.toObject();
    
    if (bannerObj.bannerType === "category_movies" && bannerObj.categoryId) {
      const Movie = require("../models/Movie");
      const categoryMovies = await Movie.find({
        categoryId: bannerObj.categoryId._id,
        publishStatus: true,
        publishDate: { $lte: new Date() }
      })
      .select("movieTitle posterImage verticalPoster releaseYear duration imdbRating description")
      .limit(20)
      .sort({ releaseYear: -1 });
      
      bannerObj.categoryMovies = categoryMovies;
    }
    
    res.json({
      success: true,
      data: formatBannerForPublic(bannerObj),
    });
  } catch (err) {
    console.error("Error fetching banner:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ================= HOME BANNERS ================= */
router.get("/home-banners", async (req, res) => {
  try {
    const banners = await Banner.find({ 
      publishStatus: true,
      visibleOn: { $in: ["home", "all"] }
    })
      .populate("categoryId", "name slug")
      .populate("movieId", "movieTitle posterImage verticalPoster releaseYear duration imdbRating description")
      .populate("moviesList", "movieTitle posterImage verticalPoster releaseYear duration imdbRating description")
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(10);
    
    // Enrich category_movies banners
    const enrichedBanners = await Promise.all(banners.map(async (banner) => {
      const bannerObj = banner.toObject();
      
      if (bannerObj.bannerType === "category_movies" && bannerObj.categoryId) {
        const Movie = require("../models/Movie");
        const categoryMovies = await Movie.find({
          categoryId: bannerObj.categoryId._id,
          publishStatus: true,
          publishDate: { $lte: new Date() }
        })
        .select("movieTitle posterImage verticalPoster releaseYear duration imdbRating description")
        .limit(20)
        .sort({ releaseYear: -1 });
        
        bannerObj.categoryMovies = categoryMovies;
      }
      
      return bannerObj;
    }));
    
    res.json({
      success: true,
      data: enrichedBanners.map(formatBannerForPublic),
    });
  } catch (err) {
    console.error("Error fetching home banners:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;