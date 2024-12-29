"use client"
import React, { useCallback, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useAppDispatch } from "@/src/hooks/hook";
import { addNotification } from "@/src/slices/UIcomponentSlice/NotificationSlice";
import { clientLinks, httpClient } from "@/src/utils";
import { useSession } from "next-auth/react";
import { addToCartThunk } from "@/src/slices/cartThunk";
import Image from "next/image";
import ProductDetailPopup from "./ProductDetail";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

export const ProductCard = ({ product }: any) => {
  const ref = useRef(null);
  const dispatch = useAppDispatch()
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const handleProductClick = useCallback(async () => {
    setIsPopupOpen(true);
    try {
      // Make the API call
      const response = await httpClient.get({
        url: `${clientLinks.homepage.detailProduct}/${product.id}`,
      });
      // Handle the API response if needed
      if (response.data) {
        // Update product details or perform any other actions
        console.log("Product details fetched:", response.data);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      // Optionally, you can show an error notification here
    }
  }, [product.id]);

  const handleAddToCart = () => {
    const id = Date.now();
    dispatch(addToCartThunk(product))
    .unwrap()
    .then(() => {
      dispatch(
        addNotification({
          id,
          message: `${product.name} added to cart`,
        })
      );    })
    .catch((error) => {
      dispatch(
        addNotification({
          id,
          message: `${product.name} failed add to cart`,
        })
      );
    });
  };
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <div
        className="relative flex items-center justify-center w-full h-[370px] rounded-3xl bg-white/30 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-white/40 group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleProductClick}
      >
        <div
          className="w-full h-full bg-white rounded-2xl p-5 flex flex-col justify-start transition-transform duration-300 ease-out transform-style-3d"
          style={{
            transform: isHovered ? 'translateZ(50px) rotateX(5deg) rotateY(-5deg)' : 'translateZ(0)',
          }}
        >
          <div
            className="w-full h-[240px] border border-black rounded-t-xl overflow-hidden transition-transform duration-300 ease-out"
            style={{
              transform: isHovered ? 'translateZ(30px)' : 'translateZ(20px)',
            }}
          >
            <Image 
              src={product.image} 
              layout="fill" 
              alt={product.name} 
              quality={10} 
              loading="lazy" 
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
            />
          </div>

          <h3
            className="font-bold mt-2 text-xl text-black truncate transition-transform duration-300 ease-out"
            style={{
              transform: isHovered ? 'translateZ(40px)' : 'translateZ(20px)',
            }}
          >
            {product.name}
          </h3>
          <p 
            className="text-xs text-gray-500 transition-transform duration-300 ease-out"
            style={{
              transform: isHovered ? 'translateZ(35px)' : 'translateZ(15px)',
            }}
          >
            Stock: {product.stock}
          </p>
          <div 
            className="flex justify-between items-center mt-auto transition-transform duration-300 ease-out"
            style={{
              transform: isHovered ? 'translateZ(40px)' : 'translateZ(20px)',
            }}
          >
            <p className="text-yellow-500 font-extrabold text-2xl">
              {product.price.toLocaleString()} 
            </p>

            <button 
              className="bg-black border border-black text-white py-2 px-4 rounded-full transition-all duration-300 ease-out hover:bg-transparent hover:text-black"
              style={{
                transform: isHovered ? 'translateZ(50px)' : 'translateZ(30px)',
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
            >
              Add +
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isPopupOpen && (
          <ProductDetailPopup
            product={product}
            onClose={() => setIsPopupOpen(false)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>
    </>
  );
};

