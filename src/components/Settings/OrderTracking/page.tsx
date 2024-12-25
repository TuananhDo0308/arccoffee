'use client'

import { useEffect, useState } from "react"
import { clientLinks, httpClient } from "@/src/utils"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from 'lucide-react'

// Interfaces for order and order items (replace with your actual interfaces)
interface Order {
  id: string;
  status: string;
  estimatedDelivery: string;
  trackingNumber?: string;
  totalPrice: number;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}


export function OrderTrackingTab() {
  const [orders, setOrders] = useState<Order[]>([])
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await httpClient.get({url:clientLinks.bill.pendingBills});
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Handle error appropriately (e.g., display an error message)
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card 
          key={order.id} 
          className="bg-black/50 backdrop-blur-md border-white/10"
        >
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold text-white">Order #{order.id}</p>
                <p className="text-sm text-white/60">Status: {order.status}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-lg font-semibold text-[#F5A524]">
                  {order.totalPrice.toLocaleString()} VND
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                  className="text-white hover:bg-white/10"
                >
                  {expandedOrderId === order.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            {expandedOrderId === order.id && (
              <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-grow">
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-sm text-white/60">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-[#F5A524]">
                      {item.price.toLocaleString()} VND
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}

