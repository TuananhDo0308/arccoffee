"use client"
import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";
import { clientLinks, httpClient } from "@/src/utils";
import { signIn } from "next-auth/react";
import defaultAva from "@/src/assets/user.png";
import Popup from "../../PopupMessage"; // Import your Popup component
import { showPopup } from "@/src/slices/message";

const EmailVerification = () => {
  const dispatch = useAppDispatch();
  const { formData } = useAppSelector((state) => state.signupData);
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoadingCode, setIsLoadingCode] = useState(false); // Loading state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  useEffect(() => {
    handleSendVerification();
  }, []); // Empty dependency array ensures it runs only once when the component mounts


  const handleSendVerification = async () => {
    try {
      setIsLoadingCode(true);
      await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.Email }),
      });
    } catch (error) {
      console.error("Error sending verification code:", error);
      dispatch(
        showPopup({
          message: "Failed to send verification code",
          type: "error",
        })
      );
    } finally {     
      dispatch(
      showPopup({
        message: "Verification code sent",
        type: "success",
      })
    );
      setIsLoadingCode(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading spinner
    try {
      const response = await fetch("/api/email/valid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.Email, code: verificationCode }),
      });

      const result = await response.json();
      if (result.success) {
        // FormData creation
        const formData1 = new FormData();
        formData1.append("Name", formData.Name || "");
        formData1.append("Email", formData.Email);
        formData1.append("Password", formData.Password);
        formData1.append("PhoneNumber", formData.PhoneNumber);
        formData1.append("Gender", formData.Gender);
        formData1.append("Year", formData.Year);
        formData1.append("Month", formData.Month);
        formData1.append("Day", formData.Day);
        formData1.append("RegionId", formData.RegionId || "");
        formData1.append("CityId", formData.CityId || "");
        formData1.append("DistrictId", formData.DistrictId || "");
        formData1.append("Street", formData.Street || "");

        // Fetch and attach avatar
        const response = await fetch(defaultAva.src);
        if (!response.ok) throw new Error("Failed to fetch default avatar");
        const blob = await response.blob();
        const file = new File([blob], "defaultAva.png", { type: blob.type });
        formData1.append("Picture", file);

        // Send data to the server
        const res = await httpClient.post({
          url: clientLinks.user.register,
          data: formData1,
          contentType: "multipart/form-data",
        });

        if (res?.data?.data) {
          await signIn("credentials", {
            email: formData.Email,
            password: formData.Password,
            callbackUrl: "/",
          });
        } else {
          dispatch(
            showPopup({
              message: "Registration failed. Please try again.",
              type: "error",
            })
          );
        }
      } else {
        dispatch(
          showPopup({
            message:"Invalid verification code" ,
            type: "error",
          })
        );
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      dispatch(
        showPopup({
          message: "Failed to verify email",
          type: "error",
        })
      );
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  return (
    <Form onSubmit={handleVerify} className="flex flex-col w-full gap-5">
      <h2 className="text-xl font-semibold">Email Verification</h2>
      <p>We've sent a verification code to {formData.Email}</p>
      <Input
        label="Verification Code"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        placeholder="Enter verification code"
      />
      <div className="flex justify-between w-full">
        <Button
          type="button"
          onClick={handleSendVerification}
          disabled={isLoadingCode} // Disable while loading
        >
          {isLoadingCode ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Resend Code"
          )}
        </Button>
        <Button
          type="submit"
          color="primary"
          disabled={isLoading} // Disable while loading
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Verify"
          )}
        </Button>
      </div>
    </Form>
  );
};

export default EmailVerification;
