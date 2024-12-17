import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  image: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  image: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<{ accessToken: string | null; image: string | null }>) => {
      state.accessToken = action.payload.accessToken;
      state.image = action.payload.image;
    },
    clearAuthData: (state) => {
      state.accessToken = null;
      state.image = null;
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
