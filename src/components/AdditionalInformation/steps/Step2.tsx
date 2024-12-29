import React, { useState, useMemo } from "react";
import { Form, Input } from "@nextui-org/react";
import Image from "next/image";
import Icon from "@/src/assets/icon.png";

interface Step2Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step2x({ formData, updateFormData, onNext, onPrev }: Step2Props) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Email is required";
    if (!emailRegex.test(value)) return "Invalid email format";
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters long";
    return "";
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) return "Confirm Password is required";
    if (value !== formData.password) return "Passwords do not match";
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    const confirmPasswordValidation = validateConfirmPassword(confirmPassword);

    setEmailError(emailValidation);
    setPasswordError(passwordValidation);
    setConfirmPasswordError(confirmPasswordValidation);

    if (!emailValidation && !passwordValidation && !confirmPasswordValidation) {
      onNext();
    }
  };

  return (
    <Form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
      <Input
        isRequired
        label="Email"
        variant="bordered"
        value={formData.email}
        onValueChange={(value) => updateFormData("email", value)}
        errorMessage={emailError}
        isInvalid={!!emailError}
      />

      <Input
        isRequired
        type="password"
        label="Password"
        variant="bordered"
        value={formData.password}
        onValueChange={(value) => updateFormData("password", value)}
        errorMessage={passwordError}
        isInvalid={!!passwordError}
      />

      <Input
        isRequired
        type="password"
        label="Confirm Password"
        variant="bordered"
        value={confirmPassword}
        onValueChange={setConfirmPassword}
        errorMessage={confirmPasswordError}
        isInvalid={!!confirmPasswordError}
      />

      <div className="flex justify-end gap-7 flex-w w-full">
        <Image
          onClick={onPrev}
          alt="icon"
          src={Icon}
          width={30}
          height={30}
          className="cursor-pointer"
        />

        <Image
          onClick={handleSubmit}
          alt="icon"
          src={Icon}
          width={30}
          height={30}
          className="rotate-180 cursor-pointer"
        />
      </div>
    </Form>
  );
}

