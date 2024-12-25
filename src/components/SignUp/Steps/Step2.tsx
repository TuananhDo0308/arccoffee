import React, { useState, useMemo } from "react";
import { Form, Input } from "@nextui-org/react";
import Image from "next/image";
import Icon from "@/src/assets/icon.png";
import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";
import { setCurrentStep, updateFormData } from "@/src/slices/signUpFormdata";

const Step2 = () => {
  const dispatch = useAppDispatch();
  const { currentStep, formData } = useAppSelector((state) => state.signupData);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  const nextStep = () => {
    dispatch(setCurrentStep(currentStep + 1));
  };
  const prevStep = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };

  // Validation functions
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
    if (value !== formData.Password) return "Passwords do not match";
    return "";
  };

  const isInvalidEmail = useMemo(() => {
    const error = validateEmail(formData.Email);
    setEmailError(error);
    return error !== "";
  }, [formData.Email]);

  const isInvalidPassword = useMemo(() => {
    const error = validatePassword(formData.Password);
    setPasswordError(error);
    return error !== "";
  }, [formData.Password]);

  const isInvalidConfirmPassword = useMemo(() => {
    const error = validateConfirmPassword(confirmPassword);
    setConfirmPasswordError(error);
    return error !== "";
  }, [confirmPassword, formData.Password]);

  const handleSubmit = () => {
    const emailValidation = validateEmail(formData.Email);
    const passwordValidation = validatePassword(formData.Password);
    const confirmPasswordValidation = validateConfirmPassword(confirmPassword);

    setEmailError(emailValidation);
    setPasswordError(passwordValidation);
    setConfirmPasswordError(confirmPasswordValidation);

    if (!emailValidation && !passwordValidation && !confirmPasswordValidation) {
      dispatch(setCurrentStep(3)); // Move to email verification step
    }
  };


  return (
    <Form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
      {/* Email */}
      <Input
        isRequired
        label="Email"
        defaultValue={formData.Email}
        variant="bordered"
        value={formData.Email}
        onValueChange={(value) => dispatch(updateFormData({ field: "Email", value }))}
        color={isInvalidEmail ? "danger" : "default"}
        isInvalid={isInvalidEmail}
        errorMessage={emailError}
      />

      {/* Password */}
      <Input
        isRequired
        type="password"
        label="Password"
        defaultValue={formData.Password}
        variant="bordered"
        value={formData.Password}
        onValueChange={(value) => dispatch(updateFormData({ field: "Password", value }))}
        color={isInvalidPassword ? "danger" : "default"}
        isInvalid={isInvalidPassword}
        errorMessage={passwordError}
      />

      {/* Confirm Password */}
      <Input
        isRequired
        type="password"
        label="Confirm Password"
        variant="bordered"
        value={confirmPassword}
        onValueChange={setConfirmPassword}
        color={isInvalidConfirmPassword ? "danger" : "default"}
        isInvalid={isInvalidConfirmPassword}
        errorMessage={confirmPasswordError}
      />

      {/* Submit Button */}
      <div className="flex justify-end gap-7 flex-w w-full">
        <Image
          onClick={prevStep}
          alt="icon"
          src={Icon}
          width={30}
          height={30}
        />

        <Image
          onClick={handleSubmit}
          alt="icon"
          src={Icon}
          width={30}
          height={30}
          className="rotate-180"
        />
      </div>
    </Form>
  );
};

export default Step2;
