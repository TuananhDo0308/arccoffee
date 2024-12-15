import React, { useState } from "react";

interface Props {
  handleChange: (field: string, value: any) => void;
  errors: { [key: string]: string };
}

export default function DateInput({ handleChange, errors }: Props) {
  const [dateValue, setDateValue] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDateValue(inputValue);

    // Kiểm tra định dạng ngày nhập vào
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dateRegex.test(inputValue)) {
      handleChange("dateOfBirth", "Invalid format (dd/mm/yyyy)");
      return;
    }

    const [day, month, year] = inputValue.split("/").map(Number);
    const inputDate = new Date(year, month - 1, day);
    if (
      inputDate.getDate() !== day ||
      inputDate.getMonth() !== month - 1 ||
      inputDate.getFullYear() !== year
    ) {
      handleChange("dateOfBirth", "Invalid date");
      return;
    }

    // Ngày hợp lệ -> Lưu thông tin ngày/tháng/năm
    handleChange("Day", day);
    handleChange("Month", month);
    handleChange("Year", year);
    handleChange("dateOfBirth", ""); // Xóa lỗi nếu có
  };

  return (
    <div className="flex flex-col gap-1">
      <p>Date of birth</p>
      <input
        type="text"
        placeholder="dd/mm/yyyy"
        value={dateValue}
        onChange={handleDateChange}
        className={`py-3 px-4 border rounded-lg text-base focus:outline-none focus:ring-2 ${
          errors.dateOfBirth ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.dateOfBirth && (
        <span className="text-red-500 text-sm">{errors.dateOfBirth}</span>
      )}
    </div>
  );
}
