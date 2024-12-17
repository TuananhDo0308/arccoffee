"use client"

import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { apiLinks, clientLinks, httpClient } from "@/src/utils";
import { useSession } from "next-auth/react";


interface User{
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string;
  year: number;
  month: number;
  day: number;
  regionId: string;
  CityId: string;
  districtId: string;
  street: string;
  picture: File | null;
};
const  AccountSettings=({border,boxShadow}:any)=> {
  const [user,setUser] =useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await  httpClient.get({ 
          url: clientLinks.user.getProfile,
        })
        setUser(data.data.data)
      } catch (err) {
        console.error("Có lỗi khi lấy dữ liệu:", err);
      }
    };
    fetchData();
  });
    console.log("user",user)
    return (
      <div className="rounded-xl w-[calc(100vh)] flex flex-col max-h-[calc(100vh-200px)] overflow-auto my-[100px] bg-white/10 text-white px-10 py-8 shadow-lg backdrop-blur-lg">
        <div className="pt-4">
          <h1 className=" text-2xl font-semibold">Welcome back {user?.name}</h1>
        </div>
        <hr className="mt-4 mb-8 border-white/20" />
  
        <p className="py-2 text-xl font-semibold">Email Address</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/80">
            Your email address is <strong>{user?.email}</strong>
          </p>
          <button className="text-sm font-semibold underline transition hover:text-blue-300">
            Change
          </button>
        </div>
        <hr className="mt-4 mb-8 border-white/20" />
        {/* BasicInfo */}
        <p className="py-2 text-xl font-semibold">Your information</p>
        <div className="flex items-center">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
            <label>
              <span className="text-sm text-white/60">Current Password</span>
              <input
                type="password"
                className="w-full rounded-md bg-transparent border-2 border-white/20 px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-300"
                placeholder="***********"
              />
            </label>
            <label>
              <span className="text-sm text-white/60">New Password</span>
              <input
                type="password"
                className="w-full rounded-md bg-transparent border-2 border-white/20 px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-300"
                placeholder="***********"
              />
            </label>
          </div>
        </div>
        
        <p className="mt-2 text-white/70">
          Can't remember your current password?{" "}
          <a className="text-sm font-semibold underline hover:text-blue-300" href="#">
            Recover Account
          </a>
        </p>
        <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500">
          Save Password
        </button>
        <hr className="mt-4 mb-8 border-white/20" />
        {/* Password */}
        <p className="py-2 text-xl font-semibold">Password</p>
        <div className="flex items-center">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
            <label>
              <span className="text-sm text-white/60">Current Password</span>
              <input
                type="password"
                className="w-full rounded-md bg-transparent border-2 border-white/20 px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-300"
                placeholder="***********"
              />
            </label>
            <label>
              <span className="text-sm text-white/60">New Password</span>
              <input
                type="password"
                className="w-full rounded-md bg-transparent border-2 border-white/20 px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-300"
                placeholder="***********"
              />
            </label>
          </div>
        </div>

        <p className="mt-2 text-white/70">
          Can't remember your current password?{" "}
          <a className="text-sm font-semibold underline hover:text-blue-300" href="#">
            Recover Account
          </a>
        </p>
        <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500">
          Save Password
        </button>
        <hr className="mt-4 mb-8 border-white/20" />
  
   
       
      </div>
     );
  }
  export default AccountSettings
  