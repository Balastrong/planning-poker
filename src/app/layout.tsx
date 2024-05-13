import { QueryContext } from "@/components/queryContext";
import { UserSelector } from "@/components/userSelector";
import { Inter } from "next/font/google";
import Link from "next/link";
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
        <body className={inter.className + " flex flex-col gap-4 p-4"}>
          <div>
            <Link href="/">
              <h1 className="text-3xl">Planning Poker!</h1>
            </Link>
          </div>
          <UserSelector />
          <div>{children}</div>
        </body>
      </html>
    </QueryContext>
  );
}
