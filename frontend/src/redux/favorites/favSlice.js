import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  items: [],
};

const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    setFav: (state, action) => {
      state.items = action.payload; // Set cart items from API
      // console.log(action.payload)
    },
    addToFavs: (state, action) => {
      try {
        const existingItem = state.items.find(item => (item._id === action.payload._id));
        if (existingItem) {
          // toast.error(`Number: ${existingItem.number} is already in the cart!`); // Show error toast
        } else {
          state.items.push(action.payload);
          toast.success(`Number: ${action.payload.number} added to the Favorites!`); // Show success toast
        }
      }catch(e){
        console.log(e);
      }
    },
    removeFromFavs: (state, action) => {
      state.items = state.items.filter((item) => (item._id !== action.payload));
    },
    clearFavs: (state) => {
      state.items = [];
    },
  },
});

export const { setFav, addToFavs, removeFromFavs, clearFavs } = favSlice.actions;
export default favSlice.reducer;
