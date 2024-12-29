import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { clientLinks, httpClient } from '@/src/utils';
import { showPopup } from '@/src/slices/message';
import { useAppDispatch } from '@/src/hooks/hook';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AdditionalInformationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdditionalInformation: React.FC<AdditionalInformationProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    gender: '',
    year: '',
    month: '',
    day: '',
    regionId: '',
    cityId: '',
    districtId: '',
    street: '',
    picture: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const { data: session, update } = useSession();
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData(prev => ({ ...prev, picture: e.target.files![0] }));
    }
  };

  const handleCancel = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/' });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // try {
    //   const formDataToSend = new FormData();
    //   Object.entries(formData).forEach(([key, value]) => {
    //     if (value !== null) {
    //       formDataToSend.append(key, value);
    //     }
    //   });
    //   formDataToSend.append('googleId', session?.user.tempGoogleId || '');
    //   formDataToSend.append('email', session?.user.email || '');
    //   formDataToSend.append('name', session?.user.name || '');
    //   if (session?.user.image) {
    //     formDataToSend.append('image', session.user.image);
    //   }

    //   const response = await httpClient.post({
    //     url: clientLinks.user.signin,
    //     data: formDataToSend,
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });

    //   if (response.data.accessToken) {
    //     await update({
    //       ...session,
    //       user: {
    //         ...session?.user,
    //         accessToken: response.data.accessToken,
    //         id: response.data.id,
    //         emailVerified: response.data.emailVerified,
    //         needsAdditionalInfo: false,
    //       },
    //     });
    //     dispatch(showPopup({ message: "Sign up completed successfully", type: "success" }));
    //     onClose();
    //   } else {
    //     throw new Error("Failed to complete sign up");
    //   }
    // } catch (error) {
    //   console.error("Error completing sign up:", error);
    //   dispatch(showPopup({ message: "Failed to complete sign up. Please try again.", type: "error" }));
    // } finally {
    //   setLoading(false);
    // }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Profile</h3>
        <p className="text-gray-600 text-sm mb-6">Please provide additional information to complete your sign up.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select name="gender" value={formData.gender} onValueChange={(value) => handleInputChange({ target: { name: 'gender', value } } as any)}>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="month">Month</Label>
                <Input
                  id="month"
                  name="month"
                  type="number"
                  min="1"
                  max="12"
                  value={formData.month}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="day">Day</Label>
                <Input
                  id="day"
                  name="day"
                  type="number"
                  min="1"
                  max="31"
                  value={formData.day}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="regionId">Region ID *</Label>
              <Input
                id="regionId"
                name="regionId"
                value={formData.regionId}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="cityId">City ID</Label>
              <Input
                id="cityId"
                name="cityId"
                value={formData.cityId}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="districtId">District ID</Label>
              <Input
                id="districtId"
                name="districtId"
                value={formData.districtId}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="street">Street *</Label>
              <Input
                id="street"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="picture">Picture</Label>
              <Input
                id="picture"
                name="picture"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md focus:outline-none ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Complete Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
