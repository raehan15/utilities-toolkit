import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unit Converter - Length, Weight, Temperature & More",
  description:
    "Convert between units of length, weight, temperature, and more. Free online unit converter with support for metric and imperial measurements.",
  alternates: { canonical: "/tools/unit-converter" },
  openGraph: {
    title: "Unit Converter - Length, Weight, Temperature & More",
    description:
      "Convert between units instantly. Length, weight, temperature, and more. Free online tool.",
    url: "https://www.appguiding.com/tools/unit-converter",
    type: "website",
  },
  keywords: ["unit converter", "length converter", "weight converter", "temperature converter", "metric converter"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
