"use client";

import { SearchBox } from "../SearchInput";
import { SlideTabs } from "../Tabs";
import ProductGrid from "./ProductSection/ProductList";
import SearchPopup from "./SearchPopUp";
import AiIcon from "@/src/assets/AiIcon";
import { useAppSelector } from "@/src/hooks/hook";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProductSection() {
  const { products, message } = useAppSelector(
    (state) => state.filteredProducts
  );

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");

  return (
    <div className="py-5 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-white">
          <div className="mb-6 sm:mb-11">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <SlideTabs />

              <div className="flex gap-3 w-full sm:w-auto">
                <SearchBox />
                {/* <DottedButton onClick={() => setIsSearchOpen(true)} /> */}
              </div>
            </div>
          </div>

          {message && (
            <p className="text-white font-medium text-base sm:text-lg px-2 sm:px-10 mb-5">
              {message}
            </p>
          )}

          <div className="mb-9 border-b border-zinc-800 pb-9">
            <ProductGrid />
          </div>
        </div>
      </div>

      <SearchPopup
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        userQuestion={userQuestion}
        setUserQuestion={setUserQuestion}
        products={products}
      />
    </div>
  );
}

const DottedButton = ({ onClick }: { onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`flex items-center justify-center h-[50px] sm:h-[60px] rounded-full border-2 border-dashed border-white bg-transparent font-semibold uppercase text-black transition-all duration-200 ${
        isHovered ? "w-[130px] sm:w-[150px]" : "w-[50px] sm:w-[60px]"
      }`}
    >
      {isHovered ? (
        <div className="flex gap-1 items-center">
          <AiIcon />
          <span className="text-white font-semibold text-xs sm:text-sm">
            AI Chat
          </span>
        </div>
      ) : (
        <AiIcon />
      )}
    </button>
  );
};
