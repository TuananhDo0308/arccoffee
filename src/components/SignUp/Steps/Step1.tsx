import { clientLinks, httpClient } from "@/src/utils";
import React, { useEffect, useState } from "react";

interface Step1Props {
  formData: {
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Gender: string;
    Year: number;
    Month: number;
    Day: number;
    RegionId: string;
    CityId: string;
    DistrictId: string;
    Street: string;
  };
  handleChange: (field: string, value: string|number | File | null) => void;
}
export default function Step1({ formData, handleChange }: Step1Props) {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [errors, setErrors] = useState<any>({}); // Lưu trạng thái lỗi

  useEffect(() => {
    const fetchData = async () => {
      const res = await httpClient.get({
        url: clientLinks.user.region,
      });
      setRegions(res.data.data);
    };
    fetchData();
  }, []);

  const validateInputs = () => {
    const newErrors: any = {};
    if (!formData.FirstName) newErrors.FirstName = "First Name is required";
    if (!formData.LastName) newErrors.LastName = "Last Name is required";
    if (!formData.Gender) newErrors.Gender = "Gender is required";
    if (!formData.Year || !formData.Month || !formData.Day) {
      newErrors.dateOfBirth = "Date of Birth is required";
    } else {
      const dob = new Date(formData.Year, formData.Month - 1, formData.Day);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 10) newErrors.dateOfBirth = "You must be at least 10 years old";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    validateInputs(); // Kiểm tra lỗi khi người dùng rời khỏi input
  };

  return (
    <div className="flex flex-col w-full gap-5">
      {/* First Name */}
      <div className="flex flex-col w-full">
        <p>Name</p>
        <div className="flex w-full gap-4">
          <input
            type="text"
            placeholder="First Name *"
            value={formData.FirstName}
            onChange={(e) => handleChange("FirstName", e.target.value)}
            onBlur={() => handleBlur("FirstName")}
            className={`flex-grow py-3 px-4 border rounded-lg text-base ${
              errors.FirstName ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
            required
          />
          {errors.FirstName && (
            <span className="text-red-500 text-sm">{errors.FirstName}</span>
          )}
          <input
            type="text"
            placeholder="Last Name *"
            value={formData.LastName}
            onChange={(e) => handleChange("LastName", e.target.value)}
            onBlur={() => handleBlur("LastName")}
            className={`flex-grow py-3 px-4 border rounded-lg text-base ${
              errors.LastName ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
            required
          />
          {errors.LastName && (
            <span className="text-red-500 text-sm">{errors.LastName}</span>
          )}
        </div>
      </div>

      {/* Date of Birth */}
      <div className="flex w-full gap-4">
        <div className="flex flex-col gap-1 flex-grow-[2]">
          <p>Date of birth</p>
          <input
            type="date"
            onChange={(e) => {
              const date = new Date(e.target.value);
              handleChange("Year", date.getFullYear()); // Chuyển đổi thành kiểu số
              handleChange("Month", date.getMonth() + 1); // Tháng cần +1
              handleChange("Day", date.getDate()); // Ngày
            }}
            onBlur={() => handleBlur("dateOfBirth")}
            className={`flex-grow-[2] py-3 px-4 border rounded-lg text-base ${
              errors.dateOfBirth ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
          />
          {errors.dateOfBirth && (
            <span className="text-red-500 text-sm">{errors.dateOfBirth}</span>
          )}
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-1 flex-grow">
          <p>Gender</p>
          <select
            value={formData.Gender}
            onChange={(e) => handleChange("Gender", e.target.value)}
            onBlur={() => handleBlur("Gender")}
            className={`flex-grow-[1] py-3 px-4 border rounded-lg text-base ${
              errors.Gender ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.Gender && (
            <span className="text-red-500 text-sm">{errors.Gender}</span>
          )}
        </div>
      </div>
    </div>
  );
}