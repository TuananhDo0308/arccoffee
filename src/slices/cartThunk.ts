import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CartItem, normalizeCartItem } from './cartSlice';
import { clientLinks, httpClient } from '@/src/utils'; // Adjust this import based on your project structure
import { normalize } from 'path';

export const addToCartThunk = createAsyncThunk(
  'cart/addToCartThunk',
  async (newItem:any, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const productInStore = state.filteredProducts.products.find(
      (product) => product.productId === newItem.productId
    );
    const isLoggedIn = state?.auth.isLogin;
    const item =normalizeCartItem(newItem)
    if (isLoggedIn) {
      try {
        const response = await httpClient.post({ 
          url: clientLinks.cart.addToCart,
          params:{"prodId":item.productId} 
        });
        return item;
      } catch (error) {
        return rejectWithValue('Failed to add item to cart on the server');
      }
    } else {
      return item;
    }
  }
);

export const updateQuantityThunk = createAsyncThunk(
  'cart/updateQuantityThunk',
  async ({ productId, newQuantity }: { productId: string, newQuantity: number }, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const isLoggedIn = state.auth.isLogin;

    if (isLoggedIn) {
      try {
        const response = await httpClient.put({ 
          url: clientLinks.cart.updateQuantity,  
          params: { productId:productId, Quantity: newQuantity }
        });
        return { productId, newQuantity };
      } catch (error) {
        return rejectWithValue('Failed to update quantity on the server');
      }
    } else {
      return { productId, newQuantity };
    }
  }
);

export const removeFromCartThunk = createAsyncThunk(
  'cart/removeFromCartThunk',
  async (productId: string, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const isLoggedIn = state.auth.isLogin;

    if (isLoggedIn) {
      try {
        await httpClient.delete({ 
          url: clientLinks.cart.deleteItem,
          params: {"id": productId}
        });
        return productId;
      } catch (error) {
        return rejectWithValue('Failed to remove item from cart on the server');
      }
    } else {
      return productId;
    }
  }
);

export const decreaseQuantityThunk = createAsyncThunk(
  'cart/decreaseQuantityThunk',
  async (productId: string, { getState, rejectWithValue,dispatch }) => {
    const state = getState() as RootState;
    const isLoggedIn = state.auth.isLogin;
    const currentItem = state.cart.items.find(item => item.productId === productId);

    if (!currentItem) {
      return rejectWithValue('Item not found in cart');
    }

    const newQuantity = currentItem.quantity - 1;

    if (newQuantity === 0) {
        // If the new quantity is 0, remove the item from the cart
        return dispatch(removeFromCartThunk(productId));
      }
  
    if (newQuantity < 1) {
      return rejectWithValue('Quantity cannot be less than 1');
    }

    if (isLoggedIn) {
      try {
        const response = await httpClient.patch({ 
        url: clientLinks.cart.updateQuantity,
          params: { "productId":productId, "Quantity": newQuantity }
        });
        return { productId, newQuantity };
          } catch (error) {
        return rejectWithValue('Failed to decrease quantity on the server');
      }
    } else {
      return { productId, newQuantity };
    }
  }
);

export const increaseQuantityThunk = createAsyncThunk(
  'cart/increaseQuantityThunk',
  async (productId: string, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const isLoggedIn = state.auth.isLogin;
    const currentItem = state.cart.items.find(item => item.productId === productId);

    if (!currentItem) {
      return rejectWithValue('Item not found in cart');
    }

    const newQuantity = currentItem.quantity + 1;

    if (isLoggedIn) {
      try {
        const response = await httpClient.patch({ 
          url: clientLinks.cart.updateQuantity,
          params: { "productId":productId, "Quantity": newQuantity }
        });
        return { productId, newQuantity };
          } catch (error) {
        return rejectWithValue('Failed to increase quantity on the server');
      }
    } else {
      return { productId, newQuantity };
    }
  }
);

