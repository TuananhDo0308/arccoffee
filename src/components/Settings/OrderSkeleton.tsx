import React from 'react'
import { Card } from "@/components/ui/card"

export function OrderTrackingTabSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, index) => (
        <Card key={index} className="bg-black/50 backdrop-blur-md border-white/10">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
                <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

