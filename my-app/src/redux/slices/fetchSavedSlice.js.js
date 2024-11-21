import { createSlice } from "@reduxjs/toolkit";
import { fetchsavedRecipe } from "../../services/Allproduct";
import { logout } from "./LoginSlices"; // Import the logout action

const initialState = {
  data: [], // Initialize data as an empty array
  loading: false,
  error: null,
};

const fetchSaved = createSlice({
  name: "fetchsaved",
  initialState,
  reducers: {
    // Add a new reducer for handling the deletion of a saved recipe
    deleteSavedRecipe(state, action) {
      state.data = state.data.filter((recipe) => recipe._id !== action.payload); // Remove the recipe by id
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchsavedRecipe.pending, (state) => {
        state.loading = true; // Set loading state to true when fetching
      })
      .addCase(fetchsavedRecipe.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.data) {
          state.data = action.payload.data; // Set data if present
        }
        state.error = null; // Clear any error if data is successfully fetched
      })
      .addCase(fetchsavedRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message; // Ensure we capture the error message correctly
      })
      .addCase(logout, (state) => {
        state.data = []; // Clear saved recipes data upon logout
        state.error = null; // Optionally reset the error state
      });
  },
});

export const { deleteSavedRecipe } = fetchSaved.actions; // Export the action so it can be dispatched

export default fetchSaved.reducer;
