import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Initially, the user is not logged in
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // console.log(action.payload)
      state.user = action.payload; // Set the user data on login
    },
    setUser: (state, action) => {
      // console.log(action.payload)
      state.user = action.payload; // Set the user data on login
    },
    logout: (state) => {
      state.user = null; // Clear user data on logout
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
