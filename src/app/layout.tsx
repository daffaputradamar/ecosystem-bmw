
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Toaster } from "@/components/ui/sonner";
import RootProviders from "@/providers/RootProviders";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import SplashScreen from "@/components/SplashScreen/splash-screen";

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
        <SplashScreen>
          {children}
        </SplashScreen>
          <Toaster richColors position="bottom-right" />
        </RootProviders>
      </body>
    </html>
  );
}
