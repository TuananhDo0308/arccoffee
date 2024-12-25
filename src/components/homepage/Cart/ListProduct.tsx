import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";
import { addNotification } from "@/src/slices/UIcomponentSlice/NotificationSlice";
import {
  removeFromCartThunk,
  updateQuantityThunk,
} from "@/src/slices/cartThunk";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const ProductList: React.FC = () => {
  const cart = useAppSelector((state) => state.cart.items);

  const dispatch = useAppDispatch();
  const handleQuantityChange = async (id: string, delta: number) => {
    const product = cart.find((product) => product.productId === id);
    const newQuantity = product.quantity + delta;
    if (newQuantity <= 0) {
      dispatch(removeFromCartThunk(product.productId));
    } else {
      dispatch(updateQuantityThunk({ productId: id, newQuantity: newQuantity }))
        .unwrap()
        .then(() => {
          console.log("update quantity success");
        })
        .catch((error) => {});
    }

    if (!product) return;
  };

  // Handle removing a product from the cart
  const handleRemoveProduct = async (id: string) => {
    try {
      const product = cart.find((product) => product.productId === id);
      dispatch(removeFromCartThunk(product.productId))
        .unwrap()
        .then(() => {
          console.log("Item removed from cart");
        })
        .catch((error) => {
          console.error("Failed to remove item from cart:", error);
        });
    } catch (error) {
      console.error(error);
      alert("Remove failed!");
    }
  };

  return (
    <div className="h-full mt-3 w-full">
      {cart.map((product) => (
        <div
          key={product.productId}
          className="justify-between mb-6 relative rounded-lg bg-white border-1 border-black  flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5 top-2 right-2 absolute cursor-pointer duration-150 hover:text-red-500"
            onClick={() => handleRemoveProduct(product.productId)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <div className="relative h-[150px] w-[150px] border-r-1 border-black">
            <Image
              src={`${product.image}`}
              alt={product.name}
              className="object-cover rounded-lg"
              layout="fill"
            />
          </div>
          <div className="flex flex-col p-4 mt-3 flex-grow-[1] justify-between">
            <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
              <div className="flex items-center mb-2 gap-1 border-gray-100">
                <span
                  className="cursor-pointer rounded-full bg-gray-100 flex w-[30px] h-[30px] items-center justify-center text-xl duration-100 hover:bg-yellow-500 hover:text-blue-50"
                  onClick={() => handleQuantityChange(product.productId, -1)}
                >
                  -
                </span>
                <input
                  className="h-8 w-8 text-center text-xs outline-none"
                  type="number"
                  value={product.quantity}
                  readOnly
                />
                <span
                  className="cursor-pointer rounded-full bg-gray-100 flex w-[30px] h-[30px] items-center justify-center text-xl duration-100 hover:bg-yellow-500 hover:text-blue-50"
                  onClick={() => handleQuantityChange(product.productId, 1)}
                >
                  +
                </span>
              </div>
              <div className="flex items-center space-x-4  text-xl">
                <p>{product.price.toLocaleString()} VND</p>
              </div>
            </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
