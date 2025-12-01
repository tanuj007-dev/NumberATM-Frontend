import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { fbqTrack } from "../../components/utils/fbq";

const initialState = {
  items: [],
  totalPrice: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload.items; // Set cart items from API
      state.totalPrice = action.payload.totalPrice;
      // console.log(action.payload)
    },
    setPrice:(state, action)=>{
      state.totalPrice = action.payload
    },
    addToCart: (state, action) => {
      
      try {
        const existingItem = state.items.find(item => (item._id === action.payload._id));
        if (existingItem) {
          // toast.error(`Number: ${existingItem.number} is already in the cart!`); // Show error toast
        } else {
          state.items.push(action.payload);
          console.log(action.payload)
          state.totalPrice += action?.payload?.price
          toast.success(`Number: ${action.payload.number} added to the cart!`); // Show success toast
        }
      } catch (e) {
        console.log(e);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => (item._id !== action.payload));
      state.totalPrice -= action?.payload?.price
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { setCart, setPrice, addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
