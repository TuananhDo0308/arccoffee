


'use client'

import { useEffect, useState } from "react"
import { clientLinks, httpClient } from "@/src/utils"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Clock } from 'lucide-react'
import { OrderTrackingTabSkeleton } from "../OrderSkeleton"

// Enhanced interfaces to match API response
interface OrderItem {
  productId: string
  name: string
  price: number
  image:string
  quantity?: number
}

interface Order {
  id: string
  customerId: string
  items: OrderItem[]
  orderDate: string
  paymentId: string
  shippingMethodId: string
  status: string
  totalPrice: number
  voucherId: string | null
}

export function OrderHistoryTab() {
  const [orders, setOrders] = useState<Order[]>([])
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true)
      try {
        const response = await httpClient.get({url: clientLinks.bill.completedBills})
        setOrders(response.data.data)
      } catch (error) {
        console.log("Error fetching orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (isLoading) return <OrderTrackingTabSkeleton />

  if (!isLoading && orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-white text-xl">You don't have any orders yet.</p>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card 
          key={order.id} 
          className="bg-black/50 backdrop-blur-md border-white/10"
        >
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-lg font-semibold text-white">Order #{order.id}</p>
                <div className="space-y-1">
                  <p className="text-sm text-white/60">
                    <Clock className="inline-block w-4 h-4 mr-1" />
                    Ordered: {formatDate(order.orderDate)}
                  </p>
                  <p className="text-sm text-white/60">Status: {order.status}</p>
                  <p className="text-sm text-white/60">Payment ID: {order.paymentId}</p>
                  <p className="text-sm text-white/60">Shipping Method: {order.shippingMethodId}</p>
                  {order.voucherId && (
                    <p className="text-sm text-white/60">Voucher Applied: {order.voucherId}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-semibold text-[#F5A524]">
                    {order.totalPrice.toLocaleString()} VND
                  </p>
                  <p className="text-sm text-white/60">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </p>
                </div>
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
                      quality={10}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-grow">
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-sm text-white/60">
                        Quantity: {item.quantity || 1}
                      </p>
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

