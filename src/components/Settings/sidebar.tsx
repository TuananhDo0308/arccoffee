import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

interface SidebarMenuProps {
  menuItems: { label: string; active?: boolean }[];
  border: any;
  boxShadow: any; // Danh sách menu truyền vào
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  menuItems,
  boxShadow,
  border,
}) => {
  return (
    <div className="flex w-[320px] h-full flex-col items-center justify-center">
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            
          >
            <motion.button
              style={{
                border: item.active ? border : "1px solid #d1d5db", // Style border mặc định khi không active
                boxShadow: item.active ? boxShadow : "none", // Áp dụng boxShadow chỉ khi active
              }}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="mt-4 rounded-full w-[230px] text-left px-8 py-3 text-white hover:bg-gray-700"
            >
                
              {item.label}
              <FiArrowRight className="ml-2 inline-block" />
            </motion.button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenu;
