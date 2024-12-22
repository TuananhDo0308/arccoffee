// "use client";

// import React, { useEffect, useState } from "react";
// import { FiArrowRight } from "react-icons/fi";
// import {
//   useMotionTemplate,
//   useMotionValue,
//   motion,
//   animate,
// } from "framer-motion";
// import AccountSettings from "@/src/components/Settings/AccountSetting/page";
// import SidebarMenu from "@/src/components/Settings/sidebar";
// import History from "@/src/components/Settings/OrderHistory/page";
// import BackIcon from "@/src/assets/BackIcon";
// import Link from "next/link";
// import { Divider } from "@nextui-org/react";

// const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

// export default function Profile() {
//   const [tab, setTab] = useState<string>();
//   const menuList = [
//     { label: "Dashboard" },
//     { label: "Orders" },
//     { label: "Track Your Order" },
//     { label: "Account Detail" },
//     { label: "Log out" },
//   ].map((item) => ({ ...item, active: item.label === tab })); // Thêm active

//   const color = useMotionValue(COLORS_TOP[0]);

//   useEffect(() => {
//     animate(color, COLORS_TOP, {
//       ease: "easeInOut",
//       duration: 10,
//       repeat: Infinity,
//       repeatType: "mirror",
//     });
//   }, []);

//   const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
//   const border = useMotionTemplate`1px solid ${color}`;
//   const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
//   const renderContent = () => {
//     switch (tab) {
//       case "Dashboard":
//         return <h2 className="text-white">Welcome to the Dashboard!</h2>;
//       case "Orders":
//         return <History />;
//       case "Track Your Order":
//         return <h2 className="text-white">Track your orders here!</h2>;
//       case "Account Detail":
//         return <AccountSettings boxShadow={boxShadow} border={border} />;
//       case "Log out":
//         return <h2 className="text-white">You have been logged out.</h2>;
//       default:
//         return null;
//     }
//   };
//   return (
//     <motion.section
//       style={{ backgroundImage }}
//       className="overflow-hidden w-full h-full flex justify-center"
//     >
//       <div className="container py-10">
//         <div className="flex gap-10 items-center">
//           <Link href="./">
//             <BackIcon />
//           </Link>

//           <h1 className="text-2xl text-white font-semibold">
//             Account Settings
//           </h1>
//         </div>

//         <div className="flex items-center justify-around h-full w-full">
//           <SidebarMenu
//             setTab={setTab}
//             menuItems={menuList}
//             boxShadow={boxShadow}
//             border={border}
//           />
//           {renderContent()}
//         </div>
//       </div>
//     </motion.section>
//   );
// }



// // 'use client'

// // import { useState } from 'react'
// // import { useRouter } from 'next/navigation'
// // import { signOut, useSession } from 'next-auth/react'
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Separator } from "@/components/ui/separator"
// // import { UserCircle, Package, Truck, LogOut } from 'lucide-react'

// // export default function SettingsPage() {
// //   const router = useRouter()
// //   const { data: session } = useSession()
// //   const [name, setName] = useState(session?.user?.name || '')
// //   const [email, setEmail] = useState(session?.user?.email || '')

// //   const handleLogout = async () => {
// //     await signOut({ redirect: false })
// //     router.push('/')
// //   }

// //   const handleSaveProfile = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     // Implement the API call to save profile information
// //     console.log('Saving profile:', { name, email })
// //   }

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       <h1 className="text-3xl font-bold mb-6 text-white">User Settings</h1>
// //       <Tabs defaultValue="profile" className="space-y-4">
// //         <TabsList className="grid w-full grid-cols-4">
// //           <TabsTrigger value="profile"><UserCircle className="mr-2" />Profile</TabsTrigger>
// //           <TabsTrigger value="orders"><Package className="mr-2" />Orders</TabsTrigger>
// //           <TabsTrigger value="tracking"><Truck className="mr-2" />Tracking</TabsTrigger>
// //           <TabsTrigger value="logout" onClick={handleLogout}><LogOut className="mr-2" />Logout</TabsTrigger>
// //         </TabsList>
// //         <TabsContent value="profile">
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Profile Information</CardTitle>
// //               <CardDescription>Update your account details here.</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <form onSubmit={handleSaveProfile}>
// //                 <div className="grid w-full items-center gap-4">
// //                   <div className="flex flex-col space-y-1.5">
// //                     <Label htmlFor="name">Name</Label>
// //                     <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
// //                   </div>
// //                   <div className="flex flex-col space-y-1.5">
// //                     <Label htmlFor="email">Email</Label>
// //                     <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
// //                   </div>
// //                 </div>
// //               </form>
// //             </CardContent>
// //             <CardFooter>
// //               <Button onClick={handleSaveProfile}>Save Changes</Button>
// //             </CardFooter>
// //           </Card>
// //         </TabsContent>
// //         <TabsContent value="orders">
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Order History</CardTitle>
// //               <CardDescription>View your past orders here.</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <OrderHistory />
// //             </CardContent>
// //           </Card>
// //         </TabsContent>
// //         <TabsContent value="tracking">
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Order Tracking</CardTitle>
// //               <CardDescription>Track your current orders here.</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <OrderTracking />
// //             </CardContent>
// //           </Card>
// //         </TabsContent>
// //       </Tabs>
// //     </div>
// //   )
// // }

// // function OrderHistory() {
// //   // Mock data - replace with actual API call
// //   const orders = [
// //     { id: '1', date: '2023-05-15', total: '$50.00', status: 'Delivered' },
// //     { id: '2', date: '2023-06-01', total: '$75.50', status: 'Shipped' },
// //     { id: '3', date: '2023-06-10', total: '$120.00', status: 'Processing' },
// //   ]

// //   return (
// //     <div className="space-y-4">
// //       {orders.map((order) => (
// //         <div key={order.id} className="flex justify-between items-center p-4 bg-secondary rounded-lg">
// //           <div>
// //             <p className="font-semibold">Order #{order.id}</p>
// //             <p className="text-sm text-muted-foreground">{order.date}</p>
// //           </div>
// //           <div className="text-right">
// //             <p className="font-semibold">{order.total}</p>
// //             <p className="text-sm text-muted-foreground">{order.status}</p>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   )
// // }

// // function OrderTracking() {
// //   // Mock data - replace with actual API call
// //   const currentOrders = [
// //     { id: '3', status: 'Processing', estimatedDelivery: '2023-06-15' },
// //     { id: '2', status: 'Shipped', estimatedDelivery: '2023-06-12', trackingNumber: '1Z999AA1123456784' },
// //   ]

// //   return (
// //     <div className="space-y-4">
// //       {currentOrders.map((order) => (
// //         <div key={order.id} className="p-4 bg-secondary rounded-lg">
// //           <p className="font-semibold">Order #{order.id}</p>
// //           <p className="text-sm text-muted-foreground">Status: {order.status}</p>
// //           <p className="text-sm text-muted-foreground">Estimated Delivery: {order.estimatedDelivery}</p>
// //           {order.trackingNumber && (
// //             <p className="text-sm">Tracking Number: {order.trackingNumber}</p>
// //           )}
// //         </div>
// //       ))}
// //     </div>
// //   )
// // }


"use client";

import { useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { ArrowLeft } from 'lucide-react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import AccountSettings from "@/src/components/Settings/AccountSetting/page";

import SidebarMenu from "@/src/components/Settings/sidebar";

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export default function SettingsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const color = useMotionValue(COLORS[0]);

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000000 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  const menuItems = [
    { label: "Dashboard", active: activeTab === "Dashboard" },
    { label: "Orders", active: activeTab === "Orders" },
    { label: "Track Your Order", active: activeTab === "Track Your Order" },
    { label: "Account Detail", active: activeTab === "Account Detail" },
    { label: "Log out", active: activeTab === "Log out" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <div className="rounded-xl w-full max-h-[calc(100vh-200px)] overflow-auto my-10 bg-white/10 text-white px-10 py-8 shadow-lg backdrop-blur-lg">
            <h2 className="text-2xl font-bold mb-6">Welcome back, {session?.user?.name}!</h2>
            <p className="text-gray-300">
              Manage your account settings and view your order history here.
            </p>
          </div>
        );
      case "Orders":
        return <></>;
      case "Track Your Order":
        return <></>;
      case "Account Detail":
        return <AccountSettings boxShadow={boxShadow} border={border} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      style={{ backgroundImage }}
      className="min-h-screen w-full overflow-hidden"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-6 mb-10">
          <Link 
            href="/"
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Account Settings</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          <SidebarMenu
            menuItems={menuItems}
            setTab={setActiveTab}
            boxShadow={boxShadow}
            border={border}
            onLogout={handleLogout}
          />
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
