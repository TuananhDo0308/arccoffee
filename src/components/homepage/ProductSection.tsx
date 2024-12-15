"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { clientLinks, httpClient } from "@/src/utils";
import ProductGrid from "./ProductSection/ProductList";
import { SlideTabs } from "../Tabs";
import { SearchBox } from "../SearchInput";
import SearchPopup from "./SearchPopUp";
import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";
import AiIcon from "@/src/assets/AiIcon";
export default function ProductSection() {
  const { products, filteredProducts, message } = useAppSelector(
    (state) => state.filteredProducts
  );

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");

  return (
    <>
    
    <div className="py-5 items-center flex justify-center">
      <div className="container flex items-center justify-between">
        <div className="container text-white">
          <motion.h1
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75 }}
            className="mb-11 text-4xl font-black uppercase text-zinc-50"
          >
            <div className="flex justify-between">
              <SlideTabs />

              <div className="flex gap-3">
                {/* Truyền onClick vào DottedButton */}
                <SearchBox />

                <DottedButton onClick={() => setIsSearchOpen(true)} />
              </div>
            </div>
          </motion.h1>
          <p className="text-white font-medium text-lg px-10 mb-5">{message}</p>

          <motion.div
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75 }}
            className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
          >
            <ProductGrid/>
          </motion.div>
        </div>
      </div>

      {/* Sử dụng component SearchPopup */}
      <SearchPopup
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        userQuestion={userQuestion}
        setUserQuestion={setUserQuestion}
        products={products}
      />
    </div>
    </>
  );
}

const DottedButton = ({ onClick }: { onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick} // Đảm bảo onClick được truyền vào và gọi khi nhấn nút
      className={`flex items-center justify-center h-[60px] rounded-full border-2 border-dashed border-white bg-transparent font-semibold uppercase text-black transition-all duration-200 ${
        isHovered ? "w-[150px]" : "w-[60px]"
      }`}
    >
      {isHovered ? (
        <div className="flex gap-1 items-center">
          <AiIcon />

          <span className="text-white font-semibold text-sm">AI Chat</span>
        </div>
      ) : (
        <AiIcon />
      )}
    </button>
    
  );
};
