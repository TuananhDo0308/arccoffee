import React from 'react';

interface SelectOption {
  id: string;
  name: string;
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

interface CustomerInformationProps {
  customerNote: string;
  setCustomerNote: (note: string) => void;
  address: string;
  setAddress: (address: string) => void;
  district: string;
  setDistrict: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  city: string;
  setCity: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  cityOptions: City[];
  districtOptions: SelectOption[];
  region: string;
  setRegion: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  regionOptions: Region[];
}

export function CustomerInformation({
  customerNote,
  setCustomerNote,
  address,
  setAddress,
  district,
  setDistrict,
  city,
  setCity,
  phoneNumber,
  setPhoneNumber,
  cityOptions,
  districtOptions,
  region,
  setRegion,
  regionOptions,
}: CustomerInformationProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg">
      <div className="border-b border-zinc-800 p-4">
        <h4 className="text-xl font-bold text-white">Thông tin khách hàng</h4>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <label htmlFor="customerNote" className="block text-sm font-medium text-white mb-1">
            Ghi chú
          </label>
          <input
            id="customerNote"
            type="text"
            placeholder="Nhập ghi chú của bạn"
            value={customerNote}
            onChange={(e) => setCustomerNote(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-white mb-1">
            Địa chỉ
          </label>
          <input
            id="address"
            type="text"
            placeholder="Nhập địa chỉ của bạn"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
        <div>
            <label htmlFor="region" className="block text-sm font-medium text-white mb-1">
              Vùng
            </label>
            <select
              id="region"
              value={region}
              onChange={setRegion}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn vùng</option>
              {regionOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-white mb-1">
              Thành phố
            </label>
            <select
              id="city"
              value={city}
              onChange={setCity}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn thành phố</option>
              {cityOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="district" className="block text-sm font-medium text-white mb-1">
              Quận/Huyện
            </label>
            <select
              id="district"
              value={district}
              onChange={setDistrict}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn quận/huyện</option>
              {districtOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
         
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-white mb-1">
            Số điện thoại
          </label>
          <input
            id="phoneNumber"
            type="tel"
            placeholder="Nhập số điện thoại của bạn"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

