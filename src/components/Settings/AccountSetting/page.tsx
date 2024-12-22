"use client";

import React, { useEffect, useState } from "react";
import { apiLinks, clientLinks, httpClient } from "@/src/utils";
import Image from "next/image";
import { DateInput } from "@nextui-org/date-input";
import { CalendarDate } from "@internationalized/date";

// User interface
interface User {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string;
  year: number;
  month: number;
  day: number;
  regionId: string;
  cityId: string;
  districtId: string;
  street: string;
  picture: string | File | null; // Hỗ trợ cả URL, File, và null
}

interface City {
  id: string;
  name: string;
  districts: { id: string; name: string }[];
}

interface Region {
  id: string;
  name: string;
  cities: City[];
}

const AccountSettings = ({boxShadow,shadow}:any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [ user, setUser] = useState<User | null>(null);

  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await httpClient.get({ url: clientLinks.user.region });
        const response = await httpClient.get({
          url: clientLinks.user.getProfile,
        });
        setUser(response.data.data);
        setRegions(res.data.data);

        const userRegion = res.data.data.find(
          (region: any) => region.id === response.data.data.regionId
        );

        setCities(userRegion?.cities || []);

        const userCity = userRegion?.cities.find(
          (city: any) => city.id === response.data.data.cityId
        );

        setDistricts(userCity?.districts || []);
      } catch (err) {
        console.error("Có lỗi khi lấy dữ liệu:", err);
      }
    };
    fetchData();
  }, []);

  // Handle Edit Button
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleRegionChange = (e: any) => {
    const value = e.target.value;
    const selectedRegion = regions?.find((region) => region.id === value);
  
    // Lấy city đầu tiên và district đầu tiên của region mới
    const firstCity = selectedRegion?.cities?.[0] || null;
    const firstDistrict = firstCity?.districts?.[0] || null;
  
    setCities(selectedRegion?.cities || []); // Cập nhật cities
    setDistricts(firstCity?.districts || []); // Cập nhật districts
   
    // Cập nhật state user với cityId và districtId mới
    setUser((prevUser) =>
      prevUser
        ? {
            ...prevUser,
            regionId: value, // Gán region mới
            cityId: firstCity?.id || "", // city đầu tiên
            districtId: firstDistrict?.id || "", // district đầu tiên
          }
        : null
    );
  };
  

  const handleCityChange = (e: any) => {
    const value = e.target.value;
  
    // Tìm city được chọn
    const selectedCity = cities.find((city) => city.id === value);
  
    // Lấy district đầu tiên của city
    const firstDistrict = selectedCity?.districts?.[0] || null;
  
    // Cập nhật danh sách districts
    setDistricts(selectedCity?.districts || []);
  
    // Cập nhật state user với cityId và districtId mặc định
    setUser((prevUser) =>
      prevUser
        ? {
            ...prevUser,
            cityId: value, // Cập nhật city mới
            districtId: firstDistrict?.id || "", // Gán district đầu tiên
          }
        : null
    );
  };
  
  const handleDistrictChange = (e: any) => {
    handleInputChange(e);
  };

  // Handle Input Change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as any;
    setUser((prevUser) =>
      prevUser
        ? {
            ...prevUser,
            [name]: files ? files[0] : value, // Handle file input
          }
        : null
    );
  };
  const date = React.useMemo(() => {
    if (user?.year && user.month && user.day) {
      return new CalendarDate(user?.year, user.month, user.day);
    }
    return null; // Trả về null nếu không có đủ thông tin
  }, [user?.year, user?.month, user?.day]);

  const handleSave = async () => {
    if (user) {
      const formData = new FormData();
      console.log(user?.picture);

      formData.append("Year", user.year);
      formData.append("Month", user.month);
      formData.append("Day", user.day);

      formData.append("Name", user.name);
      formData.append("Email", user.email);
      formData.append("Password", user.password);
      formData.append("PhoneNumber", user.phoneNumber);
      formData.append("Gender", user.gender);
      formData.append("regionId", user.regionId);
      formData.append("cityId", user.cityId);
      formData.append("districtId", user.districtId);
      formData.append("street", user.street);
      if (user.picture instanceof File) {
        formData.append("Picture", user.picture, user.picture.name);
      } else {
        formData.append("Picture", null);
      }
      console.log(formData);

      try {
        await httpClient.put({
          url: clientLinks.user.updateProfile,
          data: formData,
          contentType: "multipart/form-data",
        });
        setIsEditing(false);
      } catch (err) {
        console.error("Có lỗi khi lưu dữ liệu:", err);
      }
    }
  };
  const handleDateChange = (date: CalendarDate | null) => {
    if (date) {
      const { year, month, day } = date; // Trích xuất năm, tháng, ngày từ CalendarDate
      setUser((prevUser) =>
        prevUser
          ? {
              ...prevUser,
              year, // Gán giá trị year
              month, // Gán giá trị month
              day, // Gán giá trị day
            }
          : null
      );
    }
  };

  return (
    <div className="rounded-xl w-full max-h-[calc(100vh-200px)] overflow-auto my-10 bg-white/10 text-white px-10 py-8 shadow-lg backdrop-blur-lg">
      {/* Header */}
      <div className="pt-4">
        {user?.picture && (
          <Image
            src={
              user.picture instanceof File
                ? URL.createObjectURL(user.picture) // Nếu là file mới
                : user.picture // Nếu là URL cũ
            }
            height={40}
            width={40}
            alt="Profile"
            className="mt-2 w-20 h-20 rounded-full object-cover"
          />
        )}
        {isEditing && (
          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleInputChange}
            className="block w-full text-sm text-white
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
          />
        )}
        <h1 className="text-2xl font-semibold">Welcome back {user?.name}</h1>
      </div>
      <SectionDivider />

      {/* Email */}
      <p className="py-2 text-xl font-semibold">Email Address</p>
      <p>
        Your email address is <strong>{user?.email}</strong>
      </p>
      <SectionDivider />

      {/* Basic Information */}
      <div className="flex justify-between">
        <p className="py-2 text-xl font-semibold">Your Information</p>
        {!isEditing ? (
          <button onClick={handleEdit} className="py-2 text-xl font-semibold">
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="py-2 text-xl font-semibold text-blue-400"
          >
            Save
          </button>
        )}
      </div>
      <div className="flex w-full items-end row gap-3">
        <InputField
          label="Name"
          placeholder={user?.name || ""}
          name="name"
          value={user?.name || ""}
          disabled={!isEditing}
          onChange={handleInputChange}
        />
        <InputField
          label="Phone Number"
          placeholder={user?.phoneNumber || ""}
          name="phoneNumber"
          value={user?.phoneNumber || ""}
          disabled={!isEditing}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex w-full items-end row gap-3">
        <DateInput
          isRequired
          isDisabled={!isEditing}
          label="Birth date"
          placeholderValue={new CalendarDate(1995, 11, 6)} // Placeholder
          variant="bordered"
          value={date} // Lấy giá trị từ formData
          onChange={handleDateChange}
          className="w-[400px]"
        />
        <SelectField
          label="Gender"
          name="gender"
          value={user?.gender || ""}
          disabled={!isEditing}
          onChange={handleInputChange}
          options={[
            { id: "male", name: "Male" },
            { id: "female", name: "Female" },
          ]}
        />
      </div>
      <div className="flex mt-4 w-full row gap-3">
        <InputField
          label="Address"
          placeholder={user?.street || ""}
          name="street"
          value={user?.street || ""}
          disabled={!isEditing}
          onChange={handleInputChange}
        />
        <SelectField
          label="Region"
          name="regionId"
          value={user?.regionId}
          disabled={!isEditing}
          onChange={handleRegionChange}
          options={regions}
        />
        <SelectField
          label="City"
          name="cityId"
          value={user?.cityId}
          disabled={!isEditing}
          onChange={handleCityChange}
          options={cities}
        />
        <SelectField
          label="District"
          name="districtId"
          value={user?.districtId}
          disabled={!isEditing}
          onChange={handleDistrictChange}
          options={districts}
        />
      </div>

      {/* Password Section */}


    </div>
  );
};

export default AccountSettings;

// InputField Component
const InputField = ({
  label,
  name,
  value,
  placeholder,
  disabled,
  onChange,
  type = "text",
}: any) => (
  <label className="flex gap-2 w-[300px] flex-col">
    <span className="text-sm text-white/60">{label}</span>
    <input
      name={name}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      type={type}
      className="w-full rounded-md bg-transparent border-2 border-white/20 px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-300 disabled:opacity-50"
    />
  </label>
);

// SelectField Component
const SelectField = ({
  label,
  name,
  value,
  options,
  disabled,
  onChange,
}: any) => (
  <label className="flex gap-2 w-[170px] flex-col">
    <span className="text-sm text-white/60">{label}</span>
    <select
      name={name}
      value={value}
      disabled={disabled}
      onChange={onChange}
      className="w-full rounded-md bg-transparent border-2 border-white/20 px-4 py-2 text-white focus:outline-none focus:border-blue-300 disabled:opacity-50"
    >
      <option value="" disabled>
        Select {label}
      </option>
      {options.map((option: any) => (
        <option key={option.id} value={option.id} className="text-black">
          {option.name}
        </option>
      ))}
    </select>
  </label>
);

// Section Divider
const SectionDivider = () => <hr className="mt-4 mb-8 border-white/20" />;
