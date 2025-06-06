import React, { useEffect, useState, useMemo } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Input, Form } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";
import { setCurrentStep, updateFormData } from "@/src/slices/signUpFormdata";
import { apiLinks, clientLinks, httpClient } from "@/src/utils";
import Icon2 from "@/src/assets/tickIcon.png";
import Icon from "@/src/assets/icon.png";
import Image from "next/image";
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

const Step3 = () => {
  const dispatch = useAppDispatch();
  const { currentStep, formData } = useAppSelector((state) => state.signupData);

  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>([]);
  


  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);
  const [streetError, setStreetError] = useState<string | null>(null);
  const [regionError, setRegionError] = useState<string | null>(null);

  const prevStep = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await httpClient.get({ url: clientLinks.user.region });
      setRegions(res.data.data.data);
    };
    fetchData();
  }, []);

  //______________________________________________

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

  //______________________________________________

  const handleRegionChange = (e: any) => {
    const value = e.target.value;
    dispatch(updateFormData({ field: "RegionId", value }));
    const selectedRegion = regions?.find((region: any) => region.id === value);

    setCities(selectedRegion?.cities || []);
  };

  const handleCityChange = (e: any) => {
    const value = e.target.value;
    dispatch(updateFormData({ field: "CityId", value }));
    const selectedCity = cities.find((city: any) => city.id === value);

    setDistricts(selectedCity?.districts || []);
  };

  const handleDistrictChange = (e: any) => {
    const value = e.target.value;
    dispatch(updateFormData({ field: "DistrictId", value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Kiểm tra các lỗi đầu vào
    const phoneError = validatePhoneNumber(formData.PhoneNumber);
    const streetValidation = validateStreet(formData.Street);
    const regionValidation = validateRegion(formData.RegionId);
  
    setPhoneNumberError(phoneError);
    setStreetError(streetValidation);
    setRegionError(regionValidation);
  
    if (!phoneError && !streetValidation && !regionValidation) {
          dispatch(setCurrentStep(4)); // Proceed to the next step

    } else {
      alert("Please fix the errors in the form before submitting.");
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
        value={formData.PhoneNumber}
        onValueChange={(value) =>
          dispatch(
            updateFormData({
              field: "PhoneNumber",
              value: value,
            })
          )
        }
        errorMessage={phoneNumberError}
        color={phoneNumberError ? "danger" : "default"}
        isInvalid={!!phoneNumberError}
      />

      <Input
            variant="bordered"

        isRequired
        label="Street"
        placeholder="Enter your street"
        value={formData.Street}
        onValueChange={(value) =>
          dispatch(updateFormData({ field: "Street", value: value }))
        }
        errorMessage={streetError}
        color={streetError ? "danger" : "default"}
        isInvalid={!!streetError}
      />
      </div>
      <div className="flex gap-3 w-full">
      <Select
        isRequired
        variant="bordered"

        label="Region"
        placeholder="Select Region"
        value={formData.DistrictId}
        onChange={handleRegionChange}
        errorMessage={regionError}
        color={regionError ? "danger" : "default"}
        isInvalid={!!regionError}
      >
        {regions.map((region: any) => (
          <SelectItem key={region.id} value={region.id}>
            {region.name}
          </SelectItem>
        ))}
      </Select>

      <Select
        label="City"
        variant="bordered"

        placeholder="Select City"
        value={formData.CityId}
        onChange={handleCityChange}
        disabled={!formData.RegionId}
        errorMessage={!formData.RegionId ? "Select a Region first" : undefined}
      >
        {cities.map((city: any) => (
          <SelectItem key={city.id} value={city.id}>
            {city.name}
          </SelectItem>
        ))}
      </Select>

      <Select
        label="District"
        variant="bordered"

        placeholder="Select District"
        value={formData.DistrictId}
        onChange={handleDistrictChange}
        disabled={!formData.CityId}
        errorMessage={!formData.CityId ? "Select a City first" : undefined}
      >
        {districts.map((district: any) => (
          <SelectItem key={district.id} value={district.id}>
            {district.name}
          </SelectItem>
        ))}
      </Select>
      </div>

      <div className="flex justify-end gap-7 flex-w w-full">
        <Image
          onClick={prevStep}
          alt="icon"
          src={Icon}
          width={30}
          height={30}
        />

        <Image
          onClick={handleSubmit}
          alt="icon"
          src={Icon2}
          width={30}
          height={30}
        />
      </div>
    </Form>
  );
};

export default Step3;
