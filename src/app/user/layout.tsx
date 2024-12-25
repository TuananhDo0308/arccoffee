import { StarryBackground } from '@/src/components/StarryBackground'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User Settings | Arc Coffee',
  description: 'Manage your account settings and view your orders',
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>        
      <main className="min-h-screen text-white ">
      
        {children}

      </main>
    </>
  )
}

