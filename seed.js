const User = require("./models/User");

(async () => {
  try {
    const admin = await User.findOne({ email: "admin@gmail.com" });

    if (!admin) {
      await User.create({
        name: "Admin",
        email: "admin@gmail.com",
        password: "123456",
        role: "admin",
      });

      console.log("✅ Admin created: admin@gmail.com / 123456");
    }
  } catch (err) {
    console.log("Seed error:", err.message);
  }
})();