const mongoose = require("mongoose");
const Movie = require("./models/Movie");

const MONGODB_URI = "mongodb+srv://techinfyle_db_user:3grYyIUbbS51srTg@cluster0.hrlhfsm.mongodb.net/movie_db?retryWrites=true&w=majority";

async function publishAllMovies() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");
    
    // Check current movies
    const allMovies = await Movie.find({});
    console.log(`📊 Total movies in database: ${allMovies.length}\n`);
    
    if (allMovies.length === 0) {
      console.log("⚠️ No movies found. Please create some movies first.\n");
      process.exit();
    }
    
    console.log("Current movies status:");
    allMovies.forEach(movie => {
      console.log(`   - ${movie.movieTitle}: ${movie.publishStatus ? "Published ✅" : "Draft ❌"}`);
    });
    
    // Publish all movies
    const result = await Movie.updateMany(
      {},
      { $set: { publishStatus: true, publishDate: new Date() } }
    );
    
    console.log(`\n✅ ${result.modifiedCount} movies published successfully!\n`);
    
    // Verify
    const publishedMovies = await Movie.find({ publishStatus: true });
    console.log("📊 Updated status:");
    publishedMovies.forEach(movie => {
      console.log(`   - ${movie.movieTitle}: Published ✅`);
    });
    
    console.log(`\n🎬 Total published movies: ${publishedMovies.length}`);
    console.log("✅ All done! Now check: http://localhost:3001/api/public/movies\n");
    
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

publishAllMovies();