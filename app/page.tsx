// app/page.tsx hoặc bất kỳ server component nào
import Navbar from "../components/homepage/Navbar";
import { Hero } from "../components/homepage/Hero";
import LenisScrollProvider from "../components/LenisProvider";
import ProductSection from "../components/homepage/ProductSection";
import VerticalAccordion from "../components/homepage/Voucher";
import { Footer } from "../components/homepage/Footer";
import SignIn from "@/components/SignIn/SignInModal";

export default function Home() {
  return (
      <LenisScrollProvider>
        <Navbar />
        <Hero />
        <ProductSection/>
        <VerticalAccordion/>
        <Footer/>
        <SignIn/>
      </LenisScrollProvider>
  );
}
