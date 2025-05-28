"use client";

import React, { useState, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Progress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { showPopup } from '@/src/slices/message';
import { useAppDispatch } from '@/src/hooks/hook';
import { httpClient, clientLinks, apiLinks } from '@/src/utils';
import Step1x from './steps/Step1';
import Step2x from './steps/Step2';
import Step3x from './steps/Step3';
import Image from "next/image";
import Logo from "@/src/assets/SingleLogoblack.png";

interface AdditionalInformationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdditionalInformation({ isOpen, onClose }: AdditionalInformationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '1',
    phoneNumber: '',
    gender: '',
    year: 0,
    month: 0,
    day: 0,
    regionId: '',
    cityId: '',
    districtId: '',
    street: '',
    picture: '',
    googleId: ''
  });
  const [loading, setLoading] = useState(false);
  const { data: session, update } = useSession();
  const dispatch = useAppDispatch();

  const handleUpdateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCancel = useCallback(async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/' });
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      onClose();
    }
  }, [onClose]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Chuẩn bị dữ liệu theo định dạng JSON
      const requestBody = {
        name: session?.tempname || '',
        email: session?.tempemail || '',
        password: "3hkjl12bhejkldwhqbjklbcXHJKLDASbjklfhneqwjklHRJKQhk",
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
        year: parseInt(formData.year as any) || 0,
        month: parseInt(formData.month as any) || 0,
        day: parseInt(formData.day as any) || 0,
        regionId: formData.regionId,
        cityId: formData.cityId,
        districtId: formData.districtId,
        street: formData.street,
        picture: session?.tempimage || '',
        googleId: session?.tempGoogleId || ''
      };
      
      console.log("Request Body:", requestBody);
  
      // Gửi request với JSON
      const res = await httpClient.post({
        url: apiLinks.authen.registerGoogle,
        data: requestBody,
        contentType: 'application/json' // Đặt Content-Type là JSON
      });
  
      console.log("Response:", res.data);
  
      dispatch(showPopup({ message: "Sign up completed successfully", type: "success" }));
      onClose();
    } catch (error) {
      console.error("Error completing sign up:", error);
      dispatch(showPopup({ message: "Failed to complete sign up. Please try again.", type: "error" }));
    } finally {
      setLoading(false);
    }
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1x
            formData={formData}
            updateFormData={handleUpdateFormData}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <Step3x
            formData={formData}
            updateFormData={handleUpdateFormData}
            onPrev={() => setCurrentStep(1)}
            onSubmit={handleSubmit}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleCancel}
      size="2xl"
      scrollBehavior="inside"
      classNames={{
        base: "bg-white rounded-lg shadow-xl",
        closeButton: "hidden",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col items-start">
              <Image src={Logo} alt="app_logo" className="mb-6" />
              <span className="text-3xl font-bold text-black">Complete Your Profile</span>
              <span className="text-base font-light text-gray-800">
                Please provide additional information to complete your sign up
              </span>
            </ModalHeader>
            <ModalBody>
              <Progress
                aria-label="Loading..."
                className="w-full mb-4"
                classNames={{
                  indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                }}
                value={(currentStep / 2) * 100}
              />
              {renderStep()}
            </ModalBody>
            {currentStep === 1 && (
              <ModalFooter>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                >
                  Cancel
                </button>
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

