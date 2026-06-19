import type { Metadata } from "next";
import { Bakbak_One, Karla } from "next/font/google";
import "./globals.css";

const bakbakOne = Bakbak_One({
  weight: "400",
  variable: "--font-bakbak-one",
  subsets: ["latin"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Sovereign Product Architect | Hustlers Institute",
  description: "Master Human-Centered Design, Agile Architecture, and Intrapreneurial Strategy with battle-tested fintech leaders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bakbakOne.variable} ${karla.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#ffffff] text-[#0f172a] antialiased font-sans">
        {children}
      </body>
    </html>
  );
}

