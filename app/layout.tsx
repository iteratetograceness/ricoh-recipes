import type { Metadata } from "next";
import cn from 'classnames'
import { Analytics } from '@vercel/analytics/react'
import { GeistSans } from 'geist/font/sans'
import { Header } from './_components/header'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ricoh Recipes',
  description: 'Collection of Ricoh GR III(x) recipes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      className={cn('flex flex-col items-center', GeistSans.className)}
      lang='en'
    >
      <body className='min-h-screen bg-primary-background text-primary-foreground w-[calc(min(100%,1111px))]'>
        <Header />
        <div className='p-4'>{children}</div>
      </body>
      <Analytics />
    </html>
  )
}
