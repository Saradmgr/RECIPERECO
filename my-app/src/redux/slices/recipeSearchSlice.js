import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchRecipesByName } from "../../services/Allproduct";

const initialState = {
  data: [],
  loading: false,
  error: null,
};
const recipeSearchSlice = createSlice({
  name: "recipeSearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipesByName.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipesByName.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Store fetched recipes
      })
      .addCase(fetchRecipesByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Store any errors
      });
  },
});

export default recipeSearchSlice.reducer;
