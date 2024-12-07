"use client";
import React, { Children } from "react";
import { changeStatusSignup } from "@/src/slices/UIcomponentSlice/SignupPopUpSlice";
import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";
interface PopupContentProps {
  togglePopup: () => void;
  children: React.ReactNode;
}
export default function Popup({ togglePopup, children }: PopupContentProps) {
  const status = useAppSelector((state) => state.signup.value);

  return (
    <div
      onClick={() => {
        togglePopup();
      }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      style={{
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} // Dừng lan truyền sự kiện khi nhấn vào form
        className="relative bg-white flex justify-center shadow-lg py-3 px-5 rounded-2xl"
      >
        <div className="w-full">{children}</div>
      </div>
    </div>
  );

  return null;
}
