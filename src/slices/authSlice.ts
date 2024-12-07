// features/authSlice.ts
import { Token } from '@/models/token';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import authService from '../../../lamhystore-frontend/src/services/auth' 


export interface User {
    id: string;
    name: string;
    email: string;
  }
  
export interface AuthState {
accessToken: Token | null;
loginLoading: boolean,
}

const initialState: AuthState = {
  accessToken: null,
  loginLoading: false,
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async (arg: { phoneNumber: string; password: string }) => {
      const { phoneNumber, password } = arg;
      const result = await authService.login(phoneNumber, password);
      return result;
    },
);
  

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => ({
        ...state,
        loginLoading: true,
    }))
    .addCase(loginUser.fulfilled, (state, { payload }) => ({
        ...state,
        loginLoading: false,
        accessToken: payload,
    }))
    .addCase(loginUser.rejected, (state) => ({
        ...state,
        loginLoading: false
    }))
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
