// // const Movie = require("../models/Movie");
// // const bunnyService = require("../services/bunnyService");
// // // const languageMap = {
// // //   Hindi: "hi",
// // //   English: "en",
// // //   Punjabi: "pa",
// // //   Tamil: "ta",
// // //   Telugu: "te",
// // // };
// // const parseArray = (data) => {
// //   if (!data) return [];
// //   if (typeof data === "string") {
// //     try { return JSON.parse(data); } catch (e) { return []; }
// //   }
// //   return Array.isArray(data) ? data : [];
// // };

// // // Create Movie with Bunny CDN Upload
// // const createMovie = async (req, res) => {
// //   try {
// //     console.log("\n========================================");
// //     console.log("🎬 CREATING NEW MOVIE");
// //     console.log("========================================");
// //     console.log("Body:", req.body);
// //     console.log("Files:", req.files ? Object.keys(req.files) : "No files");
    
// //     const movieData = {
// //       movieTitle: req.body.movieTitle,
// //       tagline: req.body.tagline || "",
// //       description: req.body.description,
// //       fullStoryline: req.body.fullStoryline || "",
// //       genres: parseArray(req.body.genres),
// //       tags: parseArray(req.body.tags),
// //       language: req.body.language,
     
// //       selectedLanguage: req.body.selectedLanguage || "",
// //       duration: parseInt(req.body.duration),
// //       ageRating: req.body.ageRating,
// //       imdbRating: parseFloat(req.body.imdbRating) || 0,
// //       releaseYear: parseInt(req.body.releaseYear),
// //       productionStudio: parseArray(req.body.productionStudio),
// //       countryOfOrigin: parseArray(req.body.countryOfOrigin),
// //       budget: req.body.budget || "",
// //       awardsAndNominations: req.body.awardsAndNominations || "",
// //       videoQuality: req.body.videoQuality || "Auto (Adaptive)",
// //       audioFormat: req.body.audioFormat || "Stereo",
// //       director: parseArray(req.body.director),
// //       producer: parseArray(req.body.producer),
// //       writer: parseArray(req.body.writer),
// //       musicDirector: parseArray(req.body.musicDirector),
// //       cinematographer: parseArray(req.body.cinematographer),
// //       editor: parseArray(req.body.editor),
// //       castMembers: parseArray(req.body.castMembers),
// //       audioTracks: parseArray(req.body.audioTracks),
// //       subtitles: parseArray(req.body.subtitles),
// //       publishStatus: req.body.publishStatus === "true",
// //       subscriptionRequired: req.body.subscriptionRequired === "true",
// //       enableAds: req.body.enableAds === "true",
// //       allowDownloads: req.body.allowDownloads === "true",
// //       featuredMovie: req.body.featuredMovie === "true",
// //       contentVendor: req.body.contentVendor || "Internal",
// //       vendorId: req.body.vendorId || "",
// //       seoTitle: req.body.seoTitle || "",
// //       seoDescription: req.body.seoDescription || "",
// //       seoKeywords: parseArray(req.body.seoKeywords),
// //       createdBy: req.user?.id,
// //       customVideoUrl: req.body.customVideoUrl || "",
// //     };
    
// //     if (req.body.publishDate) movieData.publishDate = new Date(req.body.publishDate);
// //     if (req.body.expiryDate) movieData.expiryDate = new Date(req.body.expiryDate);
    
// //     // Handle file uploads
// //     if (req.files) {
// //       // Upload Logo
// //       if (req.files.logo && req.files.logo[0]) {
// //         const file = req.files.logo[0];
// //         console.log(`\n📸 Processing LOGO:`);
// //         console.log(`   Name: ${file.originalname}`);
// //         console.log(`   Size: ${(file.size / 1024).toFixed(2)} KB`);
        
// //         const uploadResult = await bunnyService.uploadImage(
// //           file.buffer,
// //           `logo_${Date.now()}_${file.originalname}`,
// //           file.mimetype
// //         );
        
// //         // if (uploadResult) {
// //         //   movieData.logo = {
// //         //     url: uploadResult.url,
// //         //     publicId: uploadResult.publicId
// //         //   };
// //         //   console.log(`   ✅ Logo saved`);
// //         // }
// //         if (uploadResult && uploadResult.url.startsWith("https://")) {
// //   movieData.logo = {
// //     url: uploadResult.url,
// //     publicId: uploadResult.publicId
// //   };
// //   console.log(`   ✅ Logo saved`);
// // }
// //       }
      
// //       // Upload Horizontal Banner
// //       if (req.files.horizontalBanner && req.files.horizontalBanner[0]) {
// //         const file = req.files.horizontalBanner[0];
// //         console.log(`\n📸 Processing HORIZONTAL BANNER:`);
// //         console.log(`   Name: ${file.originalname}`);
// //         console.log(`   Size: ${(file.size / 1024).toFixed(2)} KB`);
        
// //         const uploadResult = await bunnyService.uploadImage(
// //           file.buffer,
// //           `banner_${Date.now()}_${file.originalname}`,
// //           file.mimetype
// //         );
        
// //         // if (uploadResult) {
// //         //   movieData.horizontalBanner = {
// //         //     url: uploadResult.url,
// //         //     publicId: uploadResult.publicId
// //         //   };
// //         //   console.log(`   ✅ Banner saved`);
// //         // }

// //         if (uploadResult && uploadResult.url.startsWith("https://")) {
// //   movieData.horizontalBanner = {
// //     url: uploadResult.url,
// //     publicId: uploadResult.publicId
// //   };
// // }
// //       }
      
// //       // Upload Vertical Poster
// //       if (req.files.verticalPoster && req.files.verticalPoster[0]) {
// //         const file = req.files.verticalPoster[0];
// //         console.log(`\n📸 Processing VERTICAL POSTER:`);
// //         console.log(`   Name: ${file.originalname}`);
// //         console.log(`   Size: ${(file.size / 1024).toFixed(2)} KB`);
        
// //         const uploadResult = await bunnyService.uploadImage(
// //           file.buffer,
// //           `poster_${Date.now()}_${file.originalname}`,
// //           file.mimetype
// //         );
        
// //         // if (uploadResult) {
// //         //   movieData.verticalPoster = {
// //         //     url: uploadResult.url,
// //         //     publicId: uploadResult.publicId
// //         //   };
// //         //   console.log(`   ✅ Poster saved`);
// //         // }

// //         if (uploadResult && uploadResult.url.startsWith("https://")) {
// //   movieData.verticalPoster = {
// //     url: uploadResult.url,
// //     publicId: uploadResult.publicId
// //   };
// // }
// //       }
      
// //       // Upload video to Bunny CDN
// //       if (req.files.movieFile && req.files.movieFile[0]) {
// //         const file = req.files.movieFile[0];
// //         console.log("\n📹 VIDEO FILE DETAILS:");
// //         console.log(`   Name: ${file.originalname}`);
// //         console.log(`   Size: ${(file.size / (1024 * 1024)).toFixed(2)} MB`);
// //         console.log(`   Type: ${file.mimetype}`);
        
// //         const uploadResult = await bunnyService.uploadVideo(
// //           file.buffer,
// //           `${Date.now()}_${file.originalname}`,
// //           file.mimetype
// //         );
        
// //         if (uploadResult && uploadResult.hlsUrl) {
// //           movieData.movieFile = {
// //             url: uploadResult.hlsUrl,
// //             videoId: uploadResult.videoId,
// //             hlsUrl: uploadResult.hlsUrl,
// //             mp4Url: uploadResult.mp4Url,
// //             directPlayUrl: uploadResult.directPlayUrl,
// //             thumbnailUrl: uploadResult.thumbnailUrl,
// //             duration: uploadResult.duration,
// //             size: file.size,
// //             // status: uploadResult.status || 3
// //             status: uploadResult.status === "ready" ? 4 : 2
// //           };
// //           console.log("\n✅✅✅ VIDEO UPLOAD SUCCESSFUL! ✅✅✅");
// //           console.log(`🎬 HLS Stream URL: ${uploadResult.hlsUrl}`);
// //           console.log(`🎬 Direct Play URL: ${uploadResult.directPlayUrl}`);
// //         } else {
// //           throw new Error("Failed to upload video to Bunny CDN");
// //         }
// //       }
// //     }
    
// //     const movie = await Movie.create(movieData);
    
// //     console.log("\n✅ MOVIE CREATED SUCCESSFULLY!");
// //     console.log(`   ID: ${movie._id}`);
// //     console.log(`   Title: ${movie.movieTitle}`);
// //     console.log(`   Logo: ${movie.logo?.url || 'No logo'}`);
// //     console.log(`   Video: ${movie.movieFile?.hlsUrl || 'N/A'}\n`);
    
// //     res.status(201).json({ 
// //       success: true, 
// //       message: "Movie created successfully",
// //       data: {
// //         ...movie.toObject(),
// //         // videoStreamUrl: movie.movieFile?.hlsUrl || movie.customVideoUrl,
// //         videoStreamUrl:
// //   movie.movieFile?.status === 4
// //     ? movie.movieFile?.hlsUrl
// //     : movie.customVideoUrl || null,
// //         hlsUrl: movie.movieFile?.hlsUrl,
// //         mp4Url: movie.movieFile?.mp4Url,
// //         directPlayUrl: movie.movieFile?.directPlayUrl,
// //         thumbnailUrl: movie.movieFile?.thumbnailUrl,
// //         logoUrl: movie.logo?.url,
// //         horizontalBannerUrl: movie.horizontalBanner?.url,
// //         verticalPosterUrl: movie.verticalPoster?.url
// //       }
// //     });
// //   } catch (error) {
// //     console.error("\n❌ ERROR CREATING MOVIE:");
// //     console.error(`   ${error.message}\n`);
// //     res.status(500).json({ 
// //       success: false, 
// //       message: error.message 
// //     });
// //   }
// // };

// // // Update Movie
// // const updateMovie = async (req, res) => {
// //   try {
// //     console.log("Updating movie:", req.params.id);
    
// //     const updateData = { ...req.body };

// //     // ✅ FIX LANGUAGE
// // // if (updateData.language) {
// // //   updateData.language = languageMap[updateData.language] || "en";
// // // }
// //     const arrayFields = ["genres", "tags", "productionStudio", "countryOfOrigin", "director", "producer", "writer", "musicDirector", "cinematographer", "editor", "castMembers", "audioTracks", "subtitles", "seoKeywords"];
// //     arrayFields.forEach(field => {
// //       if (updateData[field]) updateData[field] = parseArray(updateData[field]);
// //     });
    
// //     const boolFields = ["publishStatus", "subscriptionRequired", "enableAds", "allowDownloads", "featuredMovie"];
// //     boolFields.forEach(field => {
// //       if (updateData[field] !== undefined) updateData[field] = updateData[field] === "true";
// //     });
    
// //     if (updateData.customVideoUrl !== undefined) {
// //       updateData.customVideoUrl = updateData.customVideoUrl;
// //     }
    
// //     // Handle file uploads
// //     if (req.files) {
// //       // Upload Logo
// //       if (req.files.logo && req.files.logo[0]) {
// //         const file = req.files.logo[0];
// //         const uploadResult = await bunnyService.uploadImage(
// //           file.buffer,
// //           `logo_${Date.now()}_${file.originalname}`,
// //           file.mimetype
// //         );
// //         // if (uploadResult) {
// //         //   updateData.logo = {
// //         //     url: uploadResult.url,
// //         //     publicId: uploadResult.publicId
// //         //   };
// //         // }
// //         if (uploadResult && uploadResult.url.startsWith("https://")) {
// //   updateData.logo = {
// //     url: uploadResult.url,
// //     publicId: uploadResult.publicId
// //   };
// // }
// //       }
      
// //       // Upload Horizontal Banner
// //       if (req.files.horizontalBanner && req.files.horizontalBanner[0]) {
// //         const file = req.files.horizontalBanner[0];
// //         const uploadResult = await bunnyService.uploadImage(
// //           file.buffer,
// //           `banner_${Date.now()}_${file.originalname}`,
// //           file.mimetype
// //         );
// //         // if (uploadResult) {
// //         //   updateData.horizontalBanner = {
// //         //     url: uploadResult.url,
// //         //     publicId: uploadResult.publicId
// //         //   };
// //         // }
// // //         if (uploadResult && uploadResult.url.startsWith("https://")) {
// // //   movieData.logo = {
// // //     url: uploadResult.url,
// // //     publicId: uploadResult.publicId
// // //   };
// // // }
// // if (uploadResult && uploadResult.url.startsWith("https://")) {
// //   updateData.horizontalBanner = {
// //     url: uploadResult.url,
// //     publicId: uploadResult.publicId
// //   };
// // }
// //       }
      
// //       // Upload Vertical Poster
// //       if (req.files.verticalPoster && req.files.verticalPoster[0]) {
// //         const file = req.files.verticalPoster[0];
// //         const uploadResult = await bunnyService.uploadImage(
// //           file.buffer,
// //           `poster_${Date.now()}_${file.originalname}`,
// //           file.mimetype
// //         );
// //         // if (uploadResult) {
// //         //   updateData.verticalPoster = {
// //         //     url: uploadResult.url,
// //         //     publicId: uploadResult.publicId
// //         //   };
// //         // }
// //         if (uploadResult && uploadResult.url.startsWith("https://")) {
// //   updateData.verticalPoster = {
// //     url: uploadResult.url,
// //     publicId: uploadResult.publicId
// //   };
// // }
// //       }
      
// //       // Upload Video
// //       if (req.files.movieFile && req.files.movieFile[0]) {
// //         const file = req.files.movieFile[0];
        
// //         const existingMovie = await Movie.findById(req.params.id);
// //         if (existingMovie?.movieFile?.videoId) {
// //           await bunnyService.deleteVideo(existingMovie.movieFile.videoId);
// //         }
        
// //         const uploadResult = await bunnyService.uploadVideo(
// //           file.buffer,
// //           `${Date.now()}_${file.originalname}`,
// //           file.mimetype
// //         );
        
// //         if (uploadResult) {
// //           updateData.movieFile = {
// //             url: uploadResult.hlsUrl,
// //             videoId: uploadResult.videoId,
// //             hlsUrl: uploadResult.hlsUrl,
// //             mp4Url: uploadResult.mp4Url,
// //             directPlayUrl: uploadResult.directPlayUrl,
// //             thumbnailUrl: uploadResult.thumbnailUrl,
// //             duration: uploadResult.duration,
// //             size: file.size,
// //             // status: uploadResult.status || 3
// //             status: uploadResult.status === "ready" ? 4 : 2
// //           };
// //         }
// //       }
// //     }
    
// //     const movie = await Movie.findByIdAndUpdate(req.params.id, updateData, { new: true });
// //     res.json({ 
// //       success: true, 
// //       data: {
// //         ...movie.toObject(),
// //         // videoStreamUrl: movie.movieFile?.hlsUrl || movie.customVideoUrl,
// //         videoStreamUrl:
// //   movie.movieFile?.status === 4
// //     ? movie.movieFile?.hlsUrl
// //     : movie.customVideoUrl || null,
// //         hlsUrl: movie.movieFile?.hlsUrl,
// //         mp4Url: movie.movieFile?.mp4Url,
// //         directPlayUrl: movie.movieFile?.directPlayUrl,
// //         logoUrl: movie.logo?.url,
// //         horizontalBannerUrl: movie.horizontalBanner?.url,
// //         verticalPosterUrl: movie.verticalPoster?.url
// //       }
// //     });
// //   } catch (error) {
// //     console.error("Update error:", error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Get All Movies
// // const getMovies = async (req, res) => {
// //   try {
// //     const movies = await Movie.find().sort({ createdAt: -1 });
// //     const moviesWithUrls = movies.map(movie => ({
// //       ...movie.toObject(),
// //       // videoStreamUrl: movie.movieFile?.hlsUrl || movie.customVideoUrl,
// //       videoStreamUrl:
// //   movie.movieFile?.status === 4
// //     ? movie.movieFile?.hlsUrl
// //     : movie.customVideoUrl || null,
// //       hlsUrl: movie.movieFile?.hlsUrl,
// //       mp4Url: movie.movieFile?.mp4Url,
// //       directPlayUrl: movie.movieFile?.directPlayUrl,
// //       logoUrl: movie.logo?.url,
// //       horizontalBannerUrl: movie.horizontalBanner?.url,
// //       verticalPosterUrl: movie.verticalPoster?.url
// //     }));
// //     res.json({ success: true, data: moviesWithUrls });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Get Single Movie
// // const getMovieById = async (req, res) => {
// //   try {
// //     const movie = await Movie.findById(req.params.id);
// //     if (!movie) {
// //       return res.status(404).json({ success: false, message: "Movie not found" });
// //     }
    
// //     movie.viewCount += 1;
// //     await movie.save();
    
// //     res.json({ 
// //       success: true, 
// //       data: {
// //         ...movie.toObject(),
// //         // videoStreamUrl: movie.movieFile?.hlsUrl || movie.customVideoUrl,
// //         videoStreamUrl:
// //   movie.movieFile?.status === 4
// //     ? movie.movieFile?.hlsUrl
// //     : movie.customVideoUrl || null,
// //         hlsUrl: movie.movieFile?.hlsUrl,
// //         mp4Url: movie.movieFile?.mp4Url,
// //         directPlayUrl: movie.movieFile?.directPlayUrl,
// //         thumbnailUrl: movie.movieFile?.thumbnailUrl,
// //         logoUrl: movie.logo?.url,
// //         horizontalBannerUrl: movie.horizontalBanner?.url,
// //         verticalPosterUrl: movie.verticalPoster?.url
// //       }
// //     });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Delete Movie
// // const deleteMovie = async (req, res) => {
// //   try {
// //     const movie = await Movie.findById(req.params.id);
    
// //     if (movie.movieFile?.videoId) {
// //       await bunnyService.deleteVideo(movie.movieFile.videoId);
// //     }
    
// //     await Movie.findByIdAndDelete(req.params.id);
// //     res.json({ success: true, message: "Movie deleted successfully" });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Toggle Publish
// // const togglePublish = async (req, res) => {
// //   try {
// //     const movie = await Movie.findById(req.params.id);
// //     movie.publishStatus = !movie.publishStatus;
// //     if (movie.publishStatus) movie.publishDate = new Date();
// //     await movie.save();
// //     res.json({ success: true, data: movie });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Get Video Stream URL
// // const getVideoStreamUrl = async (req, res) => {
// //   try {
// //     const movie = await Movie.findById(req.params.id);
// //     if (!movie) {
// //       return res.status(404).json({ success: false, message: "Movie not found" });
// //     }
    
// //     // const streamUrl = movie.movieFile?.hlsUrl || movie.customVideoUrl;
// //     const streamUrl =
// //   movie.movieFile?.status === 4
// //     ? movie.movieFile?.hlsUrl
// //     : movie.customVideoUrl || null;
// //     const directPlayUrl = movie.movieFile?.directPlayUrl;
    
// //     if (!streamUrl && !directPlayUrl) {
// //       return res.status(404).json({ success: false, message: "Video not found" });
// //     }
    
// //     res.json({ 
// //       success: true, 
// //       data: {
// //         hlsUrl: streamUrl,
// //         directPlayUrl: directPlayUrl,
// //         mp4Url: movie.movieFile?.mp4Url,
// //         thumbnailUrl: movie.movieFile?.thumbnailUrl
// //       }
// //     });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // module.exports = {
// //   createMovie,
// //   getMovies,
// //   getMovieById,
// //   updateMovie,
// //   deleteMovie,
// //   togglePublish,
// //   getVideoStreamUrl
// // };

// const Movie = require("../models/Movie");
// const bunnyService = require("../services/bunnyService");

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// /**
//  * Parse JSON-encoded arrays sent as form-data strings.
//  * Supports plain strings, JSON arrays, and already-parsed arrays.
//  */
// const parseArray = (data) => {
//   if (!data) return [];
//   if (typeof data === "string") {
//     try { return JSON.parse(data); } catch (e) { return []; }
//   }
//   return Array.isArray(data) ? data : [];
// };

// /**
//  * Parse crew / cast arrays.
//  * Each item may be:
//  *   • A plain string  → { name: "Alice" }
//  *   • An object       → { name, character?, imageUrl?, publicId? }
//  * Images are NOT embedded here; they come in as separate upload fields
//  * (see uploadCrewImages / uploadCastImages below).
//  */
// const parsePersonArray = (data) => {
//   const items = parseArray(data);
//   return items.map((item) => {
//     if (typeof item === "string") return { name: item };
//     return {
//       name:      item.name      || "",
//       character: item.character || undefined,
//       imageUrl:  item.imageUrl  || "",
//       publicId:  item.publicId  || "",
//     };
//   });
// };

// /**
//  * Upload a single image to Bunny and return { url, publicId }.
//  * Returns null on failure instead of throwing.
//  */
// const uploadImageSafe = async (file, prefix) => {
//   try {
//     const result = await bunnyService.uploadImage(
//       file.buffer,
//       `${prefix}_${Date.now()}_${file.originalname}`,
//       file.mimetype
//     );
//     if (result && result.url.startsWith("https://")) return result;
//     return null;
//   } catch (err) {
//     console.error(`❌ Image upload failed (${prefix}):`, err.message);
//     return null;
//   }
// };

// /**
//  * Upload crew member photos.
//  * Multer field name pattern:  crewImages_<role>_<index>
//  * e.g. crewImages_director_0, crewImages_producer_1
//  *
//  * Mutates the crewArray in-place, attaching imageUrl / publicId.
//  */
// const uploadCrewImages = async (files, role, crewArray) => {
//   for (let i = 0; i < crewArray.length; i++) {
//     const fieldName = `crewImages_${role}_${i}`;
//     if (files[fieldName] && files[fieldName][0]) {
//       const file = files[fieldName][0];
//       console.log(`\n👤 Uploading ${role}[${i}] image: ${file.originalname}`);
//       const result = await uploadImageSafe(file, `crew_${role}_${i}`);
//       if (result) {
//         crewArray[i].imageUrl = result.url;
//         crewArray[i].publicId = result.publicId;
//         console.log(`   ✅ ${role}[${i}] image saved`);
//       }
//     }
//   }
// };

// /**
//  * Upload cast member photos.
//  * Multer field name pattern:  castImage_<index>
//  * e.g. castImage_0, castImage_1
//  *
//  * Mutates the castArray in-place.
//  */
// const uploadCastImages = async (files, castArray) => {
//   for (let i = 0; i < castArray.length; i++) {
//     const fieldName = `castImage_${i}`;
//     if (files[fieldName] && files[fieldName][0]) {
//       const file = files[fieldName][0];
//       console.log(`\n🎭 Uploading cast[${i}] image: ${file.originalname}`);
//       const result = await uploadImageSafe(file, `cast_${i}`);
//       if (result) {
//         castArray[i].imageUrl = result.url;
//         castArray[i].publicId = result.publicId;
//         console.log(`   ✅ cast[${i}] image saved`);
//       }
//     }
//   }
// };

// /**
//  * Upload a video (main movie or trailer) to Bunny CDN.
//  * Returns the movieFile/trailer sub-document object, or throws.
//  */
// const uploadVideoBunny = async (file) => {
//   const result = await bunnyService.uploadVideo(
//     file.buffer,
//     `${Date.now()}_${file.originalname}`,
//     file.mimetype
//   );
//   if (!result || !result.hlsUrl) throw new Error("Video upload to Bunny CDN failed");
//   return {
//     url:           result.hlsUrl,
//     videoId:       result.videoId,
//     hlsUrl:        result.hlsUrl,
//     mp4Url:        result.mp4Url,
//     directPlayUrl: result.directPlayUrl,
//     thumbnailUrl:  result.thumbnailUrl,
//     duration:      result.duration || 0,
//     size:          file.size,
//     status:        result.status === "ready" ? 4 : 2,
//   };
// };

// /** Build the flat URL helper fields appended to every response. */
// const buildResponseExtras = (movie) => ({
//   // Main video
//   videoStreamUrl:
//     movie.movieFile?.status === 4
//       ? movie.movieFile?.hlsUrl
//       : movie.customVideoUrl || null,
//   hlsUrl:        movie.movieFile?.hlsUrl,
//   mp4Url:        movie.movieFile?.mp4Url,
//   directPlayUrl: movie.movieFile?.directPlayUrl,
//   thumbnailUrl:  movie.movieFile?.thumbnailUrl,

//   // Trailer
//   trailerStreamUrl:
//     movie.trailer?.status === 4
//       ? movie.trailer?.hlsUrl
//       : movie.customTrailerUrl || null,
//   trailerHlsUrl:        movie.trailer?.hlsUrl,
//   trailerMp4Url:        movie.trailer?.mp4Url,
//   trailerDirectPlayUrl: movie.trailer?.directPlayUrl,
//   trailerThumbnailUrl:  movie.trailer?.thumbnailUrl,

//   // Images
//   logoUrl:               movie.logo?.url,
//   horizontalBannerUrl:   movie.horizontalBanner?.url,
//   verticalPosterUrl:     movie.verticalPoster?.url,
// });

// // ─── CREW ROLES (used for iteration) ──────────────────────────────────────────
// const CREW_ROLES = ["director", "producer", "writer", "musicDirector", "cinematographer", "editor"];

// // ─── Controllers ──────────────────────────────────────────────────────────────

// // Create Movie
// const createMovie = async (req, res) => {
//   try {
//     console.log("\n========================================");
//     console.log("🎬 CREATING NEW MOVIE");
//     console.log("========================================");
//     console.log("Body:", req.body);
//     console.log("Files:", req.files ? Object.keys(req.files) : "No files");

//     // ── Parse crew & cast ──────────────────────────────────────────────────
//     const crewData = {};
//     CREW_ROLES.forEach((role) => {
//       crewData[role] = parsePersonArray(req.body[role]);
//     });
//     const castMembers = parsePersonArray(req.body.castMembers);

//     const movieData = {
//       movieTitle:           req.body.movieTitle,
//       tagline:              req.body.tagline              || "",
//       description:          req.body.description,
//       fullStoryline:        req.body.fullStoryline        || "",
//       genres:               parseArray(req.body.genres),
//       tags:                 parseArray(req.body.tags),
//       language:             req.body.language,
//       selectedLanguage:     req.body.selectedLanguage     || "",
//       duration:             parseInt(req.body.duration),
//       ageRating:            req.body.ageRating,
//       imdbRating:           parseFloat(req.body.imdbRating) || 0,
//       releaseYear:          parseInt(req.body.releaseYear),
//       productionStudio:     parseArray(req.body.productionStudio),
//       countryOfOrigin:      parseArray(req.body.countryOfOrigin),
//       budget:               req.body.budget               || "",
//       awardsAndNominations: req.body.awardsAndNominations || "",
//       videoQuality:         req.body.videoQuality         || "Auto (Adaptive)",
//       audioFormat:          req.body.audioFormat          || "Stereo",
//       ...crewData,
//       castMembers,
//       audioTracks:          parseArray(req.body.audioTracks),
//       subtitles:            parseArray(req.body.subtitles),
//       publishStatus:        req.body.publishStatus        === "true",
//       subscriptionRequired: req.body.subscriptionRequired === "true",
//       enableAds:            req.body.enableAds            === "true",
//       allowDownloads:       req.body.allowDownloads       === "true",
//       featuredMovie:        req.body.featuredMovie        === "true",
//       contentVendor:        req.body.contentVendor        || "Internal",
//       vendorId:             req.body.vendorId             || "",
//       seoTitle:             req.body.seoTitle             || "",
//       seoDescription:       req.body.seoDescription       || "",
//       seoKeywords:          parseArray(req.body.seoKeywords),
//       createdBy:            req.user?.id,
//       customVideoUrl:       req.body.customVideoUrl       || "",
//       customTrailerUrl:     req.body.customTrailerUrl     || "",
//     };

//     if (req.body.publishDate) movieData.publishDate = new Date(req.body.publishDate);
//     if (req.body.expiryDate)  movieData.expiryDate  = new Date(req.body.expiryDate);

//     // ── File uploads ──────────────────────────────────────────────────────
//     if (req.files) {
//       const files = req.files;

//       // Logo
//       if (files.logo?.[0]) {
//         console.log(`\n📸 Processing LOGO`);
//         const r = await uploadImageSafe(files.logo[0], "logo");
//         if (r) { movieData.logo = r; console.log("   ✅ Logo saved"); }
//       }

//       // Horizontal Banner
//       if (files.horizontalBanner?.[0]) {
//         console.log(`\n📸 Processing HORIZONTAL BANNER`);
//         const r = await uploadImageSafe(files.horizontalBanner[0], "banner");
//         if (r) { movieData.horizontalBanner = r; console.log("   ✅ Banner saved"); }
//       }

//       // Vertical Poster
//       if (files.verticalPoster?.[0]) {
//         console.log(`\n📸 Processing VERTICAL POSTER`);
//         const r = await uploadImageSafe(files.verticalPoster[0], "poster");
//         if (r) { movieData.verticalPoster = r; console.log("   ✅ Poster saved"); }
//       }

//       // Main Movie Video
//       if (files.movieFile?.[0]) {
//         const file = files.movieFile[0];
//         console.log(`\n📹 Uploading MAIN VIDEO: ${file.originalname} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
//         movieData.movieFile = await uploadVideoBunny(file);
//         console.log("✅ Main video uploaded:", movieData.movieFile.hlsUrl);
//       }

//       // Trailer Video
//       if (files.trailerFile?.[0]) {
//         const file = files.trailerFile[0];
//         console.log(`\n🎞️  Uploading TRAILER: ${file.originalname} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
//         movieData.trailer = await uploadVideoBunny(file);
//         console.log("✅ Trailer uploaded:", movieData.trailer.hlsUrl);
//       }

//       // Crew images
//       for (const role of CREW_ROLES) {
//         await uploadCrewImages(files, role, movieData[role]);
//       }

//       // Cast images
//       await uploadCastImages(files, movieData.castMembers);
//     }

//     const movie = await Movie.create(movieData);

//     console.log("\n✅ MOVIE CREATED SUCCESSFULLY!");
//     console.log(`   ID: ${movie._id}  |  Title: ${movie.movieTitle}`);

//     res.status(201).json({
//       success: true,
//       message: "Movie created successfully",
//       data: { ...movie.toObject(), ...buildResponseExtras(movie) },
//     });
//   } catch (error) {
//     console.error("\n❌ ERROR CREATING MOVIE:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Update Movie
// const updateMovie = async (req, res) => {
//   try {
//     console.log("Updating movie:", req.params.id);

//     const updateData = { ...req.body };

//     // Array fields
//     const arrayFields = [
//       "genres", "tags", "productionStudio", "countryOfOrigin",
//       "audioTracks", "subtitles", "seoKeywords",
//     ];
//     arrayFields.forEach((field) => {
//       if (updateData[field] !== undefined)
//         updateData[field] = parseArray(updateData[field]);
//     });

//     // Crew / cast (person arrays)
//     CREW_ROLES.forEach((role) => {
//       if (updateData[role] !== undefined)
//         updateData[role] = parsePersonArray(updateData[role]);
//     });
//     if (updateData.castMembers !== undefined)
//       updateData.castMembers = parsePersonArray(updateData.castMembers);

//     // Boolean fields
//     const boolFields = [
//       "publishStatus", "subscriptionRequired", "enableAds",
//       "allowDownloads", "featuredMovie",
//     ];
//     boolFields.forEach((field) => {
//       if (updateData[field] !== undefined)
//         updateData[field] = updateData[field] === "true";
//     });

//     // File uploads
//     if (req.files) {
//       const files = req.files;

//       // Logo
//       if (files.logo?.[0]) {
//         const r = await uploadImageSafe(files.logo[0], "logo");
//         if (r) updateData.logo = r;
//       }

//       // Horizontal Banner
//       if (files.horizontalBanner?.[0]) {
//         const r = await uploadImageSafe(files.horizontalBanner[0], "banner");
//         if (r) updateData.horizontalBanner = r;
//       }

//       // Vertical Poster
//       if (files.verticalPoster?.[0]) {
//         const r = await uploadImageSafe(files.verticalPoster[0], "poster");
//         if (r) updateData.verticalPoster = r;
//       }

//       // Main Movie Video
//       if (files.movieFile?.[0]) {
//         const existing = await Movie.findById(req.params.id);
//         if (existing?.movieFile?.videoId)
//           await bunnyService.deleteVideo(existing.movieFile.videoId);

//         updateData.movieFile = await uploadVideoBunny(files.movieFile[0]);
//       }

//       // Trailer Video
//       if (files.trailerFile?.[0]) {
//         const existing = existing || await Movie.findById(req.params.id);
//         if (existing?.trailer?.videoId)
//           await bunnyService.deleteVideo(existing.trailer.videoId);

//         updateData.trailer = await uploadVideoBunny(files.trailerFile[0]);
//       }

//       // Crew images — only update indices that were uploaded
//       for (const role of CREW_ROLES) {
//         const crew = updateData[role];
//         if (crew) await uploadCrewImages(files, role, crew);
//       }

//       // Cast images
//       if (updateData.castMembers)
//         await uploadCastImages(files, updateData.castMembers);
//     }

//     const movie = await Movie.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     if (!movie) return res.status(404).json({ success: false, message: "Movie not found" });

//     res.json({
//       success: true,
//       data: { ...movie.toObject(), ...buildResponseExtras(movie) },
//     });
//   } catch (error) {
//     console.error("Update error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get All Movies
// const getMovies = async (req, res) => {
//   try {
//     const movies = await Movie.find().sort({ createdAt: -1 });
//     const moviesWithUrls = movies.map((movie) => ({
//       ...movie.toObject(),
//       ...buildResponseExtras(movie),
//     }));
//     res.json({ success: true, data: moviesWithUrls });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get Single Movie
// const getMovieById = async (req, res) => {
//   try {
//     const movie = await Movie.findById(req.params.id);
//     if (!movie)
//       return res.status(404).json({ success: false, message: "Movie not found" });

//     movie.viewCount += 1;
//     await movie.save();

//     res.json({
//       success: true,
//       data: { ...movie.toObject(), ...buildResponseExtras(movie) },
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Delete Movie
// const deleteMovie = async (req, res) => {
//   try {
//     const movie = await Movie.findById(req.params.id);
//     if (!movie)
//       return res.status(404).json({ success: false, message: "Movie not found" });

//     if (movie.movieFile?.videoId)
//       await bunnyService.deleteVideo(movie.movieFile.videoId);
//     if (movie.trailer?.videoId)
//       await bunnyService.deleteVideo(movie.trailer.videoId);

//     await Movie.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Movie deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Toggle Publish
// const togglePublish = async (req, res) => {
//   try {
//     const movie = await Movie.findById(req.params.id);
//     if (!movie)
//       return res.status(404).json({ success: false, message: "Movie not found" });

//     movie.publishStatus = !movie.publishStatus;
//     if (movie.publishStatus) movie.publishDate = new Date();
//     await movie.save();
//     res.json({ success: true, data: movie });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get Video Stream URL
// const getVideoStreamUrl = async (req, res) => {
//   try {
//     const movie = await Movie.findById(req.params.id);
//     if (!movie)
//       return res.status(404).json({ success: false, message: "Movie not found" });

//     const streamUrl =
//       movie.movieFile?.status === 4
//         ? movie.movieFile?.hlsUrl
//         : movie.customVideoUrl || null;

//     const trailerStreamUrl =
//       movie.trailer?.status === 4
//         ? movie.trailer?.hlsUrl
//         : movie.customTrailerUrl || null;

//     if (!streamUrl && !movie.movieFile?.directPlayUrl)
//       return res.status(404).json({ success: false, message: "Video not found" });

//     res.json({
//       success: true,
//       data: {
//         hlsUrl:        streamUrl,
//         directPlayUrl: movie.movieFile?.directPlayUrl,
//         mp4Url:        movie.movieFile?.mp4Url,
//         thumbnailUrl:  movie.movieFile?.thumbnailUrl,
//         trailer: {
//           hlsUrl:        trailerStreamUrl,
//           directPlayUrl: movie.trailer?.directPlayUrl,
//           mp4Url:        movie.trailer?.mp4Url,
//           thumbnailUrl:  movie.trailer?.thumbnailUrl,
//         },
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = {
//   createMovie,
//   getMovies,
//   getMovieById,
//   updateMovie,
//   deleteMovie,
//   togglePublish,
//   getVideoStreamUrl,
// };



const Movie = require("../models/Movie");
const bunnyService = require("../services/bunnyService");
const formatCrew = (movie) => {
  const rolesMap = {
    director: "Director",
    producer: "Producer",
    writer: "Writer",
    musicDirector: "Music Director",
    cinematographer: "Cinematographer",
    editor: "Editor",
  };

  let crew = [];

  Object.keys(rolesMap).forEach((roleKey) => {
    if (movie[roleKey]?.length) {
      movie[roleKey].forEach((person) => {
        crew.push({
          role: rolesMap[roleKey],
          name: person.name,
          imageUrl: person.imageUrl,
          publicId: person.publicId,
        });
      });
    }
  });

  return crew;
};

const parseArray = (data) => {
  if (!data) return [];
  if (typeof data === "string") {
    try { return JSON.parse(data); } catch (e) { return []; }
  }
  return Array.isArray(data) ? data : [];
};

/**
 * Parse crew / cast arrays.
 * Each item may be:
 *   • A plain string  → { name: "Alice" }
 *   • An object       → { name, character?, imageUrl?, publicId? }
 * Images are NOT embedded here; they come in as separate upload fields
 * (see uploadCrewImages / uploadCastImages below).
 */
const parsePersonArray = (data) => {
  const items = parseArray(data);
  return items.map((item) => {
    if (typeof item === "string") return { name: item };
    return {
      name:      item.name      || "",
      character: item.character || undefined,
      imageUrl:  item.imageUrl  || "",
      publicId:  item.publicId  || "",
    };
  });
};

/**
 * Upload a single image to Bunny and return { url, publicId }.
 * Returns null on failure instead of throwing.
 */
const uploadImageSafe = async (file, prefix) => {
  try {
    const result = await bunnyService.uploadImage(
      file.buffer,
      `${prefix}_${Date.now()}_${file.originalname}`,
      file.mimetype
    );
    if (result && result.url.startsWith("https://")) return result;
    return null;
  } catch (err) {
    console.error(`❌ Image upload failed (${prefix}):`, err.message);
    return null;
  }
};

/**
 * Upload crew member photos.
 * Multer field name pattern:  crewImages_<role>_<index>
 * e.g. crewImages_director_0, crewImages_producer_1
 *
 * Mutates the crewArray in-place, attaching imageUrl / publicId.
 */
const uploadCrewImages = async (files, role, crewArray) => {
  for (let i = 0; i < crewArray.length; i++) {
    const fieldName = `crewImages_${role}_${i}`;
    if (files[fieldName] && files[fieldName][0]) {
      const file = files[fieldName][0];
      console.log(`\n👤 Uploading ${role}[${i}] image: ${file.originalname}`);
      const result = await uploadImageSafe(file, `crew_${role}_${i}`);
      if (result) {
        crewArray[i].imageUrl = result.url;
        crewArray[i].publicId = result.publicId;
        console.log(`   ✅ ${role}[${i}] image saved`);
      }
    }
  }
};

/**
 * Upload cast member photos.
 * Multer field name pattern:  castImage_<index>
 * e.g. castImage_0, castImage_1
 *
 * Mutates the castArray in-place.
 */
const uploadCastImages = async (files, castArray) => {
  for (let i = 0; i < castArray.length; i++) {
    const fieldName = `castImage_${i}`;
    if (files[fieldName] && files[fieldName][0]) {
      const file = files[fieldName][0];
      console.log(`\n🎭 Uploading cast[${i}] image: ${file.originalname}`);
      const result = await uploadImageSafe(file, `cast_${i}`);
      if (result) {
        castArray[i].imageUrl = result.url;
        castArray[i].publicId = result.publicId;
        console.log(`   ✅ cast[${i}] image saved`);
      }
    }
  }
};

/**
 * Upload a video (main movie or trailer) to Bunny CDN.
 * Returns the movieFile/trailer sub-document object, or throws.
 */
const uploadVideoBunny = async (file) => {
  const result = await bunnyService.uploadVideo(
    file.buffer,
    `${Date.now()}_${file.originalname}`,
    file.mimetype
  );
  if (!result || !result.hlsUrl) throw new Error("Video upload to Bunny CDN failed");
  return {
    url:           result.hlsUrl,
    videoId:       result.videoId,
    hlsUrl:        result.hlsUrl,
    mp4Url:        result.mp4Url,
    directPlayUrl: result.directPlayUrl,
    thumbnailUrl:  result.thumbnailUrl,
    duration:      result.duration || 0,
    size:          file.size,
    status:        result.status === "ready" ? 4 : 2,
  };
};

/** Build the flat URL helper fields appended to every response. */
const buildResponseExtras = (movie) => ({
  // Main video
  videoStreamUrl:
    movie.movieFile?.status === 4
      ? movie.movieFile?.hlsUrl
      : movie.customVideoUrl || null,
  hlsUrl:        movie.movieFile?.hlsUrl,
  mp4Url:        movie.movieFile?.mp4Url,
  directPlayUrl: movie.movieFile?.directPlayUrl,
  thumbnailUrl:  movie.movieFile?.thumbnailUrl,

  // Trailer
  trailerStreamUrl:
    movie.trailer?.status === 4
      ? movie.trailer?.hlsUrl
      : movie.customTrailerUrl || null,
  trailerHlsUrl:        movie.trailer?.hlsUrl,
  trailerMp4Url:        movie.trailer?.mp4Url,
  trailerDirectPlayUrl: movie.trailer?.directPlayUrl,
  trailerThumbnailUrl:  movie.trailer?.thumbnailUrl,

  // Images
  logoUrl:               movie.logo?.url,
  horizontalBannerUrl:   movie.horizontalBanner?.url,
  verticalPosterUrl:     movie.verticalPoster?.url,
});

// ─── CREW ROLES (used for iteration) ──────────────────────────────────────────
const CREW_ROLES = ["director", "producer", "writer", "musicDirector", "cinematographer", "editor"];

// ─── Controllers ──────────────────────────────────────────────────────────────

// Create Movie
const createMovie = async (req, res) => {
  try {
    console.log("\n========================================");
    console.log("🎬 CREATING NEW MOVIE");
    console.log("========================================");
    console.log("Body:", req.body);
    console.log("Files:", req.files ? Object.keys(req.files) : "No files");

    // ── Parse crew & cast ──────────────────────────────────────────────────
    const crewData = {};
    CREW_ROLES.forEach((role) => {
      crewData[role] = parsePersonArray(req.body[role]);
    });
    const castMembers = parsePersonArray(req.body.castMembers);

    const movieData = {
      movieTitle:           req.body.movieTitle,
      tagline:              req.body.tagline              || "",
      description:          req.body.description,
      fullStoryline:        req.body.fullStoryline        || "",
      genres:               parseArray(req.body.genres),
      tags:                 parseArray(req.body.tags),
      language:             req.body.language,
      selectedLanguage:     req.body.selectedLanguage     || "",
      duration:             parseInt(req.body.duration),
      ageRating:            req.body.ageRating,
      imdbRating:           parseFloat(req.body.imdbRating) || 0,
      releaseYear:          parseInt(req.body.releaseYear),
      productionStudio:     parseArray(req.body.productionStudio),
      countryOfOrigin:      parseArray(req.body.countryOfOrigin),
      budget:               req.body.budget               || "",
      awardsAndNominations: req.body.awardsAndNominations || "",
      videoQuality:         req.body.videoQuality         || "Auto (Adaptive)",
      audioFormat:          req.body.audioFormat          || "Stereo",
      ...crewData,
      castMembers,
      audioTracks:          parseArray(req.body.audioTracks),
      subtitles:            parseArray(req.body.subtitles),
      publishStatus:        req.body.publishStatus        === "true",
      subscriptionRequired: req.body.subscriptionRequired === "true",
      enableAds:            req.body.enableAds            === "true",
      allowDownloads:       req.body.allowDownloads       === "true",
      featuredMovie:        req.body.featuredMovie        === "true",
      contentVendor:        req.body.contentVendor        || "Internal",
      vendorId:             req.body.vendorId             || "",
      seoTitle:             req.body.seoTitle             || "",
      seoDescription:       req.body.seoDescription       || "",
      seoKeywords:          parseArray(req.body.seoKeywords),
      createdBy:            req.user?.id,
      customVideoUrl:       req.body.customVideoUrl       || "",
      customTrailerUrl:     req.body.customTrailerUrl     || "",
    };

    if (req.body.publishDate) movieData.publishDate = new Date(req.body.publishDate);
    if (req.body.expiryDate)  movieData.expiryDate  = new Date(req.body.expiryDate);

    // ── File uploads ──────────────────────────────────────────────────────
    if (req.files) {
      const files = req.files;

      // Logo
      if (files.logo?.[0]) {
        console.log(`\n📸 Processing LOGO`);
        const r = await uploadImageSafe(files.logo[0], "logo");
        if (r) { movieData.logo = r; console.log("   ✅ Logo saved"); }
      }

      // Horizontal Banner
      if (files.horizontalBanner?.[0]) {
        console.log(`\n📸 Processing HORIZONTAL BANNER`);
        const r = await uploadImageSafe(files.horizontalBanner[0], "banner");
        if (r) { movieData.horizontalBanner = r; console.log("   ✅ Banner saved"); }
      }

      // Vertical Poster
      if (files.verticalPoster?.[0]) {
        console.log(`\n📸 Processing VERTICAL POSTER`);
        const r = await uploadImageSafe(files.verticalPoster[0], "poster");
        if (r) { movieData.verticalPoster = r; console.log("   ✅ Poster saved"); }
      }

      // Main Movie Video
      if (files.movieFile?.[0]) {
        const file = files.movieFile[0];
        console.log(`\n📹 Uploading MAIN VIDEO: ${file.originalname} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
        movieData.movieFile = await uploadVideoBunny(file);
        console.log("✅ Main video uploaded:", movieData.movieFile.hlsUrl);
      }

      // Trailer Video
      if (files.trailerFile?.[0]) {
        const file = files.trailerFile[0];
        console.log(`\n🎞️  Uploading TRAILER: ${file.originalname} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
        movieData.trailer = await uploadVideoBunny(file);
        console.log("✅ Trailer uploaded:", movieData.trailer.hlsUrl);
      }

      // Crew images
      for (const role of CREW_ROLES) {
        await uploadCrewImages(files, role, movieData[role]);
      }

      // Cast images
      await uploadCastImages(files, movieData.castMembers);
    }

    const movie = await Movie.create(movieData);

    console.log("\n✅ MOVIE CREATED SUCCESSFULLY!");
    console.log(`   ID: ${movie._id}  |  Title: ${movie.movieTitle}`);

    // res.status(201).json({
    //   success: true,
    //   message: "Movie created successfully",
    //   data: { ...movie.toObject(), ...buildResponseExtras(movie) },
    // });
   const movieObj = movie.toObject();

// ✅ PEHLE crew & cast bana
// const crew = formatCrew(movieObj);
const crew = formatCrew(movie);
// const cast = movieObj.castMembers;

const cast = [...(movieObj.castMembers || [])];
// ❗ PHIR delete kar
delete movieObj.director;
delete movieObj.producer;
delete movieObj.writer;
delete movieObj.musicDirector;
delete movieObj.cinematographer;
delete movieObj.editor;
delete movieObj.castMembers;

res.status(201).json({
  success: true,
  message: "Movie created successfully",
  data: {
    ...movieObj,
    ...buildResponseExtras(movie),

    crew,
    cast,
  },
});
  } catch (error) {
    console.error("\n❌ ERROR CREATING MOVIE:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Movie
const updateMovie = async (req, res) => {
  try {
    console.log("Updating movie:", req.params.id);

    const updateData = { ...req.body };

    // Array fields
    const arrayFields = [
      "genres", "tags", "productionStudio", "countryOfOrigin",
      "audioTracks", "subtitles", "seoKeywords",
    ];
    arrayFields.forEach((field) => {
      if (updateData[field] !== undefined)
        updateData[field] = parseArray(updateData[field]);
    });

    // Crew / cast (person arrays)
    CREW_ROLES.forEach((role) => {
      if (updateData[role] !== undefined)
        updateData[role] = parsePersonArray(updateData[role]);
    });
    if (updateData.castMembers !== undefined)
      updateData.castMembers = parsePersonArray(updateData.castMembers);

    // Boolean fields
    const boolFields = [
      "publishStatus", "subscriptionRequired", "enableAds",
      "allowDownloads", "featuredMovie",
    ];
    boolFields.forEach((field) => {
      if (updateData[field] !== undefined)
        updateData[field] = updateData[field] === "true";
    });

    // File uploads
    if (req.files) {
      const files = req.files;

      // Logo
      if (files.logo?.[0]) {
        const r = await uploadImageSafe(files.logo[0], "logo");
        if (r) updateData.logo = r;
      }

      // Horizontal Banner
      if (files.horizontalBanner?.[0]) {
        const r = await uploadImageSafe(files.horizontalBanner[0], "banner");
        if (r) updateData.horizontalBanner = r;
      }

      // Vertical Poster
      if (files.verticalPoster?.[0]) {
        const r = await uploadImageSafe(files.verticalPoster[0], "poster");
        if (r) updateData.verticalPoster = r;
      }

      // Main Movie Video
      if (files.movieFile?.[0]) {
        const existing = await Movie.findById(req.params.id);
        if (existing?.movieFile?.videoId)
          await bunnyService.deleteVideo(existing.movieFile.videoId);

        updateData.movieFile = await uploadVideoBunny(files.movieFile[0]);
      }

      // Trailer Video
      if (files.trailerFile?.[0]) {
        const existing = existing || await Movie.findById(req.params.id);
        if (existing?.trailer?.videoId)
          await bunnyService.deleteVideo(existing.trailer.videoId);

        updateData.trailer = await uploadVideoBunny(files.trailerFile[0]);
      }

      // Crew images — only update indices that were uploaded
      for (const role of CREW_ROLES) {
        const crew = updateData[role];
        if (crew) await uploadCrewImages(files, role, crew);
      }

      // Cast images
      if (updateData.castMembers)
        await uploadCastImages(files, updateData.castMembers);
    }

    const movie = await Movie.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!movie) return res.status(404).json({ success: false, message: "Movie not found" });

    // res.json({
    //   success: true,
    //   data: { ...movie.toObject(), ...buildResponseExtras(movie) },
    // });
 const movieObj = movie.toObject();

// ✅ PEHLE bana
// const crew = formatCrew(movieObj);
const crew = formatCrew(movie);
// const cast = movieObj.castMembers;
const cast = [...(movieObj.castMembers || [])];

// ❗ PHIR delete kar
delete movieObj.director;
delete movieObj.producer;
delete movieObj.writer;
delete movieObj.musicDirector;
delete movieObj.cinematographer;
delete movieObj.editor;
delete movieObj.castMembers;

res.json({
  success: true,
  data: {
    ...movieObj,
    ...buildResponseExtras(movie),

    crew,
    cast,
  },
});
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMovies = async (req, res) => {
  try {
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
};

// Get Single Movie
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(404).json({ success: false, message: "Movie not found" });

    movie.viewCount += 1;
    await movie.save();

    // res.json({
    //   success: true,
    //   data: { ...movie.toObject(), ...buildResponseExtras(movie) },
    // });
const movieObj = movie.toObject();

// ✅ PEHLE bana
// const crew = formatCrew(movieObj);
const crew = formatCrew(movie);
// const cast = movieObj.castMembers;
const cast = [...(movieObj.castMembers || [])];
// ❗ PHIR delete
delete movieObj.director;
delete movieObj.producer;
delete movieObj.writer;
delete movieObj.musicDirector;
delete movieObj.cinematographer;
delete movieObj.editor;
delete movieObj.castMembers;

res.json({
  success: true,
  data: {
    ...movieObj,
    ...buildResponseExtras(movie),

    crew,
    cast,
  },
});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Movie
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(404).json({ success: false, message: "Movie not found" });

    if (movie.movieFile?.videoId)
      await bunnyService.deleteVideo(movie.movieFile.videoId);
    if (movie.trailer?.videoId)
      await bunnyService.deleteVideo(movie.trailer.videoId);

    await Movie.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle Publish
const togglePublish = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(404).json({ success: false, message: "Movie not found" });

    movie.publishStatus = !movie.publishStatus;
    if (movie.publishStatus) movie.publishDate = new Date();
    await movie.save();
    res.json({ success: true, data: movie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Video Stream URL
const getVideoStreamUrl = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(404).json({ success: false, message: "Movie not found" });

    const streamUrl =
      movie.movieFile?.status === 4
        ? movie.movieFile?.hlsUrl
        : movie.customVideoUrl || null;

    const trailerStreamUrl =
      movie.trailer?.status === 4
        ? movie.trailer?.hlsUrl
        : movie.customTrailerUrl || null;

    if (!streamUrl && !movie.movieFile?.directPlayUrl)
      return res.status(404).json({ success: false, message: "Video not found" });

    res.json({
      success: true,
      data: {
        hlsUrl:        streamUrl,
        directPlayUrl: movie.movieFile?.directPlayUrl,
        mp4Url:        movie.movieFile?.mp4Url,
        thumbnailUrl:  movie.movieFile?.thumbnailUrl,
        trailer: {
          hlsUrl:        trailerStreamUrl,
          directPlayUrl: movie.trailer?.directPlayUrl,
          mp4Url:        movie.trailer?.mp4Url,
          thumbnailUrl:  movie.trailer?.thumbnailUrl,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  togglePublish,
  getVideoStreamUrl,
};
