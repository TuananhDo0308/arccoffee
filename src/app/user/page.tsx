"use client";

import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import AccountSettings from "@/src/components/Settings/AccountSetting/page";
import SidebarMenu from "@/src/components/Settings/sidebar";
import History from "@/src/components/Settings/OrderHistory/page";
import BackIcon from "@/src/assets/BackIcon";
import Link from "next/link";
import { Divider } from "@nextui-org/react";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export default function Profile() {

  const menuList = [
    { label: "Dashboard" },
    { label: "Orders", active: true },
    { label: "Track Your Order" },
    { label: "Account Detail" },
    { label: "Log out" },

  ];
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{ backgroundImage }}
      className="overflow-hidden w-full h-full flex justify-center"
    >
      <div className="container py-10">
        <div className="flex gap-10 items-center">
          <Link href="./">
          <BackIcon/>
          </Link>

          <h1 className="text-2xl text-white font-semibold">Account Settings</h1>
          </div>

        <div className="flex items-center justify-around h-full w-full">
          <SidebarMenu menuItems={menuList} boxShadow={boxShadow} border={border} />
          <AccountSettings boxShadow={boxShadow} border={border}/>
          {/* <History/> */}
        </div>
      </div>
    </motion.section>
  );
}






