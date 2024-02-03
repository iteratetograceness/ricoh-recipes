import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import { GeistSans } from "geist/font/sans";
import { Header } from "./_components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ricoh Recipes",
  description: "Collection of Ricoh GR III recipes",
};

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html className={GeistSans.className} lang="en">
      <body className="min-h-screen p-3 pt-10 sm:pt-5 sm:p-10">
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
