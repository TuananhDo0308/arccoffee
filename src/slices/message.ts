// src/slices/popupSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
  isOpen: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

const initialState: PopupState = {
  isOpen: false,
  message: '',
  type: 'info',
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    showPopup(state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' }>) {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hidePopup(state) {
      state.isOpen = false;
      state.message = '';
      state.type = 'info';
    },
  },
});

export const { showPopup, hidePopup } = popupSlice.actions;

export default popupSlice.reducer;
