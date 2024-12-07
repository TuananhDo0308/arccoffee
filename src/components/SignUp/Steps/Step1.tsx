import { clientLinks, httpClient } from "@/src/utils";
import React, { useEffect, useState } from "react";

interface Step1Props {
  formData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: string;
    year: string;
    month: string;
    day: string;
    regionId: string;
    cityId: string;
    districtId: string;
    street: string;
  };
  handleChange: (field: string, value: string | File | null) => void;
}

export default function Step1({ formData, handleChange }: Step1Props) {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await httpClient.get({
        url: clientLinks.user.region,
      });
      setRegions(res.data.data);
    };
    fetchData();
  }, []);
  
  return (
    <div className="flex flex-col w-full gap-5">
      {/* First Name */}
      <div className="flex flex-col w-full">
      <p>Name</p>

      <div className="flex w-full gap-4">
        <input
          type="text"
          placeholder="First Name *"
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          className="flex-grow  py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
        {/* Last Name */}
        <input
          type="text"
          placeholder="Last Name *"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          className="flex-grow  py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>
      </div>


      <div className="flex w-full gap-4">
      <div className="flex flex-col gap-1 flex-grow-[2]">
      <p>Date of birth</p>

      <input
        type="date"
        onChange={(e) => {
          const date = new Date(e.target.value);
          handleChange("year", date.getFullYear().toString());
          handleChange("month", (date.getMonth() + 1).toString());
          handleChange("day", date.getDate().toString());
        }}
        className="flex-grow-[2]  py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>
        {/* Gender */}
        <div className="flex flex-col gap-1 flex-grow">
        <p>Gender</p>

        <select
            value={formData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="flex-grow-[1]  py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          </div>
       
      </div>

      {/* Street */}
    </div>
  );
}
