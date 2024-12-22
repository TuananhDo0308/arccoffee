import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';

interface SidebarMenuProps {
  menuItems: { label: string; active?: boolean }[];
  border: any;
  boxShadow: any;
  setTab: (label: string) => void;
  onLogout: () => void;
}

export default function SidebarMenu({
  menuItems,
  boxShadow,
  border,
  setTab,
  onLogout,
}: SidebarMenuProps) {
  const handleClick = (label: string) => {
    if (label === "Log out") {
      onLogout();
    } else {
      setTab(label);
    }
  };

  return (
    <div className="w-full md:w-[320px] shrink-0">
      <ul className="space-y-3">
        {menuItems.map((item, index) => (
          <li key={index}>
            <motion.button
              style={{
                border: item.active ? border : "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: item.active ? boxShadow : "none",
              }}
              onClick={() => handleClick(item.label)}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="w-full rounded-full px-6 py-3 text-left text-white hover:bg-white/5 transition-colors flex items-center justify-between group"
            >
              <span>{item.label}</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </li>
        ))}
      </ul>
    </div>
  );
}

