import { createSlice } from "@reduxjs/toolkit";
const initialState={
    loading: false,
    data:[],
};
const addToCart=createSlice({
    name: "addToCart",
    initialState,
    reducers:{
        updateCard:(state,action)=>{
            state.loading =true;
            state.data=action.payload;
        },
        setDataLoading:(state,action)=>{
            state.loading=action.payload;
        },
    },
});
export const {updateCard, setDataLoading,sendData}=addToCart.actions;
export default addToCart.reducer;