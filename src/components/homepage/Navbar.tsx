"use client";
import Image from "next/image";
import Logo from "@/src/assets/Logo.png";
import { useAppDispatch } from "@/src/hooks/hook";
import { signIn, signOut, useSession } from "next-auth/react";
import { changeStatus } from "@/src/slices/UIcomponentSlice/cartUiSlice";
import { changeStatusLogin } from "@/src/slices/UIcomponentSlice/SigninPopUpSlice";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur items-center bg-zinc-950/50">
      <div className="py-5 items-center flex justify-center">
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Image src={Logo} alt="app_logo" />

          {/* Navbar */}
          <nav className="flex gap-6 text-white items-center">
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
              className="topNav"
            >
              Cart
            </a>

            {/* User Info */}
            {session?.user?.image ? (
              <div className="flex items-center gap-4">
                <div className="relative w-[40px] h-[40px] rounded-full bg-white overflow-hidden">
                  <Image
                    src={session?.user?.image || "/default-avatar.png"}
                    alt="User Avatar"
                    layout="fill"
                    className="object-cover"
                  />
                </div>

                <button
                  onClick={() => signOut()}
                  className="bg-white text-black px-4 py-2 rounded-full font-medium inline-block hover:bg-transparent border-2 hover:border-red-500 hover:text-red-500"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => dispatch(changeStatusLogin())}
                className="bg-white  text-black px-4 py-2 rounded-full font-medium inline-block hover:bg-transparent border-2 hover:border-yellow-500 hover:text-yellow-500"
              >
                Sign In
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
