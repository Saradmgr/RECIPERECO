import { createSlice } from "@reduxjs/toolkit";
import { getRecipesAdmin } from "../../services/Allproduct";
const initialState = {
  data: [],
  loading: false,
  error: null,
};

const allRecipeSlices = createSlice({
  name: "allrecipe",
  initialState,
  reducers: {
    deleteRecipe(state, action) {
      state.data = state.data.filter((recipe) => recipe._id !== action.payload); // Remove the recipe by id
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecipesAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecipesAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRecipesAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { deleteRecipe } = allRecipeSlices.actions;
export default allRecipeSlices.reducer;
