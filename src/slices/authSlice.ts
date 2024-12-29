import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLogin: boolean;
  hasFetchedCart: boolean; // New variable to track cart fetching
}

const initialState: AuthState = {
  isLogin: false,
  hasFetchedCart: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLogin = true;
      state.hasFetchedCart = true; // Mark cart as fetched
    },
    logout(state) {
      state.isLogin = false;
      state.hasFetchedCart = false; // Reset cart fetch status on logout
    },
    setCartFetched(state) {
      state.hasFetchedCart = true; // Mark cart as fetched
    },
  },
});

export const { login, logout, setCartFetched } = authSlice.actions;

export const IsLogin = (state: { auth: AuthState }) => state.auth.isLogin;
export const HasFetchedCart = (state: { auth: AuthState }) =>
  state.auth.hasFetchedCart;

export default authSlice.reducer;
