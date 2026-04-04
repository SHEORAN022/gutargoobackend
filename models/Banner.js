// const mongoose = require("mongoose");

// const bannerSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },

//     logoImage: {
//       url: String,
//       publicId: String,
//     },

//     bannerImage: {
//       url: String,
//       publicId: String,
//     },

//     // 🔥 CATEGORY LINK
//     categoryId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },

//     publishStatus: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Banner", bannerSchema);
// models/Banner.js
const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    
    description: {
      type: String,
      default: "",
    },

    logoImage: {
      url: String,
      publicId: String,
    },

    bannerImage: {
      url: String,
      publicId: String,
    },

    // 🔥 CATEGORY LINK
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // 🔥 MOVIE LINK (New field for single movie selection)
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      default: null,
    },

    // 🔥 MOVIES LIST (Multiple movies for carousel/featured section)
    moviesList: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    }],

    // Banner type: "single_movie" | "category_movies" | "custom_list"
    bannerType: {
      type: String,
      enum: ["single_movie", "category_movies", "custom_list"],
      default: "category_movies",
    },

    // Display settings
    displayOrder: {
      type: Number,
      default: 0,
    },

    visibleOn: {
      type: String,
      enum: ["home", "category", "movie", "all"],
      default: "home",
    },

    publishStatus: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Index for better query performance
bannerSchema.index({ publishStatus: 1, displayOrder: 1 });
bannerSchema.index({ categoryId: 1 });
bannerSchema.index({ movieId: 1 });

module.exports = mongoose.model("Banner", bannerSchema);