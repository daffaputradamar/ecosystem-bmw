
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/footer";
import { Toaster } from "@/components/ui/sonner";
import RootProviders from "@/providers/RootProviders";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecosystem BMW",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={`${inter.className} min-h-screen flex flex-col justify-between scrollbar`}>
        <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <RootProviders>
          {children}
          <Toaster richColors position="bottom-right" />
        </RootProviders>
      </body>
    </html>
  );
}
