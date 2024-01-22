import { ReactNode } from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Header } from "./_components/header";

export const metadata: Metadata = {
  title: "Ricoh Recipes",
  description: "Collection of Ricoh GR III recipes",
};

export default function RootLayout({
  children,
  recipe,
}: {
  children: ReactNode;
  recipe: ReactNode;
}) {
  return (
    <html className={GeistSans.className} lang="en">
      <body className="min-h-screen p-10">
        <Header />
        {children}
        {recipe}
        <div id="modal-root" />
      </body>
    </html>
  );
}
