// const mongoose = require("mongoose");

// const sectionItemSchema = new mongoose.Schema(
//   {
//     sectionId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "HomeSection",
//       required: true,
//     },

//     contentType: {
//       type: String,
//       enum: ["movies", "web_series", "tv_shows", "short_movies"],
//       required: true,
//     },

//     contentId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//     },

//     displayOrder: {
//       type: Number,
//       default: 0,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("SectionItem", sectionItemSchema);


const mongoose = require("mongoose");

const sectionItemSchema = new mongoose.Schema(
  {
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HomeSection",
      required: true,
    },

    contentType: {
      type: String,
      enum: ["movies", "web_series", "tv_shows", "short_movies"],
      required: true,
    },
categoryId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Category"
},
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } //asdfasdfasdf
);

module.exports = mongoose.model("SectionItem", sectionItemSchema);
