// const express = require("express");
// const router = express.Router();
// const Banner = require("../models/Banner");
// console.log("🔥 bannerPublicRoutes loaded");
// /* ===== FORMAT (optional future use) ===== */
// const formatBanner = (banner) => {
//   const obj = banner.toObject ? banner.toObject() : banner;

//   return {
//     ...obj,
//     cast: obj.cast || [],
//     crew: obj.crew || [],
//   };
// };

// /* ================= GET ALL PUBLISHED BANNERS ================= */
// router.get("/banners", async (req, res) => {
//   try {
//     const data = await Banner.find(); // ✅ NO FILTER

//     res.json({
//       success: true,
//       data,
//     });
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



const express = require("express");
const router = express.Router();
const Banner = require("../models/Banner");
console.log("🔥 bannerPublicRoutes loaded");
/* ===== FORMAT (optional future use) ===== */
// const formatBanner = (banner) => {
//   const obj = banner.toObject ? banner.toObject() : banner;

//   return {
//     ...obj,
//     cast: obj.cast || [],
//     crew: obj.crew || [],
//   };
// };
const formatBanner = (banner) => {
  const obj = banner.toObject ? banner.toObject() : banner;

  return {
    ...obj,

    // ✅ cast + crew merge
    cast: [
      ...(obj.cast || []),
      ...(obj.crew || [])
    ],

    // ❌ crew remove
    crew: undefined,
  };
};
/* ================= GET ALL PUBLISHED BANNERS ================= */
router.get("/banners", async (req, res) => {
  try {
    // const data = await Banner.find(); // ✅ NO FILTER

    // res.json({
    //   success: true,
    //   data,
    // });
    const data = await Banner.find();

res.json({
  success: true,
  data: data.map(formatBanner),
});
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


/* ================= SINGLE BANNER ================= */
router.get("/banners/:id", async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id)
  .populate("categoryId", "name");
    // const banner = await Banner.findOne({
    //   _id: req.params.id,
    //   publishStatus: true,
    //   publishDate: { $lte: new Date() },
    //   isActive: true,
    // })
    // .populate("categoryId", "name");

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.json({
      success: true,
      data: formatBanner(banner),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


/* ================= HOME BANNERS ================= */
// router.get("/home-banners", async (req, res) => {
//   try {
//     // const banners = await Banner.find({
//     //   publishStatus: true,
//     //   publishDate: { $lte: new Date() },
//     //   isActive: true,
//     //   visibleOn: "home",
//     // })
    
     
//       .sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       data: banners.map(formatBanner),
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });
router.get("/home-banners", async (req, res) => {
  try {
    const banners = await Banner.find({ visibleOn: "home" })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: banners.map(formatBanner),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
