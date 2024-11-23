import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRecipes = createAsyncThunk("api/allproducts", async () => {
  const response = await axios.get("http://localhost:5000/recipes");
  return response.data.data; // Assuming the data array is here
});
export const getRecipesAdmin = createAsyncThunk("api/allrecipe", async () => {
  const response = await axios.get("http://localhost:5000/recipes/admin");
  return response.data.data; // Assuming the data array is here
});
export const fetchSearchProducts = createAsyncThunk(
  "api/detailfetch",
  async (id) => {
    const response = await axios.get(`http://localhost:5000/recipes/${id}`);
    return response.data; // Assuming data.hits contains the recipes array
  }
);

export const fetchRecommendations = createAsyncThunk(
  "api/recommendations",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/recipes/${id}/recommendations`
    );
    return response.data.recommendations; // Assuming the response contains the recommendations array
  }
);
export const fetchRecipesByName = createAsyncThunk(
  "recipes/fetchByName",
  async (name) => {
    const response = await axios.get(
      `http://localhost:5000/recipes/search?name=${name}`
    );
    return response.data;
  }
);
export const registerUser = createAsyncThunk(
  "api/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/register",
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const savedRecipe = createAsyncThunk(
  "api/saved",
  async (savedData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/saved/bookmark",
        savedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchsavedRecipe = createAsyncThunk(
  "api/fetchsaved",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/saved/getsaved",
        {
          userId,
        }
      );
      console.log("API Response:", response.data); // Log the response to debug
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Add more error details
    }
  }
);

export default getRecipes;
