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

  const handleRegionChange = (regionId: string) => {
    handleChange("regionId", regionId);
    handleChange("cityId", "");
    handleChange("districtId", "");

    const selectedRegion = regions.find(
      (region: any) => region.id === regionId
    );
    setCities(selectedRegion?.cities || []);
    setDistricts([]);
  };

  const handleCityChange = (cityId: string) => {
    handleChange("cityId", cityId);
    handleChange("districtId", "");

    const selectedCity = cities.find((city: any) => city.id === cityId);
    setDistricts(selectedCity?.districts || []);
  };

  return (
    <div className="flex flex-col w-full gap-5">
            <div className="flex flex-col w-full">

      <p>Phone Number</p>
      <input
        type="text"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={(e) => handleChange("phoneNumber", e.target.value)}
        className=" py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      </div>

      <div className="flex flex-col w-full">

      <p>Address</p>
      <input
        type="text"
        placeholder="Street *"
        value={formData.street}
        onChange={(e) => handleChange("street", e.target.value)}
        className="flex-grow  py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        required
      />
      </div>


      <div className="flex gap-1 justify-between">
        {/* Region */}
        <select
          value={formData.regionId}
          onChange={(e) => handleRegionChange(e.target.value)}
          className="  py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        >
          <option value="" disabled>
            Select Region *
          </option>
          {regions.map((region: any) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>

        {/* City */}
        <select
          value={formData.cityId}
          onChange={(e) => handleCityChange(e.target.value)}
          className="  py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          disabled={!formData.regionId} // Disable if no region selected
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((city: any) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>

        {/* District */}
        <select
          value={formData.districtId}
          onChange={(e) => handleChange("districtId", e.target.value)}
          className="py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          disabled={!formData.cityId} // Disable if no city selected
        >
          <option value="" disabled>
            Select District
          </option>
          {districts.map((district: any) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
      </div>
      {/* Street */}
    </div>
  );
}
