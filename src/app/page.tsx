"use client";

import SlideInNotifications from "../components/Notification";
import CartDrawer from "../components/homepage/Cart/CartDrawer";
import { Footer } from "../components/homepage/Footer";
import { Hero } from "../components/homepage/Hero";
import Navbar from "../components/homepage/Navbar";
import ProductSection from "../components/homepage/ProductSection";
import VerticalAccordion from "../components/homepage/Voucher";
import { useAppDispatch } from "../hooks/hook";
import LenisScrollProvider from "../lib/LenisProvider";
import { changeStatus } from "../slices/UIcomponentSlice/cartUiSlice";
import { setProducts } from "../slices/filteredProductsSlice";
import { setCategories, setLoading } from "../slices/tabFilterSlice";
import { clientLinks, httpClient } from "../utils";
import SignIn from "@/src/components/SignIn/SignInModal";
import SignUp from "@/src/components/SignUp/SignUpModal";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          httpClient.get({ url: clientLinks.homepage.product }),
          httpClient.get({ url: clientLinks.homepage.category }),
        ]);

        dispatch(setProducts(productsResponse.data.data));
        dispatch(setCategories(categoriesResponse.data.data));
      } catch (err) {
        console.error("Có lỗi khi lấy dữ liệu:", err);
      } finally {
        setLoading(false); // Kết thúc tải
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <LenisScrollProvider>
        <CartDrawer />
        <SlideInNotifications />
        <Navbar />
        <section id="home">
          <Hero />
        </section>
      </LenisScrollProvider>
      <section id="shop">
        <ProductSection />
      </section>
      <VerticalAccordion />
      <Footer />
      <SignIn />
      <SignUp />
    </>
  );
}
