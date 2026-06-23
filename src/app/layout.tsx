import type { Metadata } from "next";
import { Karla, Cormorant_SC, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  display: "swap",
});

const cormorantSC = Cormorant_SC({
  variable: "--font-cormorant-sc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Sovereign Product Builder | Sovereign Millionaires",
  description: "Learn to build apps people love, setup simple websites, and grow your own business without coding struggles.",
};

import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${karla.variable} ${cormorantSC.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground antialiased font-sans">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}

