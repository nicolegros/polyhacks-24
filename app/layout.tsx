import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ChakraProvider } from '@chakra-ui/react'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Green Basket",
  description: "Your destination to find food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen flex flex-col bg-chiffon`}>
        <ChakraProvider>
            <Navbar />
            <main className="bg-chiffon w-full h-full flex flex-col">
              {children}
            </main>
        </ChakraProvider>
      </body>
    </html>
  );
}
