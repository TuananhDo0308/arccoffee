"use client";
import React, { useState } from "react";
import Popup from "../Popup";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step3";
import Step3 from "./Steps/Step2";
import Image from "next/image";
import Logo from "@/src/assets/SingleLogoblack.png";
import Icon from "@/src/assets/icon.png"
import Icon2 from "@/src/assets/tickIcon.png"

import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";
import { changeStatusSignup } from "@/src/slices/UIcomponentSlice/SignupPopUpSlice";
import { changeStatus } from "@/src/slices/UIcomponentSlice/SigninPopUpSlice";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    year: "",
    month: "",
    day: "",
    regionId: "",
    cityId: "",
    districtId: "",
    street: "",
    picture: null as File | null,
  });

  const [currentStep, setCurrentStep] = useState(1); // Thêm currentStep
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.signup.value);

  const togglePopup = () => {
    dispatch(changeStatusSignup());
  };

  const handleChange = (field: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3)); // Tối đa 3 bước
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1)); // Tối thiểu bước 1
  };
  const signin = () => {
    togglePopup();
    dispatch(changeStatus());
  };

  const handleSubmit = () => {
    console.log("Form Submitted:", formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} handleChange={handleChange} />;
      case 2:
        return <Step2 formData={formData} handleChange={handleChange} />;
      case 3:
        return <Step3 formData={formData} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  if (status) {
    return (
      <Popup togglePopup={togglePopup}>
        <div
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center w-[550px] p-5 bg-white gap-5"
        >
          <div className="flex justify-center flex-col items-start w-full mb-5">
            <Image src={Logo} alt="app_logo" className="mb-6" />
            <span className="text-3xl font-bold text-black">Sign Up</span>
            <span className="text-base font-light text-gray-800">
              Create an account and start shopping!
            </span>
          </div>
          <div
          className="flex flex-col w-full justify-center items-center bg-white gap-2"
        >
          {renderStep()}
          <div className="flex justify-end flex-w w-full">
            {currentStep > 1 && (
                            <Image onClick={prevStep} alt="icon" src={Icon}  width={30} height={30} className="m-2 "/>

            )}
            {currentStep < 3 ? (
              <Image onClick={nextStep} alt="icon" src={Icon}  width={30} height={30} className="m-2 rotate-180"/>
              // <button
              //   className="bg-transparent text-black py-2 px-4 rounded"
              //   onClick={nextStep}
              // >
              //   Next
              // </button>
            ) : (
              <Image onClick={handleSubmit} alt="icon" src={Icon2}  width={30} height={30} className="m-2"/>

            
            )}
          </div>
          <p className="text-gray-800">or</p>
          <button
            type="button"
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
            Sign up with Google
          </button>
 <p className="text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
            onClick={signin}
              className="text-yellow-500 font-semibold cursor-pointer hover:underline"
            >
              Sign in
            </span>
          </p>
        </div>          </div>

       
      </Popup>
    );
  }

  return null;
}
