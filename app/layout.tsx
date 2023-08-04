import './globals.css'
import { Inter } from 'next/font/google'
import Dashboard from '@/components/Dashboard/Dashboard/Dashboard'
import Head from 'next/head'
<<<<<<< HEAD
import React from 'react'
=======
>>>>>>> 0650be8586181921e07289db010e711347cf96fb
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ping Pong',
  description: 'ft_transcendence',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

<<<<<<< HEAD
=======
  
>>>>>>> 0650be8586181921e07289db010e711347cf96fb
  return (
    <html lang="en">
      <body className={inter.className}>
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='h-[100vh] w-[100vw] flex '>
<<<<<<< HEAD
          <Dashboard path='Home'/>
=======
          <Dashboard />
>>>>>>> 0650be8586181921e07289db010e711347cf96fb
          {children}
        </div>
        </body>
    </html>
  )
}
