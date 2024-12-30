import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";
import {
  setSelectedCategory,
  setLoading,
} from "@/src/slices/tabFilterSlice";
import { setFilteredProducts, setMessage } from "@/src/slices/filteredProductsSlice";

export const SlideTabs = () => {
  const dispatch = useAppDispatch();
  const { categories, selectedCategory, loading } = useAppSelector(
    (state) => state.tabFilter
  );
  const { products } = useAppSelector((state) => state.filteredProducts);
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });

  const filterProducts = (categoryName: string) => {
    if (categoryName === "All") {
      dispatch(setFilteredProducts(products)); // Hiển thị tất cả sản phẩm
    } else {
      const filtered = products.filter(
        (product) => product.categoryName === categoryName
      );
      dispatch(setFilteredProducts(filtered)); // Lọc sản phẩm theo danh mục
    }
    dispatch(setMessage("")); // Xóa thông báo
    dispatch(setSelectedCategory(categoryName)); // Cập nhật danh mục được chọn
  };

  return (
    <div className="w-full overflow-x-auto pb-2">
      <ul
        onMouseLeave={() => {
          setPosition((pv) => ({
            ...pv,
            opacity: 0,
          }));
        }}
        className="flex w-fit rounded-full border-2 border-black bg-white p-1"
      >
        {loading ? (
          <SkeletonTabs /> // Hiển thị skeleton nếu đang tải
        ) : (
          <>
            <Tab
              key="all"
              category={{ name: "All", id: "all" }}
              setPosition={setPosition}
              selectedCategory={selectedCategory}
              filterProducts={filterProducts}
            />
            {categories.map((category) => (
              <Tab
                key={category.id}
                category={category}
                setPosition={setPosition}
                selectedCategory={selectedCategory}
                filterProducts={filterProducts}
              />
            ))}
            <Cursor position={position} />
          </>
        )}
      </ul>
    </div>
  );
};

// Tab Component
export const Tab = ({
  category,
  setPosition,
  selectedCategory,
  filterProducts,
}: any) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      onClick={() => {
        filterProducts(category.name);
      }}
      className={`relative z-10 block cursor-pointer px-2 py-1 sm:px-3 sm:py-1.5 text-sm sm:text-base font-semibold uppercase text-white mix-blend-difference md:px-5 md:py-3 whitespace-nowrap ${
        selectedCategory === category.name ? "text-bold" : ""
      }`}
    >
      {category.name}
    </li>
  );
};

// Skeleton Tabs
export const SkeletonTabs = () => {
  const skeletonItems = Array.from({ length: 5 }); // 5 khung skeleton giả định
  return (
    <>
      {skeletonItems.map((_, index) => (
        <li
          key={index}
          className="relative z-10 block px-2 py-1 sm:px-3 sm:py-1.5 text-sm sm:text-base font-semibold uppercase bg-gray-200 rounded-md animate-pulse md:px-5 md:py-3 whitespace-nowrap"
        >
          &nbsp;
        </li>
      ))}
    </>
  );
};

// Cursor Component
export const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-6 sm:h-7 md:h-12 rounded-full bg-black"
    />
  );
};

export default SlideTabs;
