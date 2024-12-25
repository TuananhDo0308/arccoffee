import React from 'react';

interface ShippingOption {
  id: string;
  name: string;
  description?: string;
  price?: number;
}

interface ShippingMethodProps {
  shippingMethod: string;
  setShippingMethod: (method: string) => void;
  shippingOptions: ShippingOption[];
  isLoading: boolean;
}

export function ShippingMethod({ shippingMethod, setShippingMethod, shippingOptions, isLoading }: ShippingMethodProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg">
      <div className="border-b border-zinc-800 p-4">
        <h4 className="text-xl font-bold text-white">Phương thức vận chuyển</h4>
      </div>
      <div className="p-4">
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-16 w-full bg-zinc-800 animate-pulse rounded-lg"></div>
            <div className="h-16 w-full bg-zinc-800 animate-pulse rounded-lg"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {shippingOptions.map((option) => (
              <label
                key={option.id}
                className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value={option.id}
                    checked={shippingMethod === option.id}
                    onChange={() => setShippingMethod(option.id)}
                    className="form-radio text-blue-500 focus:ring-blue-500 focus:ring-offset-zinc-900"
                  />
                  <div>
                    <p className="font-medium text-white">{option.name}</p>
                  </div>
                </div>
          
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

