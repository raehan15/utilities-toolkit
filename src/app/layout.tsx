import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "All-in-One Utilities - Free Online Tools",
  description:
    "Collection of useful online utilities including BMI calculator, YouTube title generator, JSON formatter, random number generator, and color palette generator.",
  keywords: [
    "utilities",
    "tools",
    "BMI calculator",
    "JSON formatter",
    "YouTube title generator",
  ],
  authors: [{ name: "All-in-One Utilities" }],
  other: {
    monetag: "e71ae7e1ac16e96e015d183aa04e16f8",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <div className="min-h-screen flex flex-col bg-slate-50">
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
