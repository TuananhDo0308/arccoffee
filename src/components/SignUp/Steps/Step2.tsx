import React from "react";

interface Step1Props {
  formData: {
    firstName: string; // FirstName
    lastName: string; // LastName
    email: string; // Email
    password: string; // Password
    phoneNumber: string; // PhoneNumber
    gender: string; // Gender
    year: string; // Year
    month: string; // Month
    day: string; // Day
    regionId: string; // RegionId
    cityId: string; // CityId
    districtId: string; // DistrictId
    street: string; // Street
    picture: File | null; // Picture
  };
  handleChange: (field: string, value: string | File | null) => void;
}

const Step2: React.FC<Step1Props> = ({ formData, handleChange }) => {
  return (
    <div className="flex flex-col gap-5 px-0 w-full">
      <div className="flex flex-col w-full">
        <p>Email:</p>
        <input
          type="text"
          placeholder="Email"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          className="flex-grow  py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>
      <div className="flex flex-col w-full">
        <p>Password:</p>
        <input
          type="text"
          placeholder="Password"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          className="flex-grow py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>
        <input
          type="text"
          placeholder="Retype password"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          className="flex-grow py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
    </div>
  );
};

export default Step2;
