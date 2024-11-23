import dotenv from "dotenv";
import { Recipe } from "../models/recipeModels.js";

dotenv.config();

export const allrecipe = async (request, response) => {
  try {
    // Fetch the first 10 users
    const recipe = await Recipe.find({}).limit(20);

    return response.status(200).json({
      count: recipe.length,
      data: recipe,
    });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};

export const recipebyid = async (request, response) => {
  try {
    const { id } = request.params;
    const recipe = await Recipe.findById(id);
    return response.status(200).json({ data: recipe }); // Wrap recipe in a 'data' field
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};

const cosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce(
    (sum, value, index) => sum + value * vecB[index],
    0
  );
  const magnitudeA = Math.sqrt(
    vecA.reduce((sum, value) => sum + value * value, 0)
  );
  const magnitudeB = Math.sqrt(
    vecB.reduce((sum, value) => sum + value * value, 0)
  );

  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
};

// Fetch recipe details by ID and get recommendations
export const getRecommendations = async (req, res) => {
  try {
    const { id } = req.params; // Get the recipe ID from the URL parameters
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const targetVector = recipe.vector;

    // Fetch all recipes to compute cosine similarity
    const allRecipes = await Recipe.find();

    // Calculate similarity and sort recipes
    const recommendations = allRecipes
      .filter((r) => r._id.toString() !== id && r.vector) // Exclude current recipe
      .map((r) => ({
        ...r._doc,
        similarityScore: cosineSimilarity(targetVector, r.vector),
      }))
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, 10); // Top 5 recommendations

    res.status(200).json({ recommendations });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to calculate vectors for all recipes
export const calculateAndUpdateVectors = async (req, res) => {
  try {
    const recipes = await Recipe.find();

    // Collect unique ingredients across all recipes
    const uniqueIngredients = new Set();

    recipes.forEach((recipe) => {
      const ingredients = recipe.CleanedIngredients.split(","); // Assuming comma-separated
      ingredients.forEach((ingredient) =>
        uniqueIngredients.add(ingredient.trim())
      );
    });

    const uniqueIngredientsArray = Array.from(uniqueIngredients);

    // Update each recipe with its vector
    await Promise.all(
      recipes.map(async (recipe) => {
        const ingredients = recipe.CleanedIngredients.split(",");
        const vector = uniqueIngredientsArray.map((ingredient) =>
          ingredients.includes(ingredient.trim()) ? 1 : 0
        );

        recipe.vector = vector;
        await recipe.save();
      })
    );

    res
      .status(200)
      .json({ message: "Vectors calculated and updated successfully" });
  } catch (error) {
    console.error("Error calculating vectors:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const searchRecipesByName = async (req, res) => {
  try {
    const { name } = req.query; // Get the search term from query parameters
    const limit = 20; // Set the limit for results

    if (!name) {
      return res.status(400).json({ message: "Search term is required" });
    }

    // Use regex for a case-insensitive search and limit results
    const recipes = await Recipe.find({
      RecipeName: { $regex: name, $options: "i" },
    }).limit(limit);

    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error searching recipes:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const allrecipeadmin = async (request, response) => {
  try {
    // Fetch the first 100 recipes and sort them alphabetically by RecipeName
    const recipe = await Recipe.find({}).sort({ RecipeName: 1 });

    return response.status(200).json({
      count: recipe.length,
      data: recipe,
    });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};

export const deleteRecipeAdmin = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Recipe.findByIdAndDelete(id);
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
export const allrecipeadminlength = async (request, response) => {
  try {
    // Fetch the first 100 recipe
    const recipe = await Recipe.find({});

    return response.status(200).json({
      count: recipe.length,
    });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};

// Function to add a new recipe
export const addRecipe = async (req, res) => {
  try {
    const {
      RecipeName,
      Ingredients,
      TotalTimeInMins,
      Cuisine,
      Instructions,
      CleanedIngredients,
      imageurl,
      Ingredientcount,
    } = req.body;

    // Validate input data
    if (
      !RecipeName ||
      !Ingredients ||
      !TotalTimeInMins ||
      !Cuisine ||
      !Instructions ||
      !CleanedIngredients ||
      !imageurl ||
      !Ingredientcount
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new Recipe document
    const newRecipe = new Recipe({
      RecipeName,
      Ingredients,
      TotalTimeInMins,
      Cuisine,
      Instructions,
      CleanedIngredients,
      imageurl,
      Ingredientcount,
    });

    // Calculate vector for the recipe (vector is based on CleanedIngredients)
    const ingredientsArray = CleanedIngredients.split(",");
    const uniqueIngredients = await Recipe.distinct("CleanedIngredients");
    const vector = uniqueIngredients.map((ingredient) =>
      ingredientsArray.includes(ingredient.trim()) ? 1 : 0
    );

    // Set the vector for the recipe
    newRecipe.vector = vector;

    // Save the recipe to the database
    await newRecipe.save();

    return res
      .status(201)
      .json({ message: "Recipe added successfully", data: newRecipe });
  } catch (error) {
    console.error("Error adding recipe:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
