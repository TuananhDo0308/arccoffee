"use client";

import { useAppSelector } from "@/src/hooks/hook";
import { clientLinks, httpClient } from "@/src/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from 'lucide-react';
import { CartReview } from "@/src/components/Checkout/CartReview";
import { DiscountCode } from "@/src/components/Checkout/DiscountCode";
import { CustomerInformation } from "@/src/components/Checkout/CustomerInformation";
import { ShippingMethod } from "@/src/components/Checkout/ShippingMethod";
import { PaymentMethod } from "@/src/components/Checkout/PaymentMethod";
import { PaymentSummary } from "@/src/components/Checkout/PaymentSumary";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ShippingOption {
  id: string;
  name: string;
  description?: string;
  price?: number;
}

interface PaymentOption {
  id: string;
  name: string;
  image?: string;
}

export default function CheckoutPage() {
  const cartItems = useAppSelector((state) => state.cart.items);

  const [discountCode, setDiscountCode] = useState("");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [paymentOptions, setPaymentOptions] = useState<PaymentOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Customer information state
  const [customerNote, setCustomerNote] = useState("");
  const [address, setAddress] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [paymentsRes, shippingsRes] = await Promise.all([
          httpClient.get({ url: clientLinks.cart.payments }),
          httpClient.get({ url: clientLinks.cart.shippings })
        ]);

        setPaymentOptions(paymentsRes.data.data);
        setShippingOptions(shippingsRes.data.data);
      } catch (err) {
        console.error("Có lỗi khi lấy dữ liệu:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateQuantity = (id: string, change: number) => {
    // Implement update quantity logic
  };

  const removeItem = (id: string) => {
    // Implement remove item logic
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = shippingMethod === "express" ? 30000 : 15000;
  const discount = discountCode === "ARC10" ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const validateForm = () => {
    if (!address || !ward || !district || !city || !phoneNumber) {
      alert("Vui lòng điền đầy đủ thông tin giao hàng.");
      return false;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      alert("Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số.");
      return false;
    }
    return true;
  };

  const handlePaymentClick = () => {
    if (validateForm()) {
      // Proceed with payment
      console.log("Proceeding with payment");
      // Add your payment logic here
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-zinc-400 hover:text-white mb-6"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Quay lại trang sản phẩm
        </Link>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <CartReview
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
            <DiscountCode
              discountCode={discountCode}
              setDiscountCode={setDiscountCode}
            />
           
          </div>

          {/* Right Column */}
          <div className="space-y-6">
          <CustomerInformation
              customerNote={customerNote}
              setCustomerNote={setCustomerNote}
              address={address}
              setAddress={setAddress}
              ward={ward}
              setWard={setWard}
              district={district}
              setDistrict={setDistrict}
              city={city}
              setCity={setCity}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
            <ShippingMethod
              shippingMethod={shippingMethod}
              setShippingMethod={setShippingMethod}
              shippingOptions={shippingOptions}
              isLoading={isLoading}
            />
            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              paymentOptions={paymentOptions}
              isLoading={isLoading}
            />
            <PaymentSummary
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              total={total}
              onPaymentClick={handlePaymentClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

