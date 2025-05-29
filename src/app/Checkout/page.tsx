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

interface District {
  id: string
  name: string
}

interface City {
  id: string
  name: string
  districts: District[]
}

interface Region {
  id: string
  name: string
  cities: City[]
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
        dispatch(
          showPopup({
            message: "Please enter a discount code",
            type: "error",
          })
        )
        return;
      }
  
      const response = await httpClient.post({
        url:clientLinks.voucher.voucherDetail,
        data: { code: discountCode, subtotal: subtotal },
      });
  
      const data = response.data;
      if (!data.success) {
        dispatch(
          showPopup({
            message: "Invalid voucher.",
            type: "error",
          })
        )
        return;
      }
  
      const { percentage, maxDiscount } = data.data;
  
      const discountValue = Math.min((subtotal * percentage) / 100, maxDiscount);
  
      setDiscount(discountValue);
      dispatch(
        showPopup({
          message: `Discount applied: -${discountValue.toLocaleString()} VND`,
          type: "success",
        })
      )
    } catch (error) {
      console.error("Error applying discount:", error);
      dispatch(
        showPopup({
          message: "Failed to apply discount. Please try again.",
          type: "error",
        })
      )
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

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { CustomerInformation } from "@/src/components/Checkout/CustomerInformation"

// interface SelectOption {
//   id: string
//   name: string
// }

// interface District {
//   id: string
//   name: string
// }

// interface City {
//   id: string
//   name: string
//   districts: District[]
// }

// interface Region {
//   id: string
//   name: string
//   cities: City[]
// }

// interface LocationData {
//   message: string
//   data: Region[]
// }

// export default function CustomerInfoPage() {
//   // Form state
//   const [customerNote, setCustomerNote] = useState("")
//   const [address, setAddress] = useState("")
//   const [phoneNumber, setPhoneNumber] = useState("")

//   // Location state
//   const [region, setRegion] = useState("")
//   const [city, setCity] = useState("")
//   const [district, setDistrict] = useState("")

//   // Options for dropdowns
//   const [regionOptions, setRegionOptions] = useState<Region[]>([])
//   const [cityOptions, setCityOptions] = useState<City[]>([])
//   const [districtOptions, setDistrictOptions] = useState<SelectOption[]>([])

//   // Loading and error states
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   // Fetch location data from API on component mount
//   useEffect(() => {
//     const fetchLocationData = async () => {
//       try {
//         setIsLoading(true)
//         setError(null)

//         const response = await fetch("http://dotnet.aaateammm.online/api/regions")

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }

//         const data: LocationData = await response.json()

//         if (data.data && Array.isArray(data.data)) {
//           setRegionOptions(data.data)
//         } else {
//           throw new Error("Invalid data format received from API")
//         }
//       } catch (err) {
//         console.error("Error fetching location data:", err)
//         setError(err instanceof Error ? err.message : "Failed to fetch location data")
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchLocationData()
//   }, [])

//   // Handle region change - update cities and reset city/district
//   const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedRegionId = e.target.value
//     setRegion(selectedRegionId)
//     setCity("") // Reset city
//     setDistrict("") // Reset district

//     if (selectedRegionId) {
//       const selectedRegion = regionOptions.find((r) => r.id === selectedRegionId)
//       setCityOptions(selectedRegion?.cities || [])
//     } else {
//       setCityOptions([])
//     }
//     setDistrictOptions([]) // Clear districts
//   }

//   // Handle city change - update districts and reset district
//   const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedCityId = e.target.value
//     setCity(selectedCityId)
//     setDistrict("") // Reset district

//     if (selectedCityId) {
//       const selectedRegion = regionOptions.find((r) => r.id === region)
//       const selectedCity = selectedRegion?.cities.find((c) => c.id === selectedCityId)
//       const districts = selectedCity?.districts.map((d) => ({ id: d.id, name: d.name })) || []
//       setDistrictOptions(districts)
//     } else {
//       setDistrictOptions([])
//     }
//   }

//   // Handle district change
//   const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setDistrict(e.target.value)
//   }

//   const handleSubmit = () => {
//     const formData = {
//       customerNote,
//       address,
//       phoneNumber,
//       region,
//       city,
//       district,
//     }
//     console.log("Form Data:", formData)

//     // Get readable names for selected locations
//     const selectedRegion = regionOptions.find((r) => r.id === region)
//     const selectedCity = cityOptions.find((c) => c.id === city)
//     const selectedDistrict = districtOptions.find((d) => d.id === district)

//     console.log("Selected Locations:", {
//       region: selectedRegion?.name,
//       city: selectedCity?.name,
//       district: selectedDistrict?.name,
//     })
//   }

//   return (
//     <div className="min-h-screen bg-zinc-950 p-8">
//       <div className="max-w-2xl mx-auto space-y-6">
//         <h1 className="text-3xl font-bold text-white mb-8">Customer Information Form</h1>

//         {/* Loading State */}
//         {isLoading && (
//           <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
//             <p className="text-white">Đang tải dữ liệu địa chỉ...</p>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="bg-red-900 border border-red-700 rounded-lg p-4">
//             <p className="text-red-200 font-medium">Lỗi tải dữ liệu:</p>
//             <p className="text-red-300 text-sm mt-1">{error}</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="mt-3 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition-colors"
//             >
//               Thử lại
//             </button>
//           </div>
//         )}

//         {/* Form - only show when not loading and no error */}
//         {!isLoading && !error && (
//           <>
//             <CustomerInformation
//               customerNote={customerNote}
//               setCustomerNote={setCustomerNote}
//               address={address}
//               setAddress={setAddress}
//               district={district}
//               setDistrict={handleDistrictChange}
//               city={city}
//               setCity={handleCityChange}
//               phoneNumber={phoneNumber}
//               setPhoneNumber={setPhoneNumber}
//               cityOptions={cityOptions}
//               districtOptions={districtOptions}
//               region={region}
//               setRegion={handleRegionChange}
//               regionOptions={regionOptions}
//             />

//             <button
//               onClick={handleSubmit}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
//             >
//               Submit Form
//             </button>

//             {/* Debug info */}
//             <div className="bg-zinc-800 p-4 rounded-lg">
//               <h3 className="text-white font-medium mb-2">Current Selection:</h3>
//               <div className="text-zinc-300 text-sm space-y-1">
//                 <p>Region: {regionOptions.find((r) => r.id === region)?.name || "None"}</p>
//                 <p>City: {cityOptions.find((c) => c.id === city)?.name || "None"}</p>
//                 <p>District: {districtOptions.find((d) => d.id === district)?.name || "None"}</p>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }
