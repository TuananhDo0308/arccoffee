import React from 'react';

interface PaymentOption {
  id: string;
  name: string;
  image?: string;
}

interface PaymentMethodProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  paymentOptions: PaymentOption[];
  isLoading: boolean;
}

export function PaymentMethod({ paymentMethod, setPaymentMethod, paymentOptions, isLoading }: PaymentMethodProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg">
      <div className="border-b border-zinc-800 p-4">
        <h4 className="text-xl font-bold text-white">Phương thức thanh toán</h4>
      </div>
      <div className="p-4">
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-12 w-full bg-zinc-800 animate-pulse rounded-lg"></div>
            <div className="h-12 w-full bg-zinc-800 animate-pulse rounded-lg"></div>
            <div className="h-12 w-full bg-zinc-800 animate-pulse rounded-lg"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {paymentOptions.map((option) => (
              <label
                key={option.id}
                className="flex items-center gap-2 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={option.id}
                  checked={paymentMethod === option.id}
                  onChange={() => setPaymentMethod(option.id)}
                  className="form-radio text-blue-500 focus:ring-blue-500 focus:ring-offset-zinc-900"
                />
                <span className="text-white">{option.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

