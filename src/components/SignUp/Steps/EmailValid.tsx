import defaultAva from "@/src/assets/user.png";
import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";
import { setCurrentStep, updateFormData } from "@/src/slices/signUpFormdata";
import { clientLinks, httpClient } from "@/src/utils";
import { Form, Input, Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

const EmailVerification = () => {
  const dispatch = useAppDispatch();
  const { formData } = useAppSelector((state) => state.signupData);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");

  const handleSendVerification = async () => {
    try {
      await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.Email }),
      });
      alert("Verification code sent to your email");
    } catch (error) {
      console.error("Error sending verification code:", error);
      setError("Failed to send verification code");
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
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
        // Tạo FormData
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

        // Tải ảnh từ URL và chuyển đổi thành File
        const response = await fetch(defaultAva.src);
        if (!response.ok) throw new Error("Failed to fetch default avatar");
        const blob = await response.blob();
        const file = new File([blob], "defaultAva.png", { type: blob.type });
        formData1.append("Picture", file);

        // Gửi dữ liệu
        const res = await httpClient.post({
          url: clientLinks.user.register,
          data: formData1,
          contentType: "multipart/form-data",
        });

        // Kiểm tra phản hồi từ API
        if (res?.data?.data) {
          await signIn("credentials", {
            email: formData.Email,
            password: formData.Password,
            callbackUrl: "/",
          });
        } else {
          console.error("Error:", res.data.message || "Unknown error");
          alert(res.data.message || "Registration failed. Please try again.");
        }
      } else {
        setError("Invalid verification code");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      setError("Failed to verify email");
    }
  };

  return (
    <Form onSubmit={handleVerify} className="space-y-4">
      <h2 className="text-xl font-semibold">Email Verification</h2>
      <p>We've sent a verification code to {formData.Email}</p>
      <Input
        label="Verification Code"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        placeholder="Enter verification code"
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-between">
        <Button type="button" onClick={handleSendVerification}>
          Resend Code
        </Button>
        <Button type="submit" color="primary">
          Verify
        </Button>
      </div>
    </Form>
  );
};

export default EmailVerification;
