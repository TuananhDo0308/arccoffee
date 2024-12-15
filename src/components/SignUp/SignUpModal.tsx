"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";
import Popup from "../Popup";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Image from "next/image";
import Logo from "@/src/assets/SingleLogoblack.png";
import Icon from "@/src/assets/icon.png";
import Icon2 from "@/src/assets/tickIcon.png";
import { setCurrentStep } from "@/src/slices/signUpFormdata";
import { changeStatusSignup } from "@/src/slices/UIcomponentSlice/SignupPopUpSlice";
import { changeStatusLogin } from "@/src/slices/UIcomponentSlice/SigninPopUpSlice";
import {Progress} from "@nextui-org/react";

export default function SignUp() {
  const dispatch = useAppDispatch();
  const { currentStep, formData } = useAppSelector((state) => state.signupData);
  const status =  useAppSelector((state) => state.signup.value);

  const nextStep = () => {
    dispatch(setCurrentStep(currentStep + 1));
  };

  const prevStep = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
  };

  if(status){
    return (
    <Popup togglePopup={()=>dispatch(changeStatusSignup())}>
      <div className="flex flex-col justify-center items-center w-[550px] p-5 bg-white gap-5">
        <div className="flex justify-center flex-col items-start w-full mb-5">
          <Image src={Logo} alt="app_logo" className="mb-6" />
          <span className="text-3xl font-bold text-black">Sign Up</span>
          <span className="text-base font-light text-gray-800">
            Create an account and start shopping!
          </span>
        </div>
        <div className="flex flex-col w-full justify-center items-center bg-white gap-2">
         <Progress aria-label="Loading..." className="w-full mb-4" classNames={{
        indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
      }} value={1/3*currentStep*100} />

          {renderStep()}
          
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
                onClick={()=>dispatch(changeStatusLogin())}
                className="text-yellow-500 font-semibold cursor-pointer hover:underline"
              >
                Sign in
              </span>
            </p>
        </div>
      </Popup>
    );
  }
  return null;
}