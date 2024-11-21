import { createSlice } from "@reduxjs/toolkit";
const initialState={
    loading: false,
    data:[],
};
const favourite=createSlice({
    name: "favourite",
    initialState,
    reducers:{
        updateCart:(state,action)=>{
            state.loading =true;
            state.data=action.payload;
        },
        setDataLoading:(state,action)=>{
            state.loading=action.payload;
        },
    },
});
export const {updateCart, setDataLoading,sendData}=favourite.actions;
export default favourite.reducer;