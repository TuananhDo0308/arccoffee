import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa"; // Social media icons

export const Footer = () => {
  return (
    <footer className="bg-white text-black py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Footer Logo or Brand Name */}
        <div className="mb-6 md:mb-0">
          <h1 className="text-2xl font-bold ">Arc lab</h1>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col md:flex-row md:space-x-10 space-y-4 md:space-y-0">

        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 mt-6 md:mt-0">
          <a href="#" className="">
            <FaFacebookF />
          </a>
          <a href="#" className="">
            <FaTwitter />
          </a>
          <a href="#" className="">
            <FaInstagram />
          </a>
          <a href="#" className="">
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="mt-8 text-center text-black">
        <p>&copy; 2024 Arc lab. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
