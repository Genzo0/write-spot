import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Write Spot',
  description:
    'Write Spot is a blog where you can read about the latest news and trends in the tech industry.'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />
        <main className='flex flex-col min-h-[calc(100vh-3.5rem-1px)] '>
          <div className='flex-1 flex flex-col h-full bg-slate-50'>
            {children}
          </div>
          <Footer />
          <Toaster />
        </main>
      </body>
    </html>
  )
}
