"use client";
import Navbar from "../components/homepage/Navbar";
import { Hero } from "../components/homepage/Hero";
import LenisScrollProvider from "../lib/LenisProvider";
import ProductSection from "../components/homepage/ProductSection";
import VerticalAccordion from "../components/homepage/Voucher";
import { Footer } from "../components/homepage/Footer";
import SignIn from "@/src/components/SignIn/SignInModal";
import SignUp from "@/src/components/SignUp/SignUpModal";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import CartDrawer from "../components/homepage/Cart/CartDrawer";
import { useAppDispatch } from "../hooks/hook";
import Image from "next/image";
import { changeStatus } from "../slices/UIcomponentSlice/cartUiSlice";
import SlideInNotifications from "../components/Notification";

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("Session Data:", session);
  }, [session]); // Add `session` as a dependency
  return (
    <LenisScrollProvider>
      <CartDrawer />
      <SlideInNotifications />
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <section id="shop">
        <ProductSection />
      </section>
      <VerticalAccordion />
      <Footer />
      <SignIn />
      <SignUp />
    </LenisScrollProvider>
  );
}
