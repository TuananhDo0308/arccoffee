import React, { useEffect, useState } from "react";
import { Form, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import Image from "next/image";
import Icon from "@/src/assets/icon.png";
import Icon2 from "@/src/assets/tickIcon.png";
import { clientLinks, httpClient } from "@/src/utils";

interface Region {
  id: string;
  name: string;
  cities: City[];
}

interface City {
  id: string;
  name: string;
  districts: { id: string; name: string }[];
}

interface Step3Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onPrev: () => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function Step3x({ formData, updateFormData, onPrev, onSubmit, loading }: Step3Props) {
  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>([]);

  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);
  const [streetError, setStreetError] = useState<string | null>(null);
  const [regionError, setRegionError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await httpClient.get({ url: clientLinks.user.region });
      setRegions(res.data.data.data);
      console.log("Regions fetched:", res.data.data);
    };
    fetchData();
  }, []);

  const validatePhoneNumber = (value: string) => {
    if (!value) return "Phone number is required";
    if (!/^[0-9]{10,15}$/.test(value)) return "Invalid phone number";
    return "";
  };

  const validateStreet = (value: string) => {
    if (!value) return "Street is required";
    return "";
  };

  const validateRegion = (value: string) => {
    if (!value) return "Region is required";
    return "";
  };

  const handleRegionChange = (e: any) => {
    const value = e.target.value;
    updateFormData("regionId", value);
    const selectedRegion = regions?.find((region) => region.id === value);
    setCities(selectedRegion?.cities || []);
  };

  const handleCityChange = (e: any) => {
    const value = e.target.value;
    updateFormData("cityId", value);
    const selectedCity = cities.find((city) => city.id === value);
    setDistricts(selectedCity?.districts || []);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneError = validatePhoneNumber(formData.phoneNumber);
    const streetValidation = validateStreet(formData.street);
    const regionValidation = validateRegion(formData.regionId);

    setPhoneNumberError(phoneError);
    setStreetError(streetValidation);
    setRegionError(regionValidation);

    if (!phoneError && !streetValidation && !regionValidation) {
      onSubmit();
    }
  };

  return (
    <Form className="flex flex-col w-full gap-5" onSubmit={handleSubmit}>
      <div className="flex gap-5 w-full">
        <Input
          variant="bordered"
          isRequired
          label="Phone Number"
          placeholder="Enter your phone number"
          value={formData.phoneNumber}
          onValueChange={(value) => updateFormData("phoneNumber", value)}
          errorMessage={phoneNumberError}
          isInvalid={!!phoneNumberError}
        />

        <Input
          variant="bordered"
          isRequired
          label="Street"
          placeholder="Enter your street"
          value={formData.street}
          onValueChange={(value) => updateFormData("street", value)}
          errorMessage={streetError}
          isInvalid={!!streetError}
        />
      </div>

      <div className="flex gap-3 w-full">
        <Select
          isRequired
          variant="bordered"
          label="Region"
          placeholder="Select Region"
          value={formData.regionId}
          onChange={handleRegionChange}
          errorMessage={regionError}
          isInvalid={!!regionError}
        >
          {regions.map((region) => (
            <SelectItem key={region.id} value={region.id}>
              {region.name}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="City"
          variant="bordered"
          placeholder="Select City"
          value={formData.cityId}
          onChange={handleCityChange}
          isDisabled={!formData.regionId}
        >
          {cities.map((city) => (
            <SelectItem key={city.id} value={city.id}>
              {city.name}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="District"
          variant="bordered"
          placeholder="Select District"
          value={formData.districtId}
          onChange={(e) => updateFormData("districtId", e.target.value)}
          isDisabled={!formData.cityId}
        >
          {districts.map((district) => (
            <SelectItem key={district.id} value={district.id}>
              {district.name}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex justify-end gap-7 flex-w w-full">
        <Image
          onClick={onPrev}
          alt="icon"
          src={Icon}
          width={30}
          height={30}
          className="cursor-pointer"
        />

        <Image
          onClick={handleSubmit}
          alt="icon"
          src={Icon2}
          width={30}
          height={30}
          className="cursor-pointer"
        />
      </div>
    </Form>
  );
}

