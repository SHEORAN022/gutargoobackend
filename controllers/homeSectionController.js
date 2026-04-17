

const HomeSection = require("../models/HomeSection");
const SectionItem = require("../models/SectionItem");
const Movie = require("../models/Movie"); // ensure correct path
const WebSeries = require("../models/webseries");

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
   🔥 GET SECTIONS (MOBILE - MIXED DATA)
============================================ */
// exports.getSectionsMobile = async (req, res) => {
//   try {
//     const sections = await HomeSection.find({})
//       .sort({ displayOrder: 1 })
//       .populate({
//         path: "sectionData.movies",
//         select: "_id horizontalBanner verticalPoster",
//       })
//       .populate({
//         path: "sectionData.webseries",
//         select: "_id horizontalBanner verticalPoster",
//       });

//     const finalData = sections.map(section => {

//       const movies = (section.sectionData.movies || []).map(item => ({
//         _id: item._id,
//         type: "movie",
//         horizontalBanner: item.horizontalBanner || {},
//         verticalPoster: item.verticalPoster || {}
//       }));

//       const webseries = (section.sectionData.webseries || []).map(item => ({
//         _id: item._id,
//         type: "webseries",
//         horizontalBanner: item.horizontalBanner || {},
//         verticalPoster: item.verticalPoster || {}
//       }));

//       const sectionData = [...movies, ...webseries];

//       return {
//         _id: section._id,
//         title: section.title,
//         displayStyle: section.displayStyle,
//         sectionData
//       };
//     });

//     res.json({
//       success: true,
//       data: finalData,
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };
exports.getSectionsMobile = async (req, res) => {
  try {
    const sections = await HomeSection.find({})
      .sort({ displayOrder: 1 })
      .populate("sectionData.movies", "_id")
      .populate("sectionData.webseries", "_id");

    const finalData = sections.map(section => {

      // 🎬 Movies
      const movies = (section.sectionData.movies || []).map(item => ({
        _id: item._id,
        type: "movie"
      }));

      // 📺 WebSeries
      const webseries = (section.sectionData.webseries || []).map(item => ({
        _id: item._id,
        type: "webseries"
      }));

      // 🔥 COMBINE
      const sectionData = [...movies, ...webseries];

      return {
        _id: section._id,
        title: section.title,
        displayStyle: section.displayStyle,
        sectionData
      };
    });

    res.json({
      success: true,
      data: finalData,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/* ============================================
   🔥 GET SINGLE SECTION
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
   🔥 UPDATE SECTION
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
   🔥 DELETE SECTION
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
   🔥 REORDER SECTIONS
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
   🔥 HOME API (USER SIDE - FINAL CLEAN)
============================================ */
exports.getHomeSections = async (req, res) => {
  try {
    const sections = await HomeSection.find({ isActive: true })
      .sort({ displayOrder: 1 })
      .populate("sectionData.movies")
      .populate("sectionData.webseries");

    const finalData = sections.map(section => {

      const movies = (section.sectionData.movies || []).map(item => ({
        ...item.toObject(),
        type: "movie"
      }));

      const webseries = (section.sectionData.webseries || []).map(item => ({
        ...item.toObject(),
        type: "webseries"
      }));

      const items = [...movies, ...webseries];

      return {
        title: section.title,
        displayStyle: section.displayStyle,
        sectionData: items
      };
    });

    res.json({
      success: true,
      data: finalData,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
