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
  metadataBase: new URL("https://sovereignmillionaires.com"),
  title: "Sovereign Millionaires | The Sovereign Product Builder",
  description: "Deploy the right business tools and developmental blueprints to accumulate leverage, bypass corporate ceilings, and guarantee your path to becoming a Sovereign Millionaire.",
  openGraph: {
    title: "Sovereign Millionaires | The Sovereign Product Builder",
    description: "Deploy the right business tools and developmental blueprints to accumulate leverage, bypass corporate ceilings, and guarantee your path to becoming a Sovereign Millionaire.",
    url: "https://sovereignmillionaires.com",
    siteName: "Sovereign Millionaires",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sovereign Millionaires - The Sovereign Product Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sovereign Millionaires | The Sovereign Product Builder",
    description: "Deploy the right business tools and developmental blueprints to accumulate leverage, bypass corporate ceilings, and guarantee your path to becoming a Sovereign Millionaire.",
    images: ["/og-image.png"],
  },
};

import { TooltipProvider } from "@/components/ui/tooltip";
import CookieBanner from "@/components/CookieBanner";

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
        <CookieBanner />
      </body>
    </html>
  );
}

