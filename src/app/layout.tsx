import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider/theme-provider";
import { ModeToggle } from "@/components/ModeToggle/mode-toggle";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/footer";
import { Toaster } from "@/components/ui/sonner";
import RootProviders from "@/providers/RootProviders";

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
        <RootProviders>
          <Navbar />
          <main className="flex-1 container">
            {children}
          </main>
          <Footer />
          <Toaster richColors position="bottom-right" />
        </RootProviders>
      </body>
    </html>
  );
}
