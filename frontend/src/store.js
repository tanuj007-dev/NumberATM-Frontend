// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import numberReducer from './redux/numbers/numberSlice';
import cartReducer from './redux/cart/cartSlice';
import userReducer from './redux/user/userSlice';
import favReducer from './redux/favorites/favSlice';

const store = configureStore({
  reducer: {
    number: numberReducer,
    cart: cartReducer,
    user: userReducer,
    fav: favReducer,
  },
});

export default store;
