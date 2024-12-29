"use client";

import { useState } from "react";

const PaymentPage = () => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);

  const handlePayment = async () => {
    try {
      const response = await fetch("/api/zalopay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, description }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Có lỗi xảy ra trong quá trình thanh toán.");
    }
  };

  return (
    <div className="w-full h-full bg-white p-4">
      <h1 className="text-2xl font-bold mb-4">ZaloPay Payment Sandbox</h1>

      {/* Input Amount */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Amount (VND):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Nhập số tiền"
        />
      </div>

      {/* Input Description */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Nhập mô tả"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Process Payment
      </button>

      {/* Display Result */}
      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-bold mb-2">Payment Response:</h3>
          <pre className="bg-gray-200 p-4 rounded-md text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
