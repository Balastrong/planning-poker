"use client";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="p-4">
          <h1 className="text-3xl">Planning Poker!</h1>
        </div>
        <div className="p-4">{children}</div>
      </body>
    </html>
  );
}
