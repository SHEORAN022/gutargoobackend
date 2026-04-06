




// const mongoose = require("mongoose");

// const bannerSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },

//     description: {
//       type: String,
//       default: "",
//     },

//     logoImage: {
//       url: String,
//       publicId: String,
//     },

//     bannerImage: {
//       url: String,
//       publicId: String,
//     },

//     // 🔥 CATEGORY
//     categoryId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },

//     // 🔥 SINGLE MOVIE ONLY
//     movieId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Movie",
//       default: null,
//     },

//     displayOrder: {
//       type: Number,
//       default: 0,
//     },

//     visibleOn: {
//       type: String,
//       enum: ["home", "category", "movie", "all"],
//       default: "home",
//     },

//     publishStatus: {
//       type: Boolean,
//       default: true,
//     },

//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// // indexes
// bannerSchema.index({ publishStatus: 1, displayOrder: 1 });
// bannerSchema.index({ categoryId: 1 });
// bannerSchema.index({ movieId: 1 });

// module.exports = mongoose.model("Banner", bannerSchema);





const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Banner title is required"],
      trim: true,
    },
    bannerImage: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
    logoImage: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);