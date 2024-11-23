import axios from "axios";
import React, { useState } from "react";

const AddNewRecipes = () => {
  const [formData, setFormData] = useState({
    RecipeName: "",
    Ingredients: "",
    TotalTimeInMins: "",
    Cuisine: "",
    Instructions: "",
    CleanedIngredients: "",
    imageurl: "",
    Ingredientcount: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send the form data to the backend
      const response = await axios.post(
        "http://localhost:5000/recipes/add", // Update with the correct endpoint
        formData
      );

      // Handle success response
      alert("Recipe added successfully!");
      setFormData({
        RecipeName: "",
        Ingredients: "",
        TotalTimeInMins: "",
        Cuisine: "",
        Instructions: "",
        CleanedIngredients: "",
        imageurl: "",
        Ingredientcount: "",
      });
    } catch (err) {
      // Handle error
      setError(err.response?.data?.message || "Something went wrong!");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Add New Recipe
      </h2>
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Recipe Name */}
          <div>
            <label
              htmlFor="RecipeName"
              className="block text-gray-700 font-medium mb-2"
            >
              Recipe Name
            </label>
            <input
              type="text"
              name="RecipeName"
              value={formData.RecipeName}
              onChange={handleChange}
              id="RecipeName"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Ingredients */}
          <div>
            <label
              htmlFor="Ingredients"
              className="block text-gray-700 font-medium mb-2"
            >
              Ingredients
            </label>
            <input
              type="text"
              name="Ingredients"
              value={formData.Ingredients}
              onChange={handleChange}
              id="Ingredients"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Total Time in Minutes */}
          <div>
            <label
              htmlFor="TotalTimeInMins"
              className="block text-gray-700 font-medium mb-2"
            >
              Total Time in Minutes
            </label>
            <input
              type="number"
              name="TotalTimeInMins"
              value={formData.TotalTimeInMins}
              onChange={handleChange}
              id="TotalTimeInMins"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Cuisine */}
          <div>
            <label
              htmlFor="Cuisine"
              className="block text-gray-700 font-medium mb-2"
            >
              Cuisine
            </label>
            <input
              type="text"
              name="Cuisine"
              value={formData.Cuisine}
              onChange={handleChange}
              id="Cuisine"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Instructions */}
          <div>
            <label
              htmlFor="Instructions"
              className="block text-gray-700 font-medium mb-2"
            >
              Instructions
            </label>
            <textarea
              name="Instructions"
              value={formData.Instructions}
              onChange={handleChange}
              id="Instructions"
              required
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Cleaned Ingredients */}
          <div>
            <label
              htmlFor="CleanedIngredients"
              className="block text-gray-700 font-medium mb-2"
            >
              Cleaned Ingredients
            </label>
            <input
              type="text"
              name="CleanedIngredients"
              value={formData.CleanedIngredients}
              onChange={handleChange}
              id="CleanedIngredients"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="imageurl"
              className="block text-gray-700 font-medium mb-2"
            >
              Image URL
            </label>
            <input
              type="text"
              name="imageurl"
              value={formData.imageurl}
              onChange={handleChange}
              id="imageurl"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Ingredient Count */}
          <div>
            <label
              htmlFor="Ingredientcount"
              className="block text-gray-700 font-medium mb-2"
            >
              Ingredient Count
            </label>
            <input
              type="number"
              name="Ingredientcount"
              value={formData.Ingredientcount}
              onChange={handleChange}
              id="Ingredientcount"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-6 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:bg-gray-400"
            >
              {loading ? "Adding..." : "Add Recipe"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewRecipes;
