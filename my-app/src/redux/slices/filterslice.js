// filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkedValues: [],
  filteredData: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCheckedValues: (state, action) => {
      state.checkedValues = action.payload;
    },
    clearFilteredData: (state) => {
      state.filteredData = [];
    },
  },
});

export const { setCheckedValues, clearFilteredData } = filterSlice.actions;

export default filterSlice.reducer;
