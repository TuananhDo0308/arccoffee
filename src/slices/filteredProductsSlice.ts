import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
  productId: number;
  name: string;
  categoryName: string;
  // Thêm các thuộc tính khác nếu cần
}

interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  message:string
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  message:""
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.filteredProducts = action.payload; // Cập nhật cả sản phẩm gốc và sản phẩm đã lọc
    },
    setFilteredProducts(state, action: PayloadAction<Product[]>) {
      state.filteredProducts = action.payload; // Cập nhật sản phẩm đã lọc
    },
    setMessage(state, action: PayloadAction<string>) {
        state.message = action.payload; // Cập nhật sản phẩm đã lọc
      },
  },
});

export const { setProducts, setFilteredProducts,setMessage } = productsSlice.actions;
export default productsSlice.reducer;
