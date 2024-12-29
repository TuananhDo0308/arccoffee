// src/components/Popup.tsx
"use client"
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/src/store';
import { hidePopup } from '../slices/message';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Popup: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, message, type } = useSelector((state: RootState) => state.message);

  const bgColor =
    type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    useEffect(() => {
      if (isOpen) {
        const timer = setTimeout(() => {
          dispatch(hidePopup());
        }, 3000); // 5 seconds
  
        return () => clearTimeout(timer); // Clear timeout on component unmount or state change
      }
    }, [isOpen, dispatch]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 z-[10000] flex justify-center items-start pt-4"
        >
          <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center`}>
            <span className="mr-4">{message}</span>
            <button
              onClick={() => dispatch(hidePopup())}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
