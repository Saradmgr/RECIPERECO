import express from "express";
import {
  addRecipe,
  allrecipe,
  allrecipeadmin,
  allrecipeadminlength,
  calculateAndUpdateVectors,
  deleteRecipeAdmin,
  getRecommendations,
  recipebyid,
  searchRecipesByName,
} from "../controllers/recipeController.js";

const router = express.Router();

// Search recipes by name
router.get("/search", searchRecipesByName);

// Get all recipes
router.get("/", allrecipe);

// Get all recipes for admin
router.get("/admin", allrecipeadmin);

// Get recipe by ID
router.get("/:id", recipebyid);

// Get recipe details and recommendations
router.get("/:id/recommendations", getRecommendations);

// Update vectors
router.post("/update-vectors", calculateAndUpdateVectors);

// Add a new recipe (POST request to handle form submission from frontend)
router.post("/add", addRecipe); // Add this route

// Admin-specific routes
router.get("/admin/recipelength", allrecipeadminlength);
router.delete("/deleterecipe/:id", deleteRecipeAdmin);

export default router;
