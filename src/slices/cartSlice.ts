import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addToCartThunk, updateQuantityThunk, removeFromCartThunk, decreaseQuantityThunk } from "./cartThunk";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const normalizeCartItem = (item: any): CartItem => ({
  productId: item.id || item.productId,
  name: item.name || "Unnamed Product",
  price: item.price || 0,
  image: item.image || "",
  quantity: item.quantity || 1,
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    setCart(state, action: PayloadAction<{ items: CartItem[], totalPrice: number }>) {
      const { items, totalPrice } = action.payload;
      state.items = items.map(normalizeCartItem);
      state.totalQuantity = items.reduce((total, item) => total + (item.quantity || 1), 0);
      state.totalPrice = totalPrice || 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        const newItem = (action.payload);
        const existingItem = state.items.find((item) => item.productId === newItem.productId);
        if (!existingItem) {
          state.items.push(newItem);
        } else {
          existingItem.quantity++;
        }
        state.totalQuantity++;
        state.totalPrice += newItem.price;
      })
      .addCase(updateQuantityThunk.fulfilled, (state, action) => {
        const { productId, newQuantity } = action.payload;
        const existingItem = state.items.find((item) => item.productId === productId);
        if (existingItem) {
          const quantityDifference = newQuantity - existingItem.quantity;
          existingItem.quantity = newQuantity;
          state.totalQuantity += quantityDifference;
          state.totalPrice += quantityDifference * existingItem.price;
        }
      })
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        const productId = action.payload;
        const existingItem = state.items.find((item) => item.productId === productId);
        if (existingItem) {
          state.items = state.items.filter((item) => item.productId !== productId);
          state.totalQuantity -= existingItem.quantity;
          state.totalPrice -= existingItem.price * existingItem.quantity;
        }
      })
      .addCase(decreaseQuantityThunk.fulfilled, (state, action) => {
        if (action.payload && 'productId' in action.payload) {
          const { productId, newQuantity } = action.payload;
          const existingItem = state.items.find((item) => item.productId === productId);
          if (existingItem) {
            existingItem.quantity = newQuantity;
            state.totalQuantity--;
            state.totalPrice -= existingItem.price;
          }
        }
        // If the payload doesn't have productId, it means the item was removed
        // The state has already been updated by removeFromCartThunk
      })
  },
});

export const { clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;

