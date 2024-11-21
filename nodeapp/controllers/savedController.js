import { Saved } from "../models/savedModel.js";

import dotenv from "dotenv";
dotenv.config();

export const recipeSaved = async (request, response) => {
  try {
    console.log(request.body); // Debug: Check incoming data
    const { recipeId, userId } = request.body;

    // Ensure both fields are provided
    if (!recipeId || !userId) {
      return response
        .status(400)
        .json({ message: "Both recipeId and userId are required." });
    }

    const newSavedRecipe = { recipeId, userId };
    const saved = await Saved.create(newSavedRecipe);
    return response.status(201).json({
      success: true,
      message: "Recipe saved successfully",
      data: saved,
    });
  } catch (error) {
    console.error(error); // Log detailed error
    return response.status(500).send({ message: error.message });
  }
};
export const allSaved = async (request, response) => {
  try {
    // Extract userId from the request body
    const { userId } = request.body;

    if (!userId) {
      return response
        .status(400)
        .json({ message: "User ID is required to fetch saved recipes." });
    }

    // Fetch saved recipes for the logged-in user
    const savedRecipes = await Saved.find({ userId })
      .populate("userId", "name") // Populate user details
      .populate(
        "recipeId",
        "RecipeName Ingredients TotalTimeInMins Cuisine Instructions CleanedIngredients imageurl Ingredientcount vector"
      ); // Populate specific recipe fields

    if (savedRecipes.length === 0) {
      return response.status(404).json({
        message: "No saved recipes found for this user.",
      });
    }

    return response.status(200).json({
      count: savedRecipes.length,
      data: savedRecipes,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return response.status(500).send({ message: error.message });
  }
};
export const deleteSavedRecipe = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Saved.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "Recipe not Found" });
    }
    return response
      .status(200)
      .send({ message: "Recipe deleted successfully" });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};
