"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";
import Popup from "../Popup";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import EmailVerification from "./Steps/EmailValid";
import Step3 from "./Steps/Step3";
import Image from "next/image";
import Logo from "@/src/assets/SingleLogoblack.png";
import { setCurrentStep } from "@/src/slices/signUpFormdata";
import { changeStatusSignup } from "@/src/slices/UIcomponentSlice/SignupPopUpSlice";
import { changeStatusLogin } from "@/src/slices/UIcomponentSlice/SigninPopUpSlice";
import { Progress } from "@nextui-org/react";

export default function SignUp() {
  const dispatch = useAppDispatch();
  const { currentStep, formData } = useAppSelector((state) => state.signupData);
  const status = useAppSelector((state) => state.signup.value);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 4:
        return <EmailVerification />;
      case 3:
        return <Step3 />;
      default:
        return null;
    }
  };
  const handleExit = () => {
    dispatch(setCurrentStep(1));
    dispatch(changeStatusSignup());
  }


  if (status) {
    return (
      <Popup togglePopup={handleExit}>
        <div className="flex flex-col justify-center items-center w-[550px] p-5 bg-white gap-5">
          <div className="flex justify-center flex-col items-start w-full mb-5">
            <Image src={Logo} alt="app_logo" className="mb-6" />
            <span className="text-3xl font-bold text-black">Sign Up</span>
            <span className="text-base font-light text-gray-800">
              Create an account and start shopping!
            </span>
          </div>
          <div className="flex flex-col w-full justify-center items-center bg-white gap-2">
            <Progress
              aria-label="Loading..."
              className="w-full mb-4"
              classNames={{
                indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
              }}
              value={(currentStep / 4) * 100}
            />

            {renderStep()}
          </div>
          {/* ... (rest of the component remains the same) */}
        </div>
      </Popup>
    );
  }
  return null;
}

