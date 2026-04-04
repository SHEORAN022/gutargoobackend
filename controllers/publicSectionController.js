const HomeSection = require("../models/HomeSection");
const SectionItem = require("../models/SectionItem");

const Movie = require("../models/Movie");

/* 🔥 PUBLIC HOME SECTIONS */
exports.getPublicSections = async (req, res) => {
  try {
    const sections = await HomeSection.find({ isActive: true })
      .sort({ displayOrder: 1 })
      .lean();

    const finalData = [];

    for (const section of sections) {
      let items = [];

      /* ===============================
         🔥 ADMIN SELECTED
      =============================== */
      if (section.contentSource === "admin_selected") {
        const manualItems = await SectionItem.find({
          sectionId: section._id,
        })
          .sort({ displayOrder: 1 })
          .lean();

        for (let i = 0; i < manualItems.length; i++) {
          const data = await Movie.findById(
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
        let limit =
          section.displayStyle === "index_vertical"
            ? 10
            : section.itemLimit;

        const data = await Movie.find({
          publishStatus: true,
          publishDate: { $lte: new Date() },
        })
          .sort({ viewCount: -1 })
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

      finalData.push({
        ...section,
        items,
      });
    }

    res.json({
      success: true,
      data: finalData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};