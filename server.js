require("dotenv").config(); // Load .env file contents into process.env
const express = require("express");
const connectDB = require("./config/db");
const appConfig = require("./config/app");
const passport = require("./config/passport");
const mongoose = require("mongoose");
const { loginRoutes, reportRoutes } = require("./routes");

const app = express();

// Apply global configurations
appConfig(app);

// Connect to the database
connectDB();

// Initialize Passport.js for authentication
app.use(passport.initialize());

app.use("/", loginRoutes);
app.use("/report", reportRoutes);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port", process.env.PORT || 5000);
});

// Gracefully handle shutdown of mongoDB connection when app crashes
process.on("SIGINT", async () => {
  try {
    console.log("\nShutting down gracefully...");
    await mongoose.connection.close(); // Close the MongoDB connection
    console.log("MongoDB connection closed");
    server.close(() => {
      console.log("HTTP server closed");
      process.exit(0); // Exit the process successfully
    });
  } catch (error) {
    console.error("Error during shutdown:", error.message);
    process.exit(1); // Exit with failure
  }
});
