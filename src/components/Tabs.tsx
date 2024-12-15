"use client"
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { clientLinks, httpClient } from "@/src/utils";
import { setFilteredProducts, setMessage, setProducts } from "@/src/slices/filteredProductsSlice";
import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";


export const SlideTabs = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.filteredProducts);

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });

  // Fetch products and categories data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          httpClient.get({ url: clientLinks.homepage.product }),
          httpClient.get({ url: clientLinks.homepage.category }),
        ]);

        dispatch(setProducts(productsResponse.data.data));
        setCategories(categoriesResponse.data.data); 
      } catch (err) {
        console.error("Có lỗi khi lấy dữ liệu:", err);
      }
    };

    fetchData();
  }, [dispatch]);

  const filterProducts = (categoryName:string) => {
    if (categoryName === 'All') {
      dispatch(setFilteredProducts(products)); // Show all products
    } else {
      const filtered = products.filter((product) => product.categoryName === categoryName);
      dispatch(setFilteredProducts(filtered)); // Filter products by category
    }
    dispatch(setMessage(""))
  };

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="flex w-fit rounded-full border-2 border-black bg-white p-1"
    >
      {/* Tab "All" */}
      <Tab
        key="all"
        category={{ name: 'All', id: 'all' }}
        setPosition={setPosition}
        setSelectedCategory={setSelectedCategory}
        filterProducts={filterProducts}
      />
      {categories.map((category) => (
        <Tab
          key={category.id}
          category={category}
          setPosition={setPosition}
          setSelectedCategory={setSelectedCategory}
          filterProducts={filterProducts}
        />
      ))}
      <Cursor position={position} />
    </ul>
  );
};

export const Tab = ({ category, setPosition, setSelectedCategory, filterProducts }:any) => {
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
        setSelectedCategory(category.name); // Cập nhật category đã chọn
        filterProducts(category.name); // Lọc sản phẩm theo category
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 font-semibold uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {category.name}
    </li>
  );
};

export const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};
