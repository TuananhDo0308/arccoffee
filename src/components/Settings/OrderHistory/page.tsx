export default function OrderTracking() {
  const currentOrders = [
    {
      orderId: "#FWB127364372",
      status: "Processing",
      estimatedDelivery: "Dec 25, 2023",
      items: [
        { name: "Espresso", quantity: 2 },
        { name: "Matcha Latte", quantity: 1 },
      ],
      trackingNumber: "1Z999AA1234567890"
    },
    {
      orderId: "#FWB125467980",
      status: "In Transit",
      estimatedDelivery: "Dec 23, 2023",
      items: [
        { name: "Green Tea", quantity: 3 },
        { name: "Black Coffee", quantity: 2 },
      ],
      trackingNumber: "1Z999AA9876543210"
    }
  ];

  return (
    <div className="rounded-xl w-full max-h-[calc(100vh-200px)] overflow-auto my-10 bg-white/10 text-white px-6 sm:px-10 py-8 shadow-lg backdrop-blur-lg">
      <h2 className="text-2xl font-bold mb-8">Track Your Orders</h2>
      <div className="space-y-6">
        {currentOrders.map((order, index) => (
          <div
            key={index}
            className="p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex flex-wrap gap-4 mb-4">
              <div>
                <p className="text-sm text-white/60">Order ID</p>
                <p className="font-medium">{order.orderId}</p>
              </div>
              <div>
                <p className="text-sm text-white/60">Status</p>
                <p className="font-medium">{order.status}</p>
              </div>
              <div>
                <p className="text-sm text-white/60">Estimated Delivery</p>
                <p className="font-medium">{order.estimatedDelivery}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-white/60 mb-2">Items</p>
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between bg-white/5 rounded-lg p-3">
                    <span>{item.name}</span>
                    <span>x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-white/60">Tracking Number</p>
              <p className="font-medium font-mono">{order.trackingNumber}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

