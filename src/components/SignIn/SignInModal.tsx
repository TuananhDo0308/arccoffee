"use client";
import Popup from "../Popup";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";
import { changeStatusLogin } from "@/src/slices/UIcomponentSlice/SigninPopUpSlice";
import { changeStatusSignup } from "@/src/slices/UIcomponentSlice/SignupPopUpSlice";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Logo from "@/src/assets/SingleLogoblack.png";
import { clientLinks, httpClient } from "@/src/utils";
import { clearCart, setCart } from "@/src/slices/cartSlice";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); // State cho email
  const [password, setPassword] = useState(""); // State cho password

  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.signin.value);

  const close = () => {
    dispatch(changeStatusLogin());
  };

  const signUp = () => {

    close();
    dispatch(changeStatusSignup());
  };

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
  
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false, // Tùy chọn này để không tự động chuyển hướng
    });
  
    if (result?.ok) {
      fetchCart();
      close(); // Chỉ đóng khi đăng nhập thành công
    } else {
      console.error("Login failed:", result?.error);
      alert("Login failed. Please check your email and password."); // Thông báo lỗi
    }
  };
  const data=useAppSelector(state=>state.cart.items)
  const items = data.map(item => ({
    productId: item.productId, // Chỉ lấy productId
    quantity: item.quantity,   // Chỉ lấy quantity
  }));
  const fetchCart = async () => {
    try {
      let result = null;
  
      // Nếu data trống, gọi API GET để lấy giỏ hàng
      if (items.length === 0) {
        const response = await httpClient.get({
          url: clientLinks.cart.cart,
        });
        result = response.data?.data; 
      } 
      // Nếu data có sản phẩm, gọi API POST để cập nhật giỏ hàng
      else {
        const items = data.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
        }));
  
        const response = await httpClient.post({
          url: clientLinks.cart.addListCart,
          data: { items },
        });
        result = response.data?.data.data; // Giả định server trả về { data: { ... } }
      }
  
      console.log("Result:", result);
  
      // Kiểm tra kết quả từ server
      if (result) {
        const { items, totalPrice } = result; // Đúng cấp độ truy cập
        dispatch(setCart({ items, totalPrice }));
      }
  
      console.log("Cart data loaded successfully!");
      close(); // Đóng khi hoàn tất
    } catch (error) {
      console.error("Error loading cart:", error);
      alert("Failed to load cart data.");
    }
  };
  

  const handleLoginGoogle = (e: React.MouseEvent) => {
    e.preventDefault();
    signIn("google");
    close();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (status) {
    return (
      <Popup togglePopup={close}>
        <div
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center w-[420px] p-5 bg-white gap-5"
        >
          <div className="flex justify-center flex-col items-start w-full mb-5">
            <Image src={Logo} alt="app_logo" className="mb-6" />
            <span className="text-3xl font-bold text-black">Sign In</span>
            <span className="text-base font-light text-gray-800">
              Welcome back! Please enter your details
            </span>
          </div>
          <div className="flex flex-col w-full px-3 items-center gap-5">
          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            value={email} // Bind state
            onChange={(e) => setEmail(e.target.value)} // Update state
            className="w-full  py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          {/* Password */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password} // Bind state
              onChange={(e) => setPassword(e.target.value)} // Update state
              className="w-full py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-500 text-base"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Remember me và Forgot password */}
          <div className="flex justify-between w-full flex-row-reverse">
            <a href="#" className="text-sm text-yellow-500 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Nút Sign In */}
          <button
            type="submit"
            className="w-full py-3 text-white bg-black hover:bg-gray-900 rounded-lg text-sm font-bold"
            onClick={handleLogin} // Gọi API
          >
            Sign In
          </button>

          {/* Hoặc đăng nhập bằng Google */}
          <button
            type="button"
            onClick={handleLoginGoogle}
            className="w-full py-3 border border-gray-300 rounded-lg text-sm text-gray-700 flex justify-center items-center gap-2 hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.4 0 6.5 1.3 8.9 3.4l6.6-6.6C35.6 3 30.1 1 24 1 14.7 1 7 6.9 3.6 15.1l7.9 6.2C13.2 14.3 18.2 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.5 24.5c0-1.4-.1-2.8-.4-4.1H24v8.3h12.8c-.5 2.6-2 4.8-4.2 6.3l7.9 6.2c4.6-4.3 7-10.5 7-16.7z"
              />
              <path
                fill="#FBBC05"
                d="M10.8 28.7c-.6-2.6-.6-5.4 0-8L2.9 14.4C-.9 20.3-.9 28.7 2.9 34.6l7.9-6z"
              />
              <path
                fill="#4285F4"
                d="M24 46c6.5 0 12-2.1 16.4-5.7l-7.9-6.2c-2.3 1.5-5.3 2.4-8.5 2.4-5.8 0-10.8-3.9-12.7-9.2l-7.9 6.2C7.1 41.1 15.1 46 24 46z"
              />
            </svg>
            Sign in with Google
          </button>

          {/* Link Sign Up */}
          <p className="text-sm text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <span
              onClick={signUp}
              className="text-yellow-500 font-semibold cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
          </div>

        </div>
      </Popup>
    );
  }

  return null;
}
