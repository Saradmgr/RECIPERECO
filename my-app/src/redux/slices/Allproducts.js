import { createSlice } from "@reduxjs/toolkit";
import { getRecipes } from "../../services/Allproduct";
const initialState={
    data:[],
    loading: false,
    error:null,
    };
    
const allProducts=createSlice({
    name: "allproduct",
    initialState, 
    reducers:{},
   extraReducers: (builder)=>{
    builder
       .addCase(getRecipes.pending, (state)=>{
            state.loading=true;
        })
       .addCase(getRecipes.fulfilled, (state,action)=>{
            state.loading=false;
            state.data=action.payload;
        })
       .addCase(getRecipes.rejected, (state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
   }
});
export default allProducts.reducer;