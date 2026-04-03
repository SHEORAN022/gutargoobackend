// const axios = require("axios");

// class BunnyCdnService {
//   constructor() {
//     this.videoApiKey = process.env.BUNNY_VIDEO_API_KEY;
//     this.storagePassword = process.env.BUNNY_STORAGE_PASSWORD;

//     this.libraryId = process.env.BUNNY_LIBRARY_ID;
//     this.cdnHostname = process.env.BUNNY_CDN_HOSTNAME; // video CDN
//     this.storageZone = process.env.BUNNY_STORAGE_ZONE; // image CDN

//     this.baseUrl = `https://video.bunnycdn.com/library/${this.libraryId}`;

//     console.log("\n🐰 Bunny CDN Initialized");
//     console.log("Library:", this.libraryId);
//     console.log("Storage Zone:", this.storageZone);
//   }

//   // ================= VIDEO STATUS =================
//   async getVideoStatus(videoId) {
//     try {
//       const res = await axios.get(
//         `${this.baseUrl}/videos/${videoId}`,
//         {
//           headers: {
//             AccessKey: this.videoApiKey,
//           },
//         }
//       );
//       return res.data;
//     } catch (error) {
//       console.error("❌ Status Error:", error.message);
//       return null;
//     }
//   }

//   // ================= VIDEO UPLOAD =================
//   async uploadVideo(fileBuffer, fileName, mimeType) {
//     let videoId = null;

//     try {
//       console.log("\n📹 Creating video...");

//       const createRes = await axios.post(
//         `${this.baseUrl}/videos`,
//         {
//           title: fileName.replace(/\.[^/.]+$/, ""),
//         },
//         {
//           headers: {
//             AccessKey: this.videoApiKey,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       videoId = createRes.data.guid;
//       console.log("✅ Video ID:", videoId);

//       console.log("📤 Uploading video file...");

//       await axios.put(
//         `${this.baseUrl}/videos/${videoId}`,
//         fileBuffer,
//         {
//           headers: {
//             AccessKey: this.videoApiKey,
//             "Content-Type": mimeType,
//           },
//           maxBodyLength: Infinity,
//           maxContentLength: Infinity,
//         }
//       );

//       // ================= WAIT FOR ENCODING =================
//       console.log("⏳ Waiting for video encoding...");

//       let isReady = false;
//       let attempts = 0;

//       while (!isReady && attempts < 20) {
//         const video = await this.getVideoStatus(videoId);

//         if (video && video.status === 4) {
//           isReady = true;
//           console.log("✅ Video is ready for streaming!");
//         } else {
//           attempts++;
//           console.log(`⏳ Encoding... attempt ${attempts}`);
//           await new Promise((r) => setTimeout(r, 5000));
//         }
//       }

//       if (!isReady) {
//         console.warn("⚠️ Video not fully ready yet, but continuing...");
//       }

//       return {
//         videoId,
//         hlsUrl: `https://${this.cdnHostname}/${videoId}/playlist.m3u8`,
//         mp4Url: `https://${this.cdnHostname}/${videoId}/video.mp4`,
//         directPlayUrl: `https://player.mediadelivery.net/play/${this.libraryId}/${videoId}`,
//         thumbnailUrl: `https://${this.cdnHostname}/${videoId}/thumbnail.jpg`,
//         status: isReady ? "ready" : "processing",
//       };
//     } catch (error) {
//       console.error("❌ Video Upload Error:", error.response?.data || error.message);
//       throw new Error("Video upload failed");
//     }
//   }

//   // ================= IMAGE UPLOAD =================
//   async uploadImage(fileBuffer, fileName, mimeType) {
//     try {
//       console.log("\n📸 Uploading image...");

//       const safeName = `${Date.now()}_${fileName.replace(/\s+/g, "_")}`;

//       const storageUrl = `https://storage.bunnycdn.com/${this.storageZone}/${safeName}`;

//       await axios.put(storageUrl, fileBuffer, {
//         headers: {
//           AccessKey: this.storagePassword,
//           "Content-Type": mimeType,
//         },
//         maxBodyLength: Infinity,
//         maxContentLength: Infinity,
//       });

//       // ✅ FIX: सही CDN use
//       const imageUrl = `https://${this.storageZone}.b-cdn.net/${safeName}`;

//       console.log("✅ Image Uploaded:", imageUrl);

//       return {
//         url: imageUrl,
//         publicId: safeName,
//       };
//     } catch (error) {
//       console.error("❌ Image Upload Error:", error.response?.data || error.message);
//       throw new Error("Image upload failed");
//     }
//   }

//   // ================= DELETE VIDEO =================
//   async deleteVideo(videoId) {
//     try {
//       await axios.delete(`${this.baseUrl}/videos/${videoId}`, {
//         headers: {
//           AccessKey: this.videoApiKey,
//         },
//       });
//       console.log("🗑️ Video Deleted:", videoId);
//     } catch (error) {
//       console.error("❌ Delete Error:", error.message);
//     }
//   }
// }

// module.exports = new BunnyCdnService();

const axios = require("axios");

class BunnyCdnService {
  constructor() {
    this.videoApiKey      = process.env.BUNNY_VIDEO_API_KEY;
    this.storagePassword  = process.env.BUNNY_STORAGE_PASSWORD;
    this.libraryId        = process.env.BUNNY_LIBRARY_ID;
    this.cdnHostname      = process.env.BUNNY_CDN_HOSTNAME;  // video CDN hostname
    this.storageZone      = process.env.BUNNY_STORAGE_ZONE;  // image storage zone name

    this.baseUrl = `https://video.bunnycdn.com/library/${this.libraryId}`;

    console.log("\n🐰 Bunny CDN Initialized");
    console.log("Library:", this.libraryId);
    console.log("Storage Zone:", this.storageZone);
  }

  // ─── Video status ────────────────────────────────────────────────────────
  async getVideoStatus(videoId) {
    try {
      const res = await axios.get(`${this.baseUrl}/videos/${videoId}`, {
        headers: { AccessKey: this.videoApiKey },
      });
      return res.data;
    } catch (error) {
      console.error("❌ Status Error:", error.message);
      return null;
    }
  }

  // ─── Upload video (shared by main movie AND trailer) ─────────────────────
  async uploadVideo(fileBuffer, fileName, mimeType) {
    let videoId = null;

    try {
      console.log("\n📹 Creating video entry...");

      const createRes = await axios.post(
        `${this.baseUrl}/videos`,
        { title: fileName.replace(/\.[^/.]+$/, "") },
        {
          headers: {
            AccessKey: this.videoApiKey,
            "Content-Type": "application/json",
          },
        }
      );

      videoId = createRes.data.guid;
      console.log("✅ Video ID:", videoId);

      console.log("📤 Uploading video bytes...");
      await axios.put(`${this.baseUrl}/videos/${videoId}`, fileBuffer, {
        headers: {
          AccessKey: this.videoApiKey,
          "Content-Type": mimeType,
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      });

      // ── Wait for Bunny encoding (max 20 × 5 s = 100 s) ────────────────
      console.log("⏳ Waiting for encoding...");
      let isReady = false;
      let attempts = 0;

      while (!isReady && attempts < 20) {
        const video = await this.getVideoStatus(videoId);
        if (video && video.status === 4) {
          isReady = true;
          console.log("✅ Video is ready for streaming!");
        } else {
          attempts++;
          console.log(`⏳ Encoding... attempt ${attempts}/20`);
          await new Promise((r) => setTimeout(r, 5000));
        }
      }

      if (!isReady) {
        console.warn("⚠️ Video not fully ready yet, but continuing...");
      }

      return {
        videoId,
        hlsUrl:        `https://${this.cdnHostname}/${videoId}/playlist.m3u8`,
        mp4Url:        `https://${this.cdnHostname}/${videoId}/video.mp4`,
        directPlayUrl: `https://player.mediadelivery.net/play/${this.libraryId}/${videoId}`,
        thumbnailUrl:  `https://${this.cdnHostname}/${videoId}/thumbnail.jpg`,
        status:        isReady ? "ready" : "processing",
      };
    } catch (error) {
      console.error("❌ Video Upload Error:", error.response?.data || error.message);
      throw new Error("Video upload failed");
    }
  }

  // ─── Upload image ────────────────────────────────────────────────────────
  async uploadImage(fileBuffer, fileName, mimeType) {
    try {
      console.log("\n📸 Uploading image:", fileName);
      const safeName   = `${Date.now()}_${fileName.replace(/\s+/g, "_")}`;
      const storageUrl = `https://storage.bunnycdn.com/${this.storageZone}/${safeName}`;

      await axios.put(storageUrl, fileBuffer, {
        headers: {
          AccessKey: this.storagePassword,
          "Content-Type": mimeType,
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      });

      const imageUrl = `https://${this.storageZone}.b-cdn.net/${safeName}`;
      console.log("✅ Image uploaded:", imageUrl);
      return { url: imageUrl, publicId: safeName };
    } catch (error) {
      console.error("❌ Image Upload Error:", error.response?.data || error.message);
      throw new Error("Image upload failed");
    }
  }

  // ─── Delete video ────────────────────────────────────────────────────────
  async deleteVideo(videoId) {
    try {
      await axios.delete(`${this.baseUrl}/videos/${videoId}`, {
        headers: { AccessKey: this.videoApiKey },
      });
      console.log("🗑️ Video deleted:", videoId);
    } catch (error) {
      console.error("❌ Delete video error:", error.message);
    }
  }

  // ─── Delete image ────────────────────────────────────────────────────────
  async deleteImage(publicId) {
    try {
      const url = `https://storage.bunnycdn.com/${this.storageZone}/${publicId}`;
      await axios.delete(url, {
        headers: { AccessKey: this.storagePassword },
      });
      console.log("🗑️ Image deleted:", publicId);
    } catch (error) {
      console.error("❌ Delete image error:", error.message);
    }
  }
}

module.exports = new BunnyCdnService();