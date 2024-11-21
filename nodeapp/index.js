import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import recipeRoute from "./routes/recipeRoute.js"; // Assuming you will use this
import savedRoute from "./routes/savedRoute.js";
import userRoute from "./routes/userRoute.js";

configDotenv(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your client URL
  credentials: true, // Allow credentials (cookies, auth headers, etc.)
};
app.use(cors(corsOptions));

// Basic route for testing
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to MERN stack");
});

// Add your routes
app.use("/user", userRoute);
app.use("/recipes", recipeRoute); // Example for recipe routes
app.use("/saved", savedRoute);

// MongoDB Connection
mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});
