import React, { useState } from 'react';
import { CalendarDate } from "@internationalized/date";
import { DateInput } from "@nextui-org/date-input";
import { Form, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import Image from "next/image";
import Icon from "@/src/assets/icon.png";

interface Step1Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
}

const gender = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
];

export default function Step1x({ formData, updateFormData, onNext }: Step1Props) {
  const [nameError, setNameError] = useState<string | null>(null);
  const [genderError, setGenderError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string>("");

  const validateGender = (gender: string | null) => {
    if (!gender) {
      return "Gender is required";
    }
    return "";
  };

  const validateDate = (date: CalendarDate | null) => {
    if (!date) {
      return "Birth date is required";
    }
    const today = new Date();
    const birthDate = new Date(date.year, date.month - 1, date.day);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 10) {
      return "You must be at least 10 years old";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const genderValidation = validateGender(formData.gender);
    const dateValidation = validateDate(date);

    setGenderError(genderValidation);
    setDateError(dateValidation);

    if ( !genderValidation && !dateValidation) {
      onNext();
    }
  };

  const date = React.useMemo(() => {
    if (formData.year && formData.month && formData.day) {
      return new CalendarDate(formData.year, formData.month, formData.day);
    }
    return null;
  }, [formData.year, formData.month, formData.day]);

  const handleDateChange = (date: CalendarDate | null) => {
    if (date) {
      updateFormData("year", date.year);
      updateFormData("month", date.month);
      updateFormData("day", date.day);
    }
  };

  return (
    <Form className="flex flex-col w-full gap-5" onSubmit={handleSubmit}>
      <div className="flex w-full gap-4">
        <div className="flex-grow">
          <DateInput
            isRequired
            label="Birth date"
            placeholderValue={new CalendarDate(1995, 11, 6)}
            variant="bordered"
            value={date}
            isInvalid={!!dateError}
            onChange={handleDateChange}
            errorMessage={dateError}
          />
        </div>

        <div className="flex flex-col gap-1 flex-grow">
          <Select
            isRequired
            items={gender}
            label="Gender"
            placeholder="Select gender"
            variant="bordered"
            errorMessage={genderError}
            isInvalid={!!genderError}
            value={formData.gender}
            onSelectionChange={(value) => updateFormData("gender", value.currentKey)}
          >
            {(gender) => <SelectItem key={gender.key}>{gender.label}</SelectItem>}
          </Select>
        </div>
      </div>

      <div className="flex justify-end flex-w w-full">
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

