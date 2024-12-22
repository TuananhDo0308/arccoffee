import { createSlice } from "@reduxjs/toolkit";
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


const normalizeCartItem = (item: any) => ({
  productId: item.id || item.productId, // Ưu tiên id nếu có
  name: item.name || "Unnamed Product",
  price: item.price || 0,
  image: item.image || "",
  quantity: item.quantity || 1,
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ hàng
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    // Set lại giỏ hàng mới
    setCart(state, action) {
      const { items, totalPrice } = action.payload;
    
      state.items = items.map(normalizeCartItem); // Chuẩn hóa dữ liệu
      state.totalQuantity = items.reduce((total, item) => total + (item.quantity || 1), 0);
      state.totalPrice = totalPrice || 0;
    },
    
    addToCart(state, action) {
      const newItem = normalizeCartItem(action.payload); // Chuẩn hóa sản phẩm
      const existingItem = state.items.find((item) => item.productId === newItem.productId);
    
      if (!existingItem) {
        state.items.push(newItem);
      } else {
        existingItem.quantity++;
      }
    
      state.totalQuantity++;
      state.totalPrice += newItem.price;
    },
    

    // Xóa sản phẩm khỏi giỏ hàng
    removeFromCart(state, action) {
      const productId = action.payload; // Nhận productId từ action
      state.items = state.items.filter((item) => item.productId !== productId);
    
      // Cập nhật tổng số lượng và tổng giá trị
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    

    // Giảm số lượng sản phẩm
    decreaseQuantity(state, action) {
      const productId = action.payload; // Nhận productId từ action
      const existingItem = state.items.find((item) => item.productId === productId);
    
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        state.totalQuantity--;
        state.totalPrice -= existingItem.price;
      }
    },
    
    // Xóa toàn bộ giỏ hàng

    // Cập nhật số lượng sản phẩm
    updateQuantity(state, action) {
      const { id, newQuantity } = action.payload;
      const productId = id; // Chuyển id thành productId
      const existingItem = state.items.find((item) => item.productId === productId);
    
      if (existingItem) {
        const quantityDifference = newQuantity - existingItem.quantity;
        existingItem.quantity = newQuantity;
    
        state.totalQuantity += quantityDifference;
        state.totalPrice += quantityDifference * existingItem.price;
      }
    },
    
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart, updateQuantity ,setCart} = cartSlice.actions;
export default cartSlice.reducer;
