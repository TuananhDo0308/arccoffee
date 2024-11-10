"use client";
import PopupBoard from "../PopupBoard";
import React, { useState } from "react";
import { loginUser } from "../../slices/authSlice";
import { RootState } from "../../store";
import { changeStatus } from "@/slices/UIcomponentSlice/SigninPopUpSlice";
import { changeStatusSignup } from "@/slices/UIcomponentSlice/SignupPopUpSlice";
import { stat } from "fs";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import Link from "next/link";
import Logo from "@/assets/SingleLogoblack.png";
import Image from "next/image";
import { SpotlightButton } from "../SpotlightButton";

export default function SignIn() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.signin.value);

  const togglePopup = () => {
    dispatch(changeStatus());
  };
  const signUp = () => {
    dispatch(changeStatus());
    dispatch(changeStatusSignup());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const handleSubmit = () => {};
  if (status) {
    return (
      <div
        onClick={() => {
          dispatch(changeStatus());
        }}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        style={{
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()} // Dừng lan truyền sự kiện khi nhấn vào form
          className="relative w-[450px] bg-white flex justify-center  shadow-lg h-[500px] py-12 px-16 rounded-3xl"
        >
          <div className="w-full ">
            <form onSubmit={handleSubmit} className=" flex flex-col justify-between">
              <div className="flex justify-center flex-col items-center ju w-full mb-10">
                <Image src={Logo} alt="app_logo" className="mb-6" />
                <span className="text-3xgit remote add origin https://github.com/TuananhDo0308/arcmobile.git
l font-semibold text-black">
                  Welcome back
                </span>
              </div>
              <div className="mt-5 flex flex-col gap-5 text-base mb-5 ">
                <input
                  className="w-full border-b-2 border-gray-400 py-2  outline-none focus:border-black"
                  type="email"
                  placeholder="Email"
                />
                <div>
                  <input
                    className="w-full border-b-2 border-gray-400 py-2  outline-none focus:border-black pr-10"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  {/* <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                  >
                    
                  </button> */}
                </div>
              </div>
                <span className="text-sm text-black hover:underline cursor-pointer mb-5">
                  Forgot password?
                </span>
                <SpotlightButton text="Sign In"/>
              <p className="mt-8 text-sm items-center">
                Don&apos;t have an account?{" "}
                <Link href="/SignUp">
                  <span className="cursor-pointer text-sm text-yellow-500">
                    Create an account
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
