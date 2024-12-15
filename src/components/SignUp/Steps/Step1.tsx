import React, { useEffect, useState } from "react";
import { CalendarDate } from "@internationalized/date";
import { DateInput } from "@nextui-org/date-input";
import { Form, Input, Button } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";
import { setCurrentStep, updateFormData } from "@/src/slices/signUpFormdata";
import { clientLinks, httpClient } from "@/src/utils";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import Image from "next/image";
import Icon from "@/src/assets/icon.png";

export const gender = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
];
export default function Step1() {
  const dispatch = useAppDispatch();
  const { currentStep, formData } = useAppSelector((state) => state.signupData);

  const [firstNameError, setFirstNameError] = React.useState<string | null>(
    null
  );
  const [lastNameError, setLastNameError] = React.useState<string | null>(null);
  const [genderError, setGenderError] = React.useState<string | null>(null);
  const [dateError, setDateError] = React.useState<string>("");

  const nextStep = () => {
    dispatch(setCurrentStep(currentStep + 1));
  };
  const onSubmit = (e: any) => {
    e.preventDefault();

    // Validate tất cả các trường
    const firstNameError = validateFirstName();
    const lastNameError = validateLastName();
    const dateValidationError = validateDate(date);
    const genderValidationError = validateGender(formData.Gender);

    // Cập nhật lỗi
    setFirstNameError(firstNameError);
    setLastNameError(lastNameError);
    setDateError(dateValidationError);
    setGenderError(genderValidationError);

    // Kiểm tra nếu tất cả các trường hợp đều hợp lệ
    if (
      !firstNameError &&
      !lastNameError &&
      !dateValidationError &&
      !genderValidationError
    ) {
      nextStep(); // Chuyển sang bước tiếp theo
    }
  };

  const handleChange = (field: any, value: any) => {
    dispatch(updateFormData({ field, value }));
  };

  //____________FirstName__________________
  const validateFirstName = () => {
    if (formData.FirstName == "") {
      setFirstNameError("Last Name is required");
      return "First Name is required";
    } else {
      setFirstNameError("");
      return "";
    }
  };
  const handleFirstNameChange = (value: string) => {
    handleChange("FirstName", value);
  };
  const isInvalidFirstName = React.useMemo(() => {
    if (validateFirstName() == "") {
      return false;
    } else {
      return true;
    }
  }, [formData.FirstName]);

  //____________LastName__________________
  const validateLastName = () => {
    if (formData.LastName == "") {
      setLastNameError("Last Name is required");
      return "Last Name is required";
    } else {
      setLastNameError(null);
      return "";
    }
  };
  const handleLastNameChange = (value: string) => {
    handleChange("LastName", value);
  };
  const isInvalidLasttName = React.useMemo(() => {
    if (validateLastName() == "") {
      return false;
    } else {
      return true;
    }
  }, [formData.LastName]);

  //____________DoB__________________
  const validateDate = (date: CalendarDate | null) => {
    if (!date) {
      return "Birth date is required";
    } else {
      const today = new Date();
      const birthDate = new Date(date.year, date.month - 1, date.day);
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 10) {
        return "You must be at least 10 years old";
      }
      return ""; // Không có lỗi
    }
  };
  const handleDateChange = (date: CalendarDate | null) => {
    if (date) {
      handleChange("Year", date.year);
      handleChange("Month", date.month);
      handleChange("Day", date.day);
    }
    validateDate(date);
  };
  const date = React.useMemo(() => {
    if (formData.Year && formData.Month && formData.Day) {
      return new CalendarDate(formData.Year, formData.Month, formData.Day);
    }
    return null; // Trả về null nếu không có đủ thông tin
  }, [formData.Year, formData.Month, formData.Day]);

  const isInvalidDate = React.useMemo(() => {
    const error = validateDate(date);
    setDateError(error); // Chỉ set lỗi trong `useMemo`
    return error !== ""; // Trả về true nếu có lỗi
  }, [date]);

  //____________Gender__________________
  const validateGender = (gender: string | null) => {
    if (!gender) {
      return "Gender is required";
    }
    return ""; // Không có lỗi
  };
  const isInvalidGender = React.useMemo(() => {
    const error = validateGender(formData.Gender);
    setGenderError(error); // Cập nhật trạng thái lỗi
    return error !== ""; // Trả về `true` nếu có lỗi
  }, [formData.Gender]);

  return (
    <Form className="flex flex-col w-full gap-5" onSubmit={onSubmit}>
      {/* First Name */}
      <div className="flex w-full gap-4">
        <Input
          isRequired
          className="max-w-xs flex-grow"
          label="First Name"
          color={isInvalidFirstName ? "danger" : "default"}
          variant="bordered"
          defaultValue={formData.FirstName}
          errorMessage={firstNameError}
          validate={validateFirstName}
          isInvalid={isInvalidFirstName}
          onValueChange={handleFirstNameChange}
        />
        <Input
          isRequired
          className="max-w-xs"
          label="Last Name"
          variant="bordered"
          defaultValue={formData.LastName}
          errorMessage={lastNameError}
          color={isInvalidLasttName ? "danger" : "default"}
          isInvalid={isInvalidLasttName}
          onValueChange={handleLastNameChange}
          validate={validateLastName}
        />
      </div>

      {/* Date of Birth */}
      <div className="flex w-full gap-4">
        <div className="flex-grow">
          <DateInput
            isRequired
            label="Birth date"
            placeholderValue={new CalendarDate(1995, 11, 6)} // Placeholder
            variant="bordered"
            value={date} // Lấy giá trị từ formData
            color={isInvalidDate ? "danger" : "default"}
            isInvalid={isInvalidDate}
            onChange={handleDateChange}
            errorMessage={dateError}
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-1 flex-grow">
          <Select
            isRequired
            errorMessage={genderError} // Hiển thị lỗi
            className="max-w-xs"
            items={gender}
            onSelectionChange={(value) => {
              handleChange("Gender", value.currentKey);
            }}
            label="Gender"
            placeholder="Select gender"
            variant="bordered"
            color={isInvalidGender ? "danger" : "default"} // Đổi màu khi có lỗi
            isInvalid={isInvalidGender} // Đánh dấu là không hợp lệ
            value={formData.Gender}
          >
            {(gender) => <SelectItem>{gender.label}</SelectItem>}
          </Select>
        </div>
      </div>
      <div className="flex justify-end flex-w w-full">
          <Image
           onClick={onSubmit}
            alt="icon"
            src={Icon}
            width={30}
            height={30}
            className="rotate-180"
          />
      </div>
    </Form>
  );
}
