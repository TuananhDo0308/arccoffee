import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu dữ liệu cho danh mục
interface Category {
  id: string;
  name: string;
}

interface TabsFilterState {
  categories: Category[];
  selectedCategory: string | null;
  loading: boolean; // Trạng thái đang tải
}

const initialState: TabsFilterState = {
  categories: [],
  selectedCategory: null,
  loading: false, // Mặc định không tải
};

const tabsFilterSlice = createSlice({
  name: "tabsFilter",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload; // Cập nhật danh sách danh mục
    },
    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload; // Cập nhật danh mục đang được chọn
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload; // Cập nhật trạng thái tải
    },
  },
});

export const { setCategories, setSelectedCategory, setLoading } =
  tabsFilterSlice.actions;
export default tabsFilterSlice.reducer;
