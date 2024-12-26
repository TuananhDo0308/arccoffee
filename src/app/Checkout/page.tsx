"use client";

import { CartReview } from "@/src/components/Checkout/CartReview";
import { CustomerInformation } from "@/src/components/Checkout/CustomerInformation";
import DiscountCode from "@/src/components/Checkout/DiscountCode";
import { PaymentMethod } from "@/src/components/Checkout/PaymentMethod";
import { PaymentSummary } from "@/src/components/Checkout/PaymentSumary";
import { ShippingMethod } from "@/src/components/Checkout/ShippingMethod";
import Popup from "@/src/components/PopupMessage";
import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";
import { clearCart } from "@/src/slices/cartSlice";
import { removeFromCartThunk, updateQuantityThunk } from "@/src/slices/cartThunk";
import { showPopup } from "@/src/slices/message";
import { clientLinks, httpClient } from "@/src/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


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

interface SelectOption {
  id: string;
  name: string;
}


interface City {
  id: string;
  name: string;
  districts: { id: string; name: string }[];
}

interface Region {
  id: string;
  name: string;
  cities: City[];
}

export default function CheckoutPage() {
  const cartItems = useAppSelector((state) => state.cart.items);

  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const [shippingMethod, setShippingMethod] = useState("BE");
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [paymentOptions, setPaymentOptions] = useState<PaymentOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Customer information state
  const [customerNote, setCustomerNote] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [region, setRegion] = useState("");
  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<SelectOption[]>(
    []
  );
  const dispatch = useAppDispatch();
  

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [paymentsRes, shippingsRes] = await Promise.all([
          httpClient.get({ url: clientLinks.cart.payments }),
          httpClient.get({ url: clientLinks.cart.shippings }),
        ]);
  
        // Kiểm tra và cập nhật state
        if (paymentsRes.data && paymentsRes.data.data) {
          setPaymentOptions(paymentsRes.data.data);
        }
  
        if (shippingsRes.data && shippingsRes.data.data) {
          setShippingOptions(shippingsRes.data.data);
        }
  
        const res = await httpClient.get({ url: clientLinks.user.region });
        const response = await httpClient.get({
          url: clientLinks.user.getProfile,
        });
  
        if (response.data && response.data.data) {
          setCity(response.data.data.cityId);
          setDistrict(response.data.data.districtId);
          setRegion(response.data.data.regionId);
          setAddress(response.data.data.street);
          setPhoneNumber(response.data.data.phoneNumber);
        }
  
        if (res.data && res.data.data) {
          setRegions(res.data.data);
          const userRegion = res.data.data.find(
            (region: any) => region.id === response.data.data.regionId
          );
  
          setCities(userRegion?.cities || []);
  
          const userCity = userRegion?.cities?.find(
            (city: any) => city.id === response.data.data.cityId
          );
  
          setDistricts(userCity?.districts || []);
        }
      } catch (err) {
        console.error("Có lỗi khi lấy dữ liệu:", err);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  const handleRegionChange = (e: any) => {
    const value = e.target.value;
    const selectedRegion = regions?.find((region) => region.id === value);
    // Lấy city đầu tiên và district đầu tiên của region mới
    const firstCity = selectedRegion?.cities?.[0] || null;
    const firstDistrict = firstCity?.districts?.[0] || null;
    setCities(selectedRegion?.cities || []); // Cập nhật cities
    setDistricts(firstCity?.districts || []); // Cập nhật districts

    setCity(firstCity?.id || ""); // Gán city đầu tiên
    setDistrict(firstDistrict?.id || ""); // Gán district đầu tiên
    setRegion(value); // Cập nhật region mới
 
  };
  

  const handleCityChange = (e: any) => {
    const value = e.target.value;
  
    // Tìm city được chọn
    const selectedCity = cities.find((city) => city.id === value);
  
    // Lấy district đầu tiên của city
    const firstDistrict = selectedCity?.districts?.[0] || null;
  
    // Cập nhật danh sách districts
    setDistricts(selectedCity?.districts || []);
  
    // Cập nhật state user với cityId và districtId mặc định
    setCity(value);
    setDistrict(firstDistrict?.id || "");
  };
  
  const handleDistrictChange = (e: any) => {
    const value = e.target.value;
    setDistrict(value);    
  };
  const handleQuantityChange = async (id: string, delta: number) => {
      const product = cartItems.find((product) => product.productId === id);
      if(product){
        const newQuantity = product.quantity + delta;
        if (newQuantity <= 0) {
          dispatch(removeFromCartThunk(product.productId));
        } else {
          dispatch(updateQuantityThunk({ productId: id, newQuantity: newQuantity }))
            .unwrap()
            .then(() => {
              console.log("update quantity success");
            })
            .catch((error) => {});
        }
  
      }
      
      if (!product) return;
    };

    // Handle removing a product from the cart
    const handleRemoveProduct = async (id: string) => {
      try {
        const product = cartItems.find((product) => product.productId === id);
        if(product){
          dispatch(removeFromCartThunk(product.productId))
          .unwrap()
          .then(() => {
            console.log("Item removed from cart");
          })
          .catch((error) => {
            console.error("Failed to remove item from cart:", error);
          });
        }
        
      } catch (error) {
        console.error(error);
        alert("Remove failed!");
      }
    };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal  - discount;

  const validateForm = () => {
    if (!address || !region || !district || !city || !phoneNumber) {
      alert("Vui lòng điền đầy đủ thông tin giao hàng.");
      return false;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      alert("Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số.");
      return false;
    }
    return true;
  };

  const handlePaymentClick = async () => {
    if (validateForm()) {
      const data = {
        paymentId: paymentMethod,
        shippingMethodId: shippingMethod,
        phoneNumber: phoneNumber,
        regionId: region,
        cityId: city,
        districtId: district,
        street: address,
        note: customerNote || undefined, // Only include if not empty
        ...(discountCode && { voucherCode: discountCode }) // Only include if discount code exists
      };

      try {
        const response = await httpClient.put({
          url: clientLinks.bill.placeOrder,
          data: data,
        });
        console.log(response.data);
        if (response.data.res) {
          // Show success message
          dispatch(showPopup({ message: "Order placed successfully!", type: "success" }));

          // Wait for 2 seconds before redirecting to the homepage
          setTimeout(() => {
            dispatch(clearCart());
            window.location.href = "/";
          }, 2000); // 2000 milliseconds (2 seconds)
        }
      } catch (err) {
        console.error("Có lỗi khi đặt hàng:", err);
        alert("Có lỗi khi đặt hàng. Vui lòng thử lại sau.");
      }
    }
  };

  const handleApplyDiscount = async () => {
    try {
      if (!discountCode) {
        alert("Please enter a discount code");
        return;
      }
  
      const response = await httpClient.post({
        url:clientLinks.voucher.voucherDetail,
        data: { code: discountCode, subtotal: subtotal },
      });
  
      const data = response.data;
      if (!data.success) {
        alert(data.message || "Invalid voucher");
        return;
      }
  
      const { percentage, maxDiscount } = data.data;
  
      const discountValue = Math.min((subtotal * percentage) / 100, maxDiscount);
  
      setDiscount(discountValue);
      alert(`Discount applied: -${discountValue.toLocaleString()} VND`);
    } catch (error) {
      console.error("Error applying discount:", error);
      alert("Failed to apply discount. Please try again.");
    }
  };
  
  return (
    <div className=" min-h-screen  text-white p-4 md:p-6 max-w-7xl mx-auto">
            <Popup/>
      <Link
        href="/"
        className="inline-flex items-center text-base font-medium text-white hover:text-zinc-500 mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6 items-start">
        <div className="space-y-6 ">
          <CartReview
            cartItems={cartItems}
            updateQuantity={handleQuantityChange}
            removeItem={handleRemoveProduct}
          />
         <DiscountCode
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
            onApplyDiscount={handleApplyDiscount}
          />

          <CustomerInformation
            customerNote={customerNote}
            setCustomerNote={setCustomerNote}
            address={address}
            setAddress={setAddress}
            district={district}
            setDistrict={handleDistrictChange}
            city={city}
            setCity={handleCityChange}
            region={region}
            setRegion={handleRegionChange}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            cityOptions={cities}
            districtOptions={districts}
            regionOptions={regions}
          />
        </div>
        <div className="space-y-6">
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
            discount={discount}
            total={total}
            onPaymentClick={handlePaymentClick}
          />
        </div>
      </div>
    </div>
  );
}

