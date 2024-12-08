import { clientLinks, httpClient } from "@/src/utils";
import React, { useEffect, useState } from "react";

interface Step3Props {
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
  handleChange: (field: string, value: string | File | null) => void;
}
export default function Step3({ formData, handleChange }: Step3Props) {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await httpClient.get({
        url: clientLinks.user.region,
      });
      console.log(res);
      setRegions(res.data.data);
    };
    fetchData();
  }, []);

  const handleRegionChange = (RegionId: string) => {
    handleChange("RegionId", RegionId);
    handleChange("CityId", "");
    handleChange("DistrictId", "");

    const selectedRegion = regions.find(
      (region: any) => region.id === RegionId
    );
    setCities(selectedRegion?.cities || []);
    setDistricts([]);
  };

  const handleCityChange = (CityId: string) => {
    handleChange("CityId", CityId);
    handleChange("DistrictId", "");

    const selectedCity = cities.find((city: any) => city.id === CityId);
    setDistricts(selectedCity?.districts || []);
  };

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex flex-col w-full">
        <p>Phone Number</p>
        <input
          type="text"
          placeholder="Phone Number"
          value={formData.PhoneNumber}
          onChange={(e) => handleChange("PhoneNumber", e.target.value)}
          className=" py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div className="flex flex-col w-full">
        <p>Address</p>
        <input
          type="text"
          placeholder="Street *"
          value={formData.Street}
          onChange={(e) => handleChange("Street", e.target.value)}
          className="flex-grow  py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>

      <div className="flex gap-1 justify-between">
        {/* Region */}
        <select
          value={formData.RegionId}
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
          value={formData.CityId}
          onChange={(e) => handleCityChange(e.target.value)}
          className="  py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          disabled={!formData.RegionId} // Disable if no region selected
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
          value={formData.DistrictId}
          onChange={(e) => handleChange("DistrictId", e.target.value)}
          className="py-3 px-4 border rounded-lg text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          disabled={!formData.CityId} // Disable if no city selected
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
