import { createSlice } from '@reduxjs/toolkit';

const numberSlice = createSlice({
  name: 'numbers',
  initialState: { value: [], originalValue: [] , featured: []}, // Store both filtered and original numbers
  reducers: {
    setNumbers: (state, action) => {
      state.value = action.payload;
    },
    setFeaturedNumbers: (state, action) => {
      state.featured = action.payload;
    },
    setOriginalNumbers: (state, action) => {
      state.value = action.payload;
      state.originalValue = action.payload; // Save original numbers
    },
  },
});

export const { setNumbers, setOriginalNumbers, setFeaturedNumbers } = numberSlice.actions;
export default numberSlice.reducer;
