import { Header } from "@/components/header";
import { QueryContext } from "@/components/queryContext";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryContext>
      <html lang="en">
        <head>
          <title>Planning Poker!</title>
        </head>
        <body className={inter.className}>
          <div className="flex flex-col gap-4 p-4">
            <Header />
            <div>{children}</div>
          </div>
        </body>
      </html>
    </QueryContext>
  );
}
