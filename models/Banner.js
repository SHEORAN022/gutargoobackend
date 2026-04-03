// const mongoose = require("mongoose");

// const bannerSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       default: "",
//       trim: true,
//     },
//     imageUrl: {
//       type: String,
//       required: true,
//     },
//     categoryId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     categoryName: {
//       type: String,
//       required: true,
//     },
//     link: {
//       type: String,
//       default: "",
//     },
//     order: {
//       type: Number,
//       default: 0,
//     },
//     isActive: {
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

// // Indexes
// bannerSchema.index({ categoryId: 1, isActive: 1, order: 1 });

// module.exports = mongoose.model("Banner", bannerSchema);
const mongoose = require("mongoose");

/* ===== CAST SUB-SCHEMA ===== */
const castSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    character: {
      type: String,
      default: "",
      trim: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

/* ===== CREW SUB-SCHEMA ===== */
const crewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: [
        "Director",
        "Producer",
        "Writer",
        "Music Director",
        "Cinematographer",
        "Editor",
      ],
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

/* ===== MAIN SCHEMA ===== */
const bannerSchema = new mongoose.Schema(
  {
    // 🔹 BASIC INFO
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },

    // 🔹 IMAGES
    mobileImage: {
      type: String,
      default: "",
    },
    logoImage: {
      type: String,
      default: "",
    },

    // 🔹 CATEGORY
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

   

    // 🔹 CAST (Embedded)
    cast: {
      type: [castSchema],
      default: [],
    },

    // 🔹 CREW (Embedded)
    crew: {
      type: [crewSchema],
      default: [],
    },

    // 🔹 AGE LIMIT (Netflix style)
    ageLimit: {
      type: String,
      enum: ["U", "U/A 7+", "U/A 13+", "U/A 16+", "A"],
      default: "U",
    },
    // 🔹 MOVIE DETAILS
movieUrl: {
  type: String,
  default: "",
},

trailerUrl: {
  type: String,
  default: "",
},

// 🔹 GENRES
genres: {
  type: [String],
  default: [],
},

// 🔹 IMDB RATING
imdbRating: {
  type: Number,
  min: 0,
  max: 10,
  default: 0,
},

    // 🔹 WHERE VISIBLE
    visibleOn: {
      type: [String],
      enum: [
        "home",
        "originals",
        "movies",
        "tv_shows",
        "web_series",
        "short_movies",
      ],
      default: ["home"],
    },
    // 🔹 PUBLISH CONTROL
publishStatus: {
  type: Boolean,
  default: false,
},

publishDate: {
  type: Date,
  default: null,
},

    // 🔹 STATUS
    isActive: {
      type: Boolean,
      default: true,
    },

    // 🔹 CREATED BY
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Banner", bannerSchema);
