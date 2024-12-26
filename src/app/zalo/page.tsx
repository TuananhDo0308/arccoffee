"use client"

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
    }
  };

  return (
    <div className="w-full h-full bg-white">
      <h1>ZaloPay Payment Sandbox</h1>
      <input
        type="number"
        placeholder="Amount (VND)"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handlePayment}>Pay</button>

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};

export default PaymentPage;
