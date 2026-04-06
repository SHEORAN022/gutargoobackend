

// const Banner = require("../models/Banner");


// // ─── Bunny CDN Config ─────────────────────────────────────────────────────
// const BUNNY_STORAGE_ZONE = process.env.BUNNY_STORAGE_ZONE; // gutargoo
// const BUNNY_STORAGE_PASSWORD = process.env.BUNNY_STORAGE_PASSWORD;
// const BUNNY_CDN_HOSTNAME = process.env.BUNNY_CDN_HOSTNAME; // vz-fd5fa6c8-ece.b-cdn.net
// const BUNNY_STORAGE_BASE_URL = `https://storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}`;

// // ─── Helper: Bunny CDN pe image upload karo ──────────────────────────────
// const uploadToBunny = async (fileBuffer, fileName, folder = "banners") => {
//   const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${fileName}`;
//   const filePath = `${folder}/${uniqueName}`;

//   const response = await fetch(`${BUNNY_STORAGE_BASE_URL}/${filePath}`, {
//     method: "PUT",
//     headers: {
//       AccessKey: BUNNY_STORAGE_PASSWORD,
//       "Content-Type": "application/octet-stream",
//     },
//     body: fileBuffer,
//   });

//   if (!response.ok) {
//     const errText = await response.text();
//     throw new Error(`Bunny CDN upload failed: ${errText}`);
//   }

//   const publicUrl = `https://${BUNNY_CDN_HOSTNAME}/${filePath}`;
//   return { url: publicUrl, public_id: filePath };
// };

// // ─── Helper: Bunny CDN se image delete karo ──────────────────────────────
// const deleteFromBunny = async (filePath) => {
//   if (!filePath) return;
//   try {
//     await fetch(`${BUNNY_STORAGE_BASE_URL}/${filePath}`, {
//       method: "DELETE",
//       headers: { AccessKey: BUNNY_STORAGE_PASSWORD },
//     });
//   } catch (err) {
//     console.log("Bunny delete error:", err.message);
//   }
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // GET /api/public/banner/banners
// // ─────────────────────────────────────────────────────────────────────────────
// const getAllBanners = async (req, res) => {
//   try {
//     const banners = await Banner.find({ isActive: true })
//       .populate("categoryId", "name")
//       .populate("movieId", "movieTitle")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       data: banners,
//       count: banners.length,
//     });
//   } catch (error) {
//     console.error("getAllBanners error:", error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // POST /api/banner  →  nayi banner add karo
// // ─────────────────────────────────────────────────────────────────────────────
// const addBanner = async (req, res) => {
//   console.log("FILES:", req.files);      // ← yeh add kar
//   console.log("BODY:", req.body);
//   try {
//     const { title, categoryId, movies, webseries } = req.body;

//     if (!title || !categoryId) {
//       return res.status(400).json({
//         success: false,
//         message: "Title and Category are required",
//       });
//     }

//     // bannerImage upload
//     let bannerImage = { url: "", public_id: "" };
//     if (req.files?.bannerImage?.[0]) {
//       const file = req.files.bannerImage[0];
//       bannerImage = await uploadToBunny(
//         file.buffer,
//         file.originalname,
//         "banners/banner"
//       );
//     }

//     // logoImage upload (mobile image)
//     let logoImage = { url: "", public_id: "" };
//     if (req.files?.logoImage?.[0]) {
//       const file = req.files.logoImage[0];
//       logoImage = await uploadToBunny(
//         file.buffer,
//         file.originalname,
//         "banners/logo"
//       );
//     }

//     const movieId = movies || webseries || null;

//     const banner = await Banner.create({
//       title,
//       categoryId,
//       movieId,
//       bannerImage,
//       logoImage,
//     });

//     const populated = await banner.populate([
//       { path: "categoryId", select: "name" },
//       { path: "movieId", select: "movieTitle" },
//     ]);

//     return res.status(201).json({
//       success: true,
//       message: "Banner added successfully",
//       data: populated,
//     });
//   } catch (error) {
//     console.error("addBanner error:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // PUT /api/banner/:id  →  banner edit karo
// // ─────────────────────────────────────────────────────────────────────────────
// const editBanner = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       title,
//       categoryId,
//       movies,
//       webseries,
//       existing_bannerImage,
//       existing_logoImage,
//     } = req.body;

//     const banner = await Banner.findById(id);
//     if (!banner) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Banner not found" });
//     }

//     if (!title || !categoryId) {
//       return res.status(400).json({
//         success: false,
//         message: "Title and Category are required",
//       });
//     }

//     // bannerImage — naya file aaya toh purana delete karke naya upload
//     let bannerImage = banner.bannerImage;
//     if (req.files?.bannerImage?.[0]) {
//       await deleteFromBunny(banner.bannerImage?.public_id);
//       const file = req.files.bannerImage[0];
//       bannerImage = await uploadToBunny(
//         file.buffer,
//         file.originalname,
//         "banners/banner"
//       );
//     }
//     // existing_bannerImage aaya matlab frontend ne purani URL bheji - kuch mat karo
//     // agar dono nahi aaye toh existing hi rehne do (already set hai upar)

//     // logoImage — same logic
//     let logoImage = banner.logoImage;
//     if (req.files?.logoImage?.[0]) {
//       await deleteFromBunny(banner.logoImage?.public_id);
//       const file = req.files.logoImage[0];
//       logoImage = await uploadToBunny(
//         file.buffer,
//         file.originalname,
//         "banners/logo"
//       );
//     }

//     const movieId = movies || webseries || banner.movieId;

//     const updated = await Banner.findByIdAndUpdate(
//       id,
//       { title, categoryId, movieId, bannerImage, logoImage },
//       { new: true, runValidators: true }
//     )
//       .populate("categoryId", "name")
//       .populate("movieId", "movieTitle");

//     return res.status(200).json({
//       success: true,
//       message: "Banner updated successfully",
//       data: updated,
//     });
//   } catch (error) {
//     console.error("editBanner error:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // DELETE /api/banner/:id
// // ─────────────────────────────────────────────────────────────────────────────
// const deleteBanner = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const banner = await Banner.findById(id);
//     if (!banner) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Banner not found" });
//     }

//     // Bunny CDN se dono images delete karo
//     await deleteFromBunny(banner.bannerImage?.public_id);
//     await deleteFromBunny(banner.logoImage?.public_id);

//     await Banner.findByIdAndDelete(id);

//     return res.status(200).json({
//       success: true,
//       message: "Banner deleted successfully",
//     });
//   } catch (error) {
//     console.error("deleteBanner error:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = { getAllBanners, addBanner, editBanner, deleteBanner };





const Banner = require("../models/Banner");

const BUNNY_STORAGE_ZONE = process.env.BUNNY_STORAGE_ZONE;
const BUNNY_STORAGE_PASSWORD = process.env.BUNNY_STORAGE_PASSWORD;
const BUNNY_CDN_HOSTNAME = process.env.BUNNY_CDN_HOSTNAME;
const BUNNY_STORAGE_BASE_URL = `https://storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}`;

// ─── Bunny CDN pe file upload ─────────────────────────────────────────────
const uploadToBunny = async (fileBuffer, fileName, folder = "banners") => {
  const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${fileName}`;
  const filePath = `${folder}/${uniqueName}`;

  const response = await fetch(`${BUNNY_STORAGE_BASE_URL}/${filePath}`, {
    method: "PUT",
    headers: {
      AccessKey: BUNNY_STORAGE_PASSWORD,
      "Content-Type": "application/octet-stream",
    },
    body: fileBuffer,
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Bunny CDN upload failed: ${errText}`);
  }

  return {
    url: `https://${BUNNY_CDN_HOSTNAME}/${filePath}`,
    public_id: filePath,
  };
};

// ─── Bunny CDN se file delete ─────────────────────────────────────────────
const deleteFromBunny = async (filePath) => {
  if (!filePath) return;
  try {
    await fetch(`${BUNNY_STORAGE_BASE_URL}/${filePath}`, {
      method: "DELETE",
      headers: { AccessKey: BUNNY_STORAGE_PASSWORD },
    });
  } catch (err) {
    console.log("Bunny delete error:", err.message);
  }
};

// ─── Helper: File aaya → Bunny upload, URL aaya → seedha use ──────────────
const resolveImage = async (file, urlFromBody, folder) => {
  if (file) {
    return await uploadToBunny(file.buffer, file.originalname, folder);
  }
  if (urlFromBody && urlFromBody.startsWith("http")) {
    return { url: urlFromBody, public_id: "" };
  }
  return { url: "", public_id: "" };
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/public/banner/banners
// ─────────────────────────────────────────────────────────────────────────────
const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true })
      .populate("categoryId", "name")
      .populate("movieId", "movieTitle")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: banners,
      count: banners.length,
    });
  } catch (error) {
    console.error("getAllBanners error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/banner
// ─────────────────────────────────────────────────────────────────────────────
const addBanner = async (req, res) => {
  try {
    console.log("FILES:", req.files);
    console.log("BODY:", req.body);

    const { title, categoryId, movieId, webseries } = req.body;

    if (!title || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Title and Category are required",
      });
    }

    // File aaya ya URL aaya - dono handle
    const bannerImage = await resolveImage(
      req.files?.bannerImage?.[0],
      req.body.bannerImage,
      "banners/banner"
    );

    const logoImage = await resolveImage(
      req.files?.logoImage?.[0],
      req.body.logoImage,
      "banners/logo"
    );

    // let movieId =movieId || webseries || null;


    const banner = await Banner.create({
      title,
      categoryId,
      movieId,
      bannerImage,
      logoImage,
    });

    const populated = await banner.populate([
      { path: "categoryId", select: "name" },
      { path: "movieId", select: "movieTitle" },
    ]);

    return res.status(201).json({
      success: true,
      message: "Banner added successfully",
      data: populated,
    });
  } catch (error) {
    console.error("addBanner error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/banner/:id
// ─────────────────────────────────────────────────────────────────────────────
const editBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, categoryId, movies, webseries } = req.body;

    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    if (!title || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Title and Category are required",
      });
    }

    // bannerImage: naya file → purana delete + naya upload
    //              URL string → seedha use
    //              kuch nahi → existing rakho
    let bannerImage = banner.bannerImage;
    if (req.files?.bannerImage?.[0]) {
      await deleteFromBunny(banner.bannerImage?.public_id);
      bannerImage = await uploadToBunny(
        req.files.bannerImage[0].buffer,
        req.files.bannerImage[0].originalname,
        "banners/banner"
      );
    } else if (req.body.bannerImage && req.body.bannerImage.startsWith("http")) {
      bannerImage = {
        url: req.body.bannerImage,
        public_id: banner.bannerImage?.public_id || "",
      };
    }

    // logoImage: same logic
    let logoImage = banner.logoImage;
    if (req.files?.logoImage?.[0]) {
      await deleteFromBunny(banner.logoImage?.public_id);
      logoImage = await uploadToBunny(
        req.files.logoImage[0].buffer,
        req.files.logoImage[0].originalname,
        "banners/logo"
      );
    } else if (req.body.logoImage && req.body.logoImage.startsWith("http")) {
      logoImage = {
        url: req.body.logoImage,
        public_id: banner.logoImage?.public_id || "",
      };
    }

    const movieId = movies || webseries || banner.movieId;

    const updated = await Banner.findByIdAndUpdate(
      id,
      { title, categoryId, movieId, bannerImage, logoImage },
      { new: true, runValidators: true }
    )
      .populate("categoryId", "name")
      .populate("movieId", "movieTitle");

    return res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("editBanner error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/banner/:id
// ─────────────────────────────────────────────────────────────────────────────
const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    await deleteFromBunny(banner.bannerImage?.public_id);
    await deleteFromBunny(banner.logoImage?.public_id);
    await Banner.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.error("deleteBanner error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllBanners, addBanner, editBanner, deleteBanner };