// // const express = require("express");
// // const dotenv = require("dotenv");
// // const cors = require("cors");
// // const mongoose = require("mongoose");

// // dotenv.config();

// // const app = express();

// // // ✅ Middleware
// // app.use(express.json({ limit: "5gb" }));
// // app.use(express.urlencoded({ extended: true, limit: "5gb" }));

// // // ✅ CORS Configuration
// // app.use(cors({
// //   origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
// //   credentials: true,
// //   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
// //   allowedHeaders: ["Content-Type", "Authorization", "AccessKey"]
// // }));

// // // ✅ MongoDB Connection - Fixed options
// // mongoose.connect(process.env.MONGO_URI)
// // .then(() => console.log("✅ MongoDB Connected"))
// // .catch(err => console.error("❌ MongoDB Error:", err));

// // // ✅ Import Routes
// // const movieRoutes = require("./routes/movieRoutes");
// // const authRoutes = require("./routes/auth");
// // const dashboardRoutes = require("./routes/dashboard");
// // const categoryRoutes = require("./routes/category");

// // // ✅ Use Routes
// // app.use("/api/auth", authRoutes);
// // app.use("/api/dashboard", dashboardRoutes);
// // app.use("/api/category", categoryRoutes);
// // app.use("/api/movies", movieRoutes);

// // // ✅ Health Check
// // app.get("/api/health", (req, res) => {
// //   res.json({
// //     success: true,
// //     message: "Server is running",
// //     timestamp: new Date().toISOString(),
// //     mongodb: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
// //   });
// // });

// // // ✅ Test Route
// // app.get("/api/test", (req, res) => {
// //   res.json({ success: true, message: "API is working!" });
// // });

// // // ✅ 404 Handler
// // app.use((req, res) => {
// //   res.status(404).json({
// //     success: false,
// //     message: `Route not found: ${req.method} ${req.url}`
// //   });
// // });

// // // ✅ Error Handler
// // app.use((err, req, res, next) => {
// //   console.error("Error:", err);
// //   res.status(500).json({
// //     success: false,
// //     message: err.message || "Internal Server Error"
// //   });
// // });

// // const PORT = process.env.PORT || 3001;
// // app.listen(PORT, () => {
// //   console.log(`🔥 Server running on http://localhost:${PORT}`);
// //   console.log(`📡 API URL: http://localhost:${PORT}/api`);
// //   console.log(`🎬 Movies API: http://localhost:${PORT}/api/movies`);
// // });
// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const path = require("path");

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json({ limit: "5gb" }));
// app.use(express.urlencoded({ extended: true, limit: "5gb" }));
// app.use(cors({ origin: "*", credentials: true }));

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.error("❌ MongoDB Error:", err));

// // Import Routes
// const movieRoutes = require("./routes/movieRoutes");
// const authRoutes = require("./routes/auth");
// const publicRoutes = require("./routes/publicRoutes");

// // Use Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/movies", movieRoutes);      // Admin API - Login required
// app.use("/api/public", publicRoutes);      // Public API - No login required

// // Health Check
// app.get("/api/health", (req, res) => {
//   res.json({
//     success: true,
//     message: "Server is running",
//     timestamp: new Date().toISOString(),
//     mongodb: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
//   });
// });

// // Root Endpoint
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Movie API is running",
//     endpoints: {
//       public: "http://localhost:3001/api/public/movies",
//       admin: "http://localhost:3001/api/movies",
//       auth: "http://localhost:3001/api/auth"
//     }
//   });
// });

// // 404 Handler
// app.use((req, res) => {
//   res.status(404).json({ success: false, message: "Route not found" });
// });

// // Error Handler
// app.use((err, req, res, next) => {
//   console.error("Error:", err);
//   res.status(500).json({ success: false, message: err.message });
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`🔥 Server running on http://localhost:${PORT}`);
//   console.log(`📡 Public API: http://localhost:${PORT}/api/public/movies`);
//   console.log(`🔒 Admin API: http://localhost:${PORT}/api/movies`);
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

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/category", categoryRoutes); 
app.use("/api/banners", bannerRoutes); 
app.use("/api/subCategory", subCategoryRoutes);
app.use("/api/public/banner", bannerPublicRoutes);
app.use("/api", homeSectionRoutes);
const publicSectionRoutes = require("./routes/publicSectionRoutes");

app.use("/api/public", publicSectionRoutes);
// Health Check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
  console.log(`📡 Public API: http://localhost:${PORT}/api/public/movies`);
});
