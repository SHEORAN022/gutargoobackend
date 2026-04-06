
// const jwt = require("jsonwebtoken");

// const auth = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//     // if (!token) throw new Error();
    
//     // const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // req.user = { id: decoded.id, role: decoded.role };
//     next();
//   } catch (error) {
//     res.status(401).json({ success: false, message: "Please authenticate" });
//   }
// };

// const requireAdmin = async (req, res, next) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Admin access required" });
//     }
//     next();
//   } catch (error) {
//     res.status(403).json({ success: false, message: "Admin access required" });
//   }
// };

// module.exports = { auth, requireAdmin };

const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");

// ✅ AUTH (Login check)
const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    // ❌ No token
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = header.split(" ")[1];

    // 🔓 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔍 Get user from DB (fresh data)
    const user = await Customer.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 🔥 attach full user
    req.user = user;

    next();
  } catch (error) {
    console.log("❌ AUTH ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};



const requireAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }
};



const requireCustomer = (req, res, next) => {
  try {
    if (req.user.role !== "customer") {
      return res.status(403).json({
        success: false,
        message: "Customer access only",
      });
    }
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }
};




const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    next();
  };
};



module.exports = {
  auth,
  requireAdmin,
  requireCustomer,
  requireRole, // 🔥 best for scalable apps
};