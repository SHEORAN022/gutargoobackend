


const mongoose = require("mongoose");

// Episode Schema
const episodeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  episodeNumber: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  isPublished: { type: Boolean, default: true },
  videoFile: {
    url: String,
    thumbnailUrl: String,
    duration: Number,
    status: { type: Number, default: 2 }
  },
 
  skipIntro: {
    start: { type: Number, default: 0 },
    end: { type: Number, default: 0 }
  }
});

// Season Schema
const seasonSchema = new mongoose.Schema({
  seasonNumber: { type: Number, required: true },
  title: String,
  releaseDate: Date,
  episodes: [episodeSchema]
});

// Main WebSeries Schema
const webseriesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  genre: [String],
  lang: { type: String, default: "Hindi" },
  releaseDate: Date,
  isPublished: { type: Boolean, default: true },
  
  // Images
  thumbnail: { type: String },
  horizontalBanner: { type: String },
  verticalPoster: { type: String },
  
  // Trailer
  trailer: {
    url: String,
    videoId: String,
    thumbnailUrl: String
  },
  
  // Seasons
  seasons: [seasonSchema]
  
}, { timestamps: true });

module.exports = mongoose.model("WebSeries", webseriesSchema);
