exports.getDashboard = (req, res) => {
  res.json({
    message: "Welcome to Dashboard 🚀",
    user: req.user,
  });
};