import Navbar from "../components/homepage/Navbar";
import { Hero } from "../components/homepage/Hero";
import LenisScrollProvider from "../components/LenisProvider";
import ProductSection from "../components/homepage/ProductSection";
import VerticalAccordion from "../components/homepage/Voucher";
import { Footer } from "../components/homepage/Footer";
import SignIn from "@/src/components/SignIn/SignInModal";
import SignUp from "@/src/components/SignUp/SignUpModal";

export default function Home() {
  return (
      <LenisScrollProvider>
        <Navbar />
        <Hero />
        <ProductSection/>
        <VerticalAccordion/>
        <Footer/>
        <SignIn/>
        <SignUp/>
      </LenisScrollProvider>
  );
}
