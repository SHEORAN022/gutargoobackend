// // const jwt = require("jsonwebtoken");

// // exports.auth = (req, res, next) => {
// //   const header = req.headers.authorization;

// //   if (!header || !header.startsWith("Bearer ")) {
// //     return res.status(401).json({ error: "No token" });
// //   }

// //   const token = header.split(" ")[1];

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = decoded;
// //     next();
// //   } catch {
// //     res.status(401).json({ error: "Invalid token" });
// //   }
// // };

// // exports.requireAdmin = (req, res, next) => {
// //   if (req.user.role !== "admin") {
// //     return res.status(403).json({ error: "Admin only" });
// //   }
// //   next();
// // };
// const jwt = require("jsonwebtoken");

// const auth = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) throw new Error();
    
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { id: decoded.id };
//     next();
//   } catch (error) {
//     res.status(401).json({ success: false, message: "Please authenticate" });
//   }
// };

// module.exports = { auth };
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new Error();
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Please authenticate" });
  }
};

const requireAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: "Admin access required" });
  }
};

module.exports = { auth, requireAdmin };