'use client'

import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { UserCircle, Package, Truck, LogOut, LayoutDashboard, MapPin, ArrowLeft } from 'lucide-react'
import { ProfileTab } from '@/src/components/Settings/Profile/page'
import { OrderHistoryTab } from '@/src/components/Settings/OrderHistory/page'
import { OrderTrackingTab } from '@/src/components/Settings/OrderTracking/page'
import { useAppDispatch } from '@/src/hooks/hook'
import { logout } from '@/src/slices/authSlice'
import { clearCart } from '@/src/slices/cartSlice'
import { useState } from 'react'
import { Button } from '@nextui-org/react'

const tabs = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    component: null
  },
  {
    key: "orders",
    label: "Orders",
    icon: Package,
    component: OrderHistoryTab
  },
  {
    key: "tracking",
    label: "Track Your Order",
    icon: Truck,
    component: OrderTrackingTab
  },
  {
    key: "profile",
    label: "Account details",
    icon: UserCircle,
    component: ProfileTab
  }
]

export default function SettingsPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState("dashboard")
  
  const handleLogout = async () => {
    dispatch(logout())
    dispatch(clearCart())
    await signOut({ redirect: false })   
    router.push('/')
  }

  const ActiveComponent = tabs.find(tab => tab.key === activeTab)?.component || null

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8 text-white">
        <Button
          onClick={() => router.push('/')}
          variant="ghost"
          className="mb-6 text-white hover:text-[#F5A524]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        <div className="flex gap-6">
          {/* Navigation Menu */}
          <div className="w-64">
            <nav className="space-y-2 w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all
                    ${activeTab === tab.key 
                      ? 'bg-[#F5A524] text-black font-medium' 
                      : 'hover:bg-white/10 text-white backdrop-blur-sm'
                    }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 h-[calc(100vh-8rem)] overflow-y-auto">
              {ActiveComponent ? (
                <ActiveComponent />
              ) : (
                <div className="py-6">
                  <h1 className="text-2xl font-bold mb-4 text-[#F5A524]">Welcome Back!</h1>
                  <p className="text-white/80">
                    From your account dashboard, you can easily check & view your recent orders,
                    manage your shipping and billing addresses and edit your password and account details.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

