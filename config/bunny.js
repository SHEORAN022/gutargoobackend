// config/bunny.js
const axios = require("axios");

const LIBRARY_ID = "YOUR_LIBRARY_ID";
const API_KEY = "YOUR_API_KEY";

exports.createBunnyVideo = async (title) => {
  const res = await axios.post(
    `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos`,
    { title },
    {
      headers: {
        AccessKey: API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};
