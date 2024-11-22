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
  reducers: {},
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
export default allRecipeSlices.reducer;
