import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User Checkout| Arc Coffee',
  description: 'Place your order and checkout',
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="min-h-screen bg-black text-white ">
        {children}
      </main>
    </>
  )
}

