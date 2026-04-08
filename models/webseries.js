

const mongoose = require("mongoose");

// 🎬 Episode Schema
const episodeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  videoFile: {
    url: String,
    videoId: String,
    hlsUrl: String,
    mp4Url: String,
    directPlayUrl: String,
    thumbnailUrl: String,
    duration: Number,
    size: Number,
    status: {
      type: Number,
      default: 2, // 2 = processing, 4 = ready
    },
  },

  trailer: {
    url: String,
    videoId: String,
    hlsUrl: String,
    mp4Url: String,
    directPlayUrl: String,
    thumbnailUrl: String,
    duration: Number,
    size: Number,
    status: {
      type: Number,
      default: 2,
    },
  },

  thumbnail: {
    url: String,
    publicId: String,
  },

  episodeNumber: {
    type: Number,
    required: true,
  },

  releaseDate: {
    type: Date,
    required: true,
  },

  isPublished: {
    type: Boolean,
    default: true,
  },
});

// 📺 Season Schema
const seasonSchema = new mongoose.Schema({
  seasonNumber: {
    type: Number,
    required: true,
  },

  title: String,

  releaseDate: Date,

  episodes: [episodeSchema],
});

// 🎥 WebSeries Schema
const webseriesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    genre: [String],

    // 🎬 Trailer (WebSeries level)
    trailer: {
      url: String,
      videoId: String,
      hlsUrl: String,
      mp4Url: String,
      directPlayUrl: String,
      thumbnailUrl: String,
      duration: Number,
      size: Number,
      status: {
        type: Number,
        default: 2,
      },
    },

    // 🖼️ Images
    thumbnail: {
      url: String,
      publicId: String,
    },

    banner: {
      url: String,
      publicId: String,
    },

    lang: {
      type: String,
      default: "Hindi",
    },

    releaseDate: Date,

    // 🎭 Cast & Crew
    castAndCrew: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CastAndCrew",
      },
    ],

    // 📂 Category
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // 📺 Seasons
    seasons: [seasonSchema],

    // 📊 Stats
    totalSeasons: {
      type: Number,
      default: 0,
    },

    totalEpisodes: {
      type: Number,
      default: 0,
    },

    // ⚙️ Settings
    isPublished: {
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

module.exports = mongoose.model("WebSeries", webseriesSchema);