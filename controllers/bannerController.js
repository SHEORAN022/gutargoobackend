




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
  // if (urlFromBody && urlFromBody.startsWith("http")) {
  //   return { url: urlFromBody, public_id: "" };
  // }
  // return { url: "", public_id: "" };
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

    // const banner = await Banner.findById(id);
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
    const { id } = req.params;

    const banner = await Banner.findByIdAndDelete(id);
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
};
exports.getMoviesForDropdown = async (req, res) => {
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
