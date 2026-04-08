 
const mongoose = require("mongoose");

 const episodeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description: String,
    videoUrl:{
        type: String,
        required: true,
    },
    trailerUrl:{
        type: String,
    },
    thumbnail: true,
    episodeNumber: {
        type: Number,
        required: true,
    },
    releaseDate:{
        type: Date,
        required: true,
    },
    isPublished:{
        type: Boolean,
        default: true,
    },

 });
 const seasonSchema = new mongoose.schema({
    seasonNumber:{
        type: Number,
        required: true,
    },
    title: string,
    releaseDate:{
        type: Date,
    
    },
    episodes:[episodeSchema],
 });
 const webseriesSchema = new mongoose.schema({
    title:{
        type: string,
        required: true,
    },
    description: String,
     genre:[String],
     trailerUrl:{
        type: String,
     },
     thumbnail: String,
    banner: String,
    Lang: String,
    releaseDate: {
        type: date,
    },
    castAndCrew:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CastAndCrew",
        },
    ],
    seasons:[seasonSchema],

    Category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },

    totalSeasons:{
        type: Number,
        default:0,
    },
    totalEpisodes:{
        type: Number,
        default:0,

    },
    isPublished:{
        type: Boolean,
        default: true,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

     
 },{timestamps: true}
);