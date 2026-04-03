// const SectionItem = require("../models/SectionItem");

// /* ============================================
//    🔥 ADD ITEM
// ============================================ */
// exports.addItem = async (req, res) => {
//   try {
//     const { sectionId, contentType, contentId } = req.body;

//     const item = await SectionItem.create({
//       sectionId,
//       contentType,
//       contentId,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Item added",
//       data: item,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// /* ============================================
//    🔥 GET ITEMS BY SECTION
// ============================================ */
// exports.getItemsBySection = async (req, res) => {
//   try {
//     const { sectionId } = req.params;

//     const items = await SectionItem.find({ sectionId })
//       .sort({ displayOrder: 1 });

//     res.json({
//       success: true,
//       data: items,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// /* ============================================
//    🔥 DELETE ITEM
// ============================================ */
// exports.deleteItem = async (req, res) => {
//   try {
//     const item = await SectionItem.findByIdAndDelete(req.params.id);

//     if (!item) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     res.json({
//       success: true,
//       message: "Item removed",
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// /* ============================================
//    🔥 REORDER ITEMS (DRAG DROP)
// ============================================ */
// exports.reorderItems = async (req, res) => {
//   try {
//     const { items } = req.body;
//     // items = [{ id, order }]

//     for (let i = 0; i < items.length; i++) {
//       await SectionItem.findByIdAndUpdate(items[i].id, {
//         displayOrder: items[i].order,
//       });
//     }

//     res.json({
//       success: true,
//       message: "Items reordered",
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


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
  { timestamps: true }
);

module.exports = mongoose.model("SectionItem", sectionItemSchema);
