import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://www.appguiding.com";
const siteName = "Tool Kit - Utilities";
const siteDescription =
  "Collection of useful online utilities including BMI calculator, YouTube title generator, JSON formatter, random number generator, and color palette generator. Free, fast, and privacy-first browser tools.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "All-in-One Utilities - Free Online Tools",
    template: "%s | Tool Kit",
  },
  description: siteDescription,
  keywords: [
    "utilities",
    "tools",
    "BMI calculator",
    "JSON formatter",
    "YouTube title generator",
    "color palette generator",
    "random number generator",
    "unit converter",
    "QR code generator",
    "base64 converter",
    "image converter",
    "PDF converter",
    "online tools",
    "free tools",
  ],
  authors: [{ name: "Tool Kit - Utilities", url: siteUrl }],
  creator: "Tool Kit",
  publisher: "Tool Kit",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "All-in-One Utilities - Free Online Tools",
    description: siteDescription,
    url: siteUrl,
    siteName: siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "All-in-One Utilities - Free Online Tools",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

// Schema.org structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
