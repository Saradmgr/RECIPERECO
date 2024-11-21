// recipeModels.js
import mongoose from "mongoose";

// Define your schema
const recipeSchema = new mongoose.Schema({
  RecipeName: { type: String, required: true },
  Ingredients: { type: String, required: true },
  TotalTimeInMins: { type: Number, required: true },
  Cuisine: { type: String, required: true },
  Instructions: { type: String, required: true },
  CleanedIngredients: { type: String, required: true },
  imageurl: { type: String, required: true },
  Ingredientcount: { type: Number, required: true },
  vector: { type: [Number], default: [] },
});

// Register the model with mongoose
const Recipe = mongoose.model("Recipe", recipeSchema);

export { Recipe }; // Export the Recipe model for use in other files
