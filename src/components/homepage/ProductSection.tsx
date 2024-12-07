"use client";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useEffect, useRef } from "react";
import { SlideTabs } from "../Tabs";
import { SearchBox } from "../SearchInput";
import ProductGrid from "./ProductSection/ProductList";

export default function ProductSection() {
  return (
    <div className="py-5 items-center flex justify-center">
      <div className="container flex items-center justify-between">
        <div className="container  text-white">
          <motion.h1
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75 }}
            className="mb-20 text-4xl font-black uppercase text-zinc-50"
          >
            <div className="flex justify-between">
              <SlideTabs />
              <SearchBox />
            </div>
          </motion.h1>
          <motion.div
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75 }}
            className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
          >
            <ProductGrid />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
