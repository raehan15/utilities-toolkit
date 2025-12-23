import { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Generator - Create Downloadable QR Codes",
  description:
    "Generate QR codes for URLs, text, WiFi, and more. Free online QR code generator with customizable options and instant download.",
  alternates: { canonical: "/tools/qr-code-generator" },
  openGraph: {
    title: "QR Code Generator - Create Downloadable QR Codes",
    description:
      "Create QR codes instantly for any content. Download as PNG. Free online generator.",
    url: "https://www.appguiding.com/tools/qr-code-generator",
    type: "website",
  },
  keywords: ["QR code generator", "create QR code", "QR code maker", "free QR code", "download QR code"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
