import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Converter - Encode & Decode Base64 Text",
  description:
    "Encode text to Base64 or decode Base64 to text instantly. Free online Base64 converter for developers and data encoding needs.",
  alternates: { canonical: "/tools/base64-converter" },
  openGraph: {
    title: "Base64 Converter - Encode & Decode Base64 Text",
    description:
      "Encode and decode Base64 instantly. Free online Base64 converter tool.",
    url: "https://www.appguiding.com/tools/base64-converter",
    type: "website",
  },
  keywords: ["base64 encoder", "base64 decoder", "base64 converter", "encode base64", "decode base64"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
