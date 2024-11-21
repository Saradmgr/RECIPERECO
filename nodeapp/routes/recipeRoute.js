import express from "express";
import {
  allrecipe,
  calculateAndUpdateVectors,
  getRecommendations,
  recipebyid,
  searchRecipesByName,
} from "../controllers/recipeController.js";
import { Recipe } from "../models/recipeModels.js";

const router = express.Router();

// Search recipes by name
router.get("/search", searchRecipesByName);

// Get all recipes
router.get("/", allrecipe);

// Get recipe by ID
router.get("/:id", recipebyid);

// Get recipe details and recommendations
router.get("/:id/recommendations", getRecommendations);
// Update vectors
router.post("/update-vectors", calculateAndUpdateVectors);

export default router;
