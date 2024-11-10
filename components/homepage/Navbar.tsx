"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/Logo.png";
import { useAppDispatch } from "@/hooks/hook";
import { changeStatus } from "@/slices/UIcomponentSlice/SigninPopUpSlice";

export default function Navbar() {
  // Function to scroll to a section with smooth behavior
  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const dispatch = useAppDispatch();


  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur items-center bg-zinc-950/50">
      <div className="py-5 items-center flex justify-center">
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Image src={Logo} alt="app_logo" />

          {/* Navbar */}
          <nav className="flex gap-6 text-white items-center">
            <a href="#hero" className="topNav">
              Home
            </a>
            <a href="#about-us" className="topNav">
              About Us
            </a>
            <a href="#shop" className="topNav">
              Shop
            </a>

            <button onClick={()=>{dispatch(changeStatus())}} className="bg-white text-black px-4 py-2 rounded-full font-medium inline-block hover:bg-transparent border-2 hover:border-yellow-500 hover:text-yellow-500">
              Sign In
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
