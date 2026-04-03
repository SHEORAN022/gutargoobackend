const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://techinfyle_db_user:3grYyIUbbS51srTg@cluster0.hrlhfsm.mongodb.net/movie_db?retryWrites=true&w=majority";

async function publishMovies() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");
    
    // Sab movies publish kar do
    const result = await mongoose.connection.db.collection("movies").updateMany(
      {},
      { $set: { publishStatus: true, publishDate: new Date() } }
    );
    
    console.log(`✅ ${result.modifiedCount} movies published successfully!\n`);
    
    // Check karo
    const movies = await mongoose.connection.db.collection("movies").find({}).toArray();
    console.log("📊 Your Movies Now:");
    movies.forEach(m => {
      console.log(`   - ${m.movieTitle}: Published ✅`);
    });
    
    await mongoose.disconnect();
    console.log("\n✅ Done! Now check: http://localhost:3001/api/public/movies");
    
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

publishMovies();