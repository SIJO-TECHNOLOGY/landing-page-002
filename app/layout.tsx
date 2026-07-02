import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// v0.3 — editorial italic-serif accent for the one emotional word per headline.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIJO — Le cabinet qui pense à vous",
  description:
    "Cabinet de conseil IT en banque et finance. L'intelligence et la force du collectif au service de votre carrière et des projets des plus grandes institutions financières.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="grain min-h-full bg-bg text-text">{children}</body>
    </html>
  );
}
