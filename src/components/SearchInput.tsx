"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { setFilteredProducts, setMessage } from "../slices/filteredProductsSlice";

export const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const {products, filteredProducts} = useAppSelector(state=>state.filteredProducts)
    const dispatch=useAppDispatch();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchTerm = e.target.value;
      setSearchTerm(searchTerm);
  
      // Lọc sản phẩm dựa trên từ khóa tìm kiếm
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      dispatch(setMessage(""))

      // Cập nhật state filteredProducts trong Redux
      dispatch(setFilteredProducts(filtered));
    };
  return (
    
    <div className="flex items-center bg-black text-white border border-white rounded-full w-[300px] px-8 py-4">
      <input
        type="text"
        placeholder="Search item"
        value={searchTerm}
        onChange={handleSearch} // Cập nhật state khi người dùng nhập
        className="bg-transparent text-base text-white outline-none font-medium placeholder-white"
      />
    </div>
  );
};
