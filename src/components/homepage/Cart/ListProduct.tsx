import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";
import { removeFromCart, updateQuantity } from "@/src/slices/cartSlice";

const ProductList: React.FC = () => {
  const cart = useAppSelector((state) => state.cart.items);
  const subtotal = useAppSelector((state) => state.cart.totalPrice);

  const dispatch = useAppDispatch();

  const vatRate = 0.1; // 10%

  // Handle quantity change with increment or decrement
  const handleQuantityChange = async (id: string, delta: number) => {
    const product = cart.find((product) => product.id === id);
    if (!product) return;

    const newQuantity = product.quantity + delta;

    if (newQuantity >= 1) {
      try {
        // await updateQuantityDB(id, newQuantity);
        dispatch(updateQuantity({ id: product.id, newQuantity: newQuantity }));
      } catch (error) {
        console.error("Error updating cart quantity:", error);
        alert("Failed to update product quantity. Please try again.");
      }
    }
  };


  // Handle removing a product from the cart
  const handleRemoveProduct = async (id: string) => {
    try {
      const product = cart.find((product) => product.id === id);
      if (product) {
        dispatch(removeFromCart(product.id));
      }
    } catch (error) {
      console.error(error);
      alert("Remove failed!");
    }
  };

  const total = subtotal + subtotal * vatRate;

  return (
    <div className="h-full mt-3 w-full">
      
          {cart.map((product) => (
            <div
              key={product.id}
              className="justify-between mb-6 rounded-lg bg-white  flex"
            >
              <div className="relative h-[150px] w-[150px] ">
                <Image
                  src={`${product.image}`}
                  alt={product.name}
                  className="object-cover rounded-lg"
                  layout="fill"
                />
              </div>
              <div className="flex flex-col p-4  flex-grow-[1] justify-between">
                  <h2 className="text-lg font-bold text-gray-900">
                    {product.name}
                  </h2>
                <div className="flex justify-between flex-col w-full">
                  <div className="flex items-center mb-2 border-gray-100">
                    <span
                      className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      onClick={() => handleQuantityChange(product.id, -1)}
                    >
                      -
                    </span>
                    <input
                      className="h-8 w-8 border bg-white text-center text-xs outline-none"
                      type="number"
                      value={product.quantity}
                      readOnly
                    />
                    <span
                      className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      onClick={() => handleQuantityChange(product.id, 1)}
                    >
                      +
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm">
                      {product.price.toLocaleString()} $
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}

    </div>
  );
};

export default ProductList;
