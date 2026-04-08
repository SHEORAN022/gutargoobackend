const HomeSection = require("../models/HomeSection");
const SectionItem = require("../models/SectionItem");
const WebSeries = require("../models/webseries");






/* 🔥 MODEL PICKER */
const getModel = (type) => {
  switch (type) {
    case "movies":
      return Movies;
  
    case "webseries":
      return WebSeries;
    default:
      return Movies;
  }
};

/* ============================================
   🔥 CREATE SECTION
============================================ */
exports.createSection = async (req, res) => {
  try {
    const section = await HomeSection.create(req.body);

    res.status(201).json({
      success: true,
      message: "Section created",
      data: section,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ============================================
   🔥 GET ALL SECTIONS (ADMIN)
============================================ */
exports.getSections = async (req, res) => {
  try {
    const sections = await HomeSection.find({})
      .sort({ displayOrder: 1 });

    res.json({
      success: true,
      data: sections,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ============================================
   🔥 GET SINGLE
============================================ */
exports.getSectionById = async (req, res) => {
  try {
    const section = await HomeSection.findById(req.params.id);

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json({
      success: true,
      data: section,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ============================================
   🔥 UPDATE
============================================ */
exports.updateSection = async (req, res) => {
  try {
    const section = await HomeSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json({
      success: true,
      message: "Section updated",
      data: section,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ============================================
   🔥 DELETE
============================================ */
exports.deleteSection = async (req, res) => {
  try {
    await SectionItem.deleteMany({ sectionId: req.params.id });

    const section = await HomeSection.findByIdAndDelete(req.params.id);

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json({
      success: true,
      message: "Section deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ============================================
   🔥 TOGGLE ACTIVE
============================================ */
exports.toggleSection = async (req, res) => {
  try {
    const section = await HomeSection.findById(req.params.id);

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    section.isActive = !section.isActive;
    await section.save();

    res.json({
      success: true,
      message: "Status updated",
      data: section,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ============================================
   🔥 REORDER (DRAG DROP)
============================================ */
exports.reorderSections = async (req, res) => {
  try {
    const { ids } = req.body;

    for (let i = 0; i < ids.length; i++) {
      await HomeSection.findByIdAndUpdate(ids[i], {
        displayOrder: i,
      });
    }

    res.json({
      success: true,
      message: "Reordered successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ============================================
   🔥 MAIN HOME API (USER SIDE)
============================================ */
exports.getHomeSections = async (req, res) => {
  try {
    const sections = await HomeSection.find({ isActive: true })
      .sort({ displayOrder: 1 })
      .lean();

    const finalData = [];

    for (let section of sections) {
      let items = [];

      /* ===============================
         🔥 ADMIN SELECTED
      =============================== */
      if (section.contentSource === "admin_selected") {
          movies = await Movie.find(query)
    .sort(sort)
    .limit(limit)
    .lean();

  webseries = await WebSeries.find(query)
    .sort(sort)
    .limit(limit)
    .lean();
        const manualItems = await SectionItem.find({
          sectionId: section._id,
        }).sort({ displayOrder: 1 });

        for (let i = 0; i < manualItems.length; i++) {
          const Model = getModel(manualItems[i].contentType);

          const data = await Model.findById(
            manualItems[i].contentId
          ).lean();

          if (data) {
            items.push({
              ...data,
              rank:
                section.displayStyle === "index_vertical"
                  ? i + 1
                  : undefined,
            });
          }
        }
      }

      /* ===============================
         🔥 AUTO DATA
      =============================== */
      else {
        const Model = getModel(section.contentType);

        let query = { isPublished: true };

        if (section.categoryId) {
          query.categoryId = section.categoryId;
        }

        if (section.isOriginalOnly) {
          query.isOriginal = true;
        }

        let sort = {};

        if (section.sortConfig?.field) {
          sort[section.sortConfig.field] =
            section.sortConfig.order === "asc" ? 1 : -1;
        } else {
          sort = { views: -1 };
        }

        let limit =
          section.displayStyle === "index_vertical"
            ? 10
            : section.itemLimit;

        let data = await Model.find(query)
          .sort(sort)
          .limit(limit)
          .lean();

        items = data.map((item, index) => ({
          ...item,
          rank:
            section.displayStyle === "index_vertical"
              ? index + 1
              : undefined,
        }));
      }

      /* 🔥 FINAL STRUCTURE FIX */
      finalData.push({
        title: section.title,
        type: section.sectionType,
        movies: items,
         webseries: webseries,
      });
    }

    res.json({
      success: true,
      data: finalData,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
// exports.getHomeSections = async (req, res) => {
//   try {
//     const sections = await HomeSection.find({ isActive: true })
//       .sort({ displayOrder: 1 })
//       .lean();

//     const finalData = [];

//     for (let section of sections) {
//       let items = [];

//       /* ===============================
//          🔥 ADMIN SELECTED
//       =============================== */
//       if (section.contentSource === "admin_selected") {
//         const manualItems = await SectionItem.find({
//           sectionId: section._id,
//         }).sort({ displayOrder: 1 });

//         for (let i = 0; i < manualItems.length; i++) {
//           const Model = getModel(manualItems[i].contentType);

//           const data = await Model.findById(
//             manualItems[i].contentId
//           ).lean();

//           if (data) {
//             items.push({
//               ...data,
//               rank:
//                 section.displayStyle === "index_vertical"
//                   ? i + 1
//                   : undefined,
//             });
//           }
//         }
//       }

//       /* ===============================
//          🔥 AUTO DATA
//       =============================== */
//       else {
//         const Model = getModel(section.contentType);

//         let query = { isPublished: true };

//         if (section.categoryId) {
//           query.categoryId = section.categoryId;
//         }

//         if (section.isOriginalOnly) {
//           query.isOriginal = true;
//         }

//         let sort = {};

//         if (section.sortConfig?.field) {
//           sort[section.sortConfig.field] =
//             section.sortConfig.order === "asc" ? 1 : -1;
//         } else {
//           sort = { views: -1 };
//         }

//         let limit =
//           section.displayStyle === "index_vertical"
//             ? 10
//             : section.itemLimit;

//         let data = await Model.find(query)
//           .sort(sort)
//           .limit(limit)
//           .lean();

//         items = data.map((item, index) => ({
//           ...item,
//           rank:
//             section.displayStyle === "index_vertical"
//               ? index + 1
//               : undefined,
//         }));
//       }

//       // finalData.push({
//       //   ...section,
//       //   items,
//       // });
//       finalData.push({
//   title: section.title,
//   type: section.sectionType,
//   movies: items, // rename items → movies
// });
//     }

//     res.json({
//       success: true,
//       data: finalData,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };
