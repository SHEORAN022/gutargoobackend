const mongoose = require("mongoose");

const homeSectionSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true,
      trim: true 
    },
sectionData: {
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
    webseries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WebSeries",
      },
    ],
    // tvshows: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "TvShow",
    //   },
    // ],
  },

    // sectionType: {
    //   type: String,
    //   enum: [
    //     "continue_watching",
    //     "trending_now",
    //     "latest_releases",
    //     "top_rated",
    //     "recommended",
    //     "category_based",
    //     "custom_collection",
    //   ],
    //   default: "trending_now",
    // },

   

    contentSource: {
      type: String,
      enum: [
        "auto",
        "most_viewed",
        "recently_added",
        "watch_time_based",
        "admin_selected",
      ],
      default: "auto",
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    displayStyle: {
      type: String,
      enum: [
        "horizontal_banner",
        "vertical_banner",
        "big_horizontal",
        "big_vertical",
        "index_horizontal",
        "index_vertical",
      ],
      default: "horizontal_banner",
    },

    // itemLimit: { 
    //   type: Number, 
    //   default: 20,
    //   min: 1,
    //   max: 100
    // },

    isActive: { 
      type: Boolean, 
      default: true 
    },

    isOriginalOnly: { 
      type: Boolean, 
      default: false 
    },

    // visibleTabs: [
    //   {
    //     type: String,
    //     enum: [
    //       "home",
    //       "originals",
    //       "movies",
    //       "tv_shows",
    //       "web_series",
    //       "short_movies",
    //     ],
    //   },
    // ],

    displayOrder: { 
      type: Number, 
      default: 0,
      index: true
    },

    trendingPeriodDays: { 
      type: Number, 
      default: 7 
    },

    sortConfig: {
      field: { 
        type: String, 
        default: "views" 
      },
      order: { 
        type: String, 
        enum: ["asc", "desc"], 
        default: "desc" 
      },
    },

    // 🔥 optional but useful
    metadata: {
      type: Object,
      default: {}
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomeSection", homeSectionSchema);
