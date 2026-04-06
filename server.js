
// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const mongoose = require("mongoose");

// dotenv.config();

// const app = express();

// app.use(express.json({ limit: "5gb" }));
// app.use(express.urlencoded({ extended: true, limit: "5gb" }));
// app.use(cors({ origin: "*", credentials: true }));

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.error("❌ MongoDB Error:", err));

// // Routes
// const movieRoutes = require("./routes/movieRoutes");
// const authRoutes = require("./routes/auth");
// const publicRoutes = require("./routes/publicRoutes");
// const categoryRoutes = require("./routes/categoryRoutes");
// const bannerRoutes = require("./routes/bannerRoutes");
// const subCategoryRoutes = require("./routes/subCategoryRoutes");
// const bannerPublicRoutes = require("./routes/bannerPublicRoutes");
// const homeSectionRoutes = require("./routes/homeSectionRoutes");

// app.use("/api/auth", authRoutes);
// app.use("/api/movies", movieRoutes);
// app.use("/api/public", publicRoutes);
// app.use("/api/category", categoryRoutes); 
// app.use("/api/banners", bannerRoutes); 
// app.use("/api/subCategory", subCategoryRoutes);
// app.use("/api/public/banner", bannerPublicRoutes);
// app.use("/api", homeSectionRoutes);
// const publicCategoryRoutes = require("./routes/publicCategoryRoutes");

// app.use("/api/public", publicCategoryRoutes);
// const publicSectionRoutes = require("./routes/publicSectionRoutes");

// app.use("/api/public", publicSectionRoutes);
// // Health Check
// app.get("/api/health", (req, res) => {
//   res.json({ success: true, message: "Server is running" });
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`🔥 Server running on http://localhost:${PORT}`);
//   console.log(`📡 Public API: http://localhost:${PORT}/api/public/movies`);
// });




const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use(express.json({ limit: "5gb" }));
app.use(express.urlencoded({ extended: true, limit: "5gb" }));
app.use(cors({ origin: "*", credentials: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Routes
const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/auth");
const publicRoutes = require("./routes/publicRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const bannerPublicRoutes = require("./routes/bannerPublicRoutes");
const homeSectionRoutes = require("./routes/homeSectionRoutes");
const sectionItemRoutes = require("./routes/sectionItemRoutes");
const casetAndCrewRoutes = require("./routes/castAndCrew")

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/category", categoryRoutes); 
app.use("/api/banners", bannerRoutes); 
app.use("/api/subCategory", subCategoryRoutes);
app.use("/api/public/banner", bannerPublicRoutes);
app.use("/api/admin", homeSectionRoutes);
app.use("/api/admin/section-items", sectionItemRoutes);
app.use("/api/castAndCrew",casetAndCrewRoutes)
const publicSectionRoutes = require("./routes/publicSectionRoutes");

app.use("/api/public", publicSectionRoutes);
const publicCategoryRoutes = require("./routes/publicCategoryRoutes");

app.use("/api/public", publicCategoryRoutes);
// Health Check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
  console.log(`📡 Public API: http://localhost:${PORT}/api/public/movies`);
});
