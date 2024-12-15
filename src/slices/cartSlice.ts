import { createSlice } from "@reduxjs/toolkit";
export interface CartItem {
  id: string;
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
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ hàng
    addToCart(state, action) {
      const newItem = action.payload; // Sản phẩm được thêm
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        // Nếu sản phẩm chưa có trong giỏ hàng
        state.items.push({
          ...newItem,
          quantity:1
        });
      } else {
        // Nếu sản phẩm đã có, tăng số lượng
        existingItem.quantity++;
      }

      // Tính tổng số lượng và tổng giá trị
      state.totalQuantity++;
      state.totalPrice += newItem.price;
    },

    // Xóa sản phẩm khỏi giỏ hàng
    removeFromCart(state, action) {
      const id = action.payload; // ID của sản phẩm cần xóa
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity; // Trừ số lượng tổng
        state.totalPrice -= existingItem.price * existingItem.quantity; // Trừ tổng giá trị
        state.items = state.items.filter((item) => item.id !== id); // Loại bỏ khỏi danh sách
      }
    },

    // Giảm số lượng sản phẩm
    decreaseQuantity(state, action) {
      const id = action.payload; // ID sản phẩm
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        state.totalQuantity--;
        state.totalPrice -= existingItem.price;
      }
    },

    // Xóa toàn bộ giỏ hàng
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    // Cập nhật số lượng sản phẩm
    updateQuantity(state, action) {
      const { id, newQuantity } = action.payload; // ID sản phẩm và số lượng mới
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        const quantityDifference = newQuantity - existingItem.quantity; // Chênh lệch số lượng
        existingItem.quantity = newQuantity; // Cập nhật số lượng
        state.totalQuantity += quantityDifference; // Cập nhật tổng số lượng
        state.totalPrice += quantityDifference * existingItem.price; // Cập nhật tổng giá
      }
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
