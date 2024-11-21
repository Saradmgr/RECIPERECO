import mongoose from "mongoose";

const savedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Ensure 'User' matches the model name
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Recipe", // Ensure 'Recipe' matches the model name
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

const Saved = mongoose.model("Saved", savedSchema); // Register model
export { Saved };
