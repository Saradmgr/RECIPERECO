import { createSlice } from "@reduxjs/toolkit";
import { savedRecipe } from "../../services/Allproduct";

const savedRecipeSlice = createSlice({
  name: "saved",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(savedRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(savedRecipe.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(savedRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default savedRecipeSlice.reducer;
