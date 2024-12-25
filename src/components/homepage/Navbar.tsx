"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/src/assets/Logo.png";
import { useAppDispatch } from "@/src/hooks/hook";
import { signIn, signOut, useSession } from "next-auth/react";
import { changeStatus } from "@/src/slices/UIcomponentSlice/cartUiSlice";
import { changeStatusLogin } from "@/src/slices/UIcomponentSlice/SigninPopUpSlice";
import Link from "next/link";
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const NavItems = () => (
    <>
      <a href="#home" className="topNav">
        Home
      </a>
      <a href="#shop" className="topNav">
        Shop
      </a>
      <a
        onClick={() => {
          dispatch(changeStatus());
        }}
        className="topNav cursor-pointer"
      >
        Cart
      </a>
    </>
  );

  const UserInfo = () => (
    <>
      {session?.user?.image ? (
        <Link href="./user" className="flex items-center gap-4">
          <div className="relative w-10 h-10 rounded-full bg-white overflow-hidden">
            <Image
              src={session?.user?.image || "/default-avatar.png"}
              alt="User Avatar"
              layout="fill"
              className="object-cover"
            />
          </div>
        </Link>
      ) : (
        <button
          onClick={() => dispatch(changeStatusLogin())}
          className="bg-white text-black px-4 py-2 rounded-full font-medium inline-block hover:bg-transparent border-2 hover:border-yellow-500 hover:text-yellow-500 transition-colors duration-300"
        >
          Sign In
        </button>
      )}
    </>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-zinc-950/50">
      <div className="py-4 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image src={Logo} alt="app_logo" className="h-7 w-11" />
          </Link>

          {/* Desktop Navbar */}
          <nav className="hidden md:flex gap-6 text-white items-center">
            <NavItems />
            <UserInfo />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-900 text-white">
          <nav className="flex flex-col items-center py-4 space-y-4">
            <NavItems />
            <UserInfo />
          </nav>
        </div>
      )}
    </header>
  );
}

