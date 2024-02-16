import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Auth V5',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }:{ children: React.ReactNode}) { 
  const session = await auth()

  return (
    // by wrapping the layout file in a SessionProvider
    // we can pull logged in data in the children components
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </SessionProvider>
  )
}
