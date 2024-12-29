"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AdditionalInformation from "@/src/components/AdditionalInformation/AdditionalInformation";
import SlideInNotifications from "../components/Notification";
import Popup from "../components/PopupMessage";
import CartDrawer from "../components/homepage/Cart/CartDrawer";
import { Footer } from "../components/homepage/Footer";
import { Hero } from "../components/homepage/Hero";
import Navbar from "../components/homepage/Navbar";
import ProductSection from "../components/homepage/ProductSection";
import VerticalAccordion from "../components/homepage/Voucher";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import LenisScrollProvider from "../lib/LenisProvider";
import { setProducts } from "../slices/filteredProductsSlice";
import { setCategories, setLoading } from "../slices/tabFilterSlice";
import { clientLinks, httpClient } from "../utils";
import SignIn from "@/src/components/SignIn/SignInModal";
import SignUp from "@/src/components/SignUp/SignUpModal";
import { Spinner } from "@nextui-org/react";
import { login } from "../slices/authSlice";
import { setCart } from "../slices/cartSlice";
import { showPopup } from "../slices/message";

export default function Home() {
  const { data: session, status } = useSession();
  const [showAdditionalInfoPopup, setShowAdditionalInfoPopup] = useState(false);
  const [isFetchingCart, setIsFetchingCart] = useState(false); // To track fetching cart
  const dispatch = useAppDispatch();

  const hasFetchedCart = useAppSelector((state) => state.auth.hasFetchedCart); // Cart fetch flag
  const data = useAppSelector((state) => state.cart.items);
  const items = data.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
  }));

  // Function to fetch the cart
  const fetchCart = async () => {
        dispatch(
            showPopup({
              message: "Synchronizing cart",
              type: "info",
            })
          );    
          try {
      let result = null;

      if (items.length === 0) {
        const response = await httpClient.get({ url: clientLinks.cart.cart });
        result = response.data?.data.data;
      } else {
        const response = await httpClient.post({
          url: clientLinks.cart.addListCart,
          data: { items },
        });
        result = response.data?.data.data;
      }

      console.log("Fetched Cart:", result);
      if (result) {
        const { items, totalPrice } = result;
        dispatch(setCart({ items, totalPrice }));
        dispatch(login()); // Dispatch login after fetching cart
      }
    } catch (error) {
    } finally {
      dispatch(
        showPopup({
          message: "Cart synchronized successfully.",
          type: "success",
        })
      );  
    }
  };

  // Fetch products and categories on initial load
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          httpClient.get({ url: clientLinks.homepage.product }),
          httpClient.get({ url: clientLinks.homepage.category }),
        ]);

        dispatch(setProducts(productsResponse.data.data));
        dispatch(setCategories(categoriesResponse.data.data));
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  // Handle session updates (fetch cart or show additional info popup)
  useEffect(() => {
    console.log("Session:", session);
    if (session?.needsAdditionalInfo) {
      setShowAdditionalInfoPopup(true);
    } else if (session?.user?.accessToken && !hasFetchedCart) {
      fetchCart();
    }
  }, [session, hasFetchedCart]);


  return (
    <>
      {showAdditionalInfoPopup && (
        <AdditionalInformation
          isOpen={showAdditionalInfoPopup}
          onClose={() => setShowAdditionalInfoPopup(false)}
        />
      )}
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
      <Popup />
      <VerticalAccordion />
      <Footer />
      <SignIn />
      <SignUp />
    </>
  );
}
