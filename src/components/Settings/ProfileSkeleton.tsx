import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProfileTabSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 rounded-full bg-gray-300"></div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="h-6 w-1/4 bg-gray-300 rounded"></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
              <div className="h-10 w-full bg-gray-300 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
              <div className="h-10 w-full bg-gray-300 rounded"></div>
            </div>
            <div className="h-10 w-1/3 bg-gray-300 rounded"></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="h-6 w-1/3 bg-gray-300 rounded"></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                  <div className="h-10 w-full bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
              <div className="h-10 w-full bg-gray-300 rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                  <div className="h-10 w-full bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-4">
              <div className="h-10 w-1/4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

