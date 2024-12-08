import React from "react";

interface Step1Props {
  formData: {Email: string;
    Password: string;  
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
          value={formData.Email}
          onChange={(e) => handleChange("Email", e.target.value)}
          className="flex-grow  py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>
      <div className="flex flex-col w-full">
        <p>Password:</p>
        <input
          type="text"
          placeholder="Password"
          value={formData.Password}
          onChange={(e) => handleChange("Password", e.target.value)}
          className="flex-grow py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>
        <input
          type="text"
          placeholder="Retype Password"
          value={formData.Password}
          onChange={(e) => handleChange("Password", e.target.value)}
          className="flex-grow py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
    </div>
  );
};

export default Step2;
