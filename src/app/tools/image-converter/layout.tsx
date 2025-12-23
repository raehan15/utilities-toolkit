import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Converter - Convert PNG, JPEG, WebP Online",
  description:
    "Convert images between PNG, JPEG, and WebP formats instantly. Free online image format converter that works in your browser.",
  alternates: { canonical: "/tools/image-converter" },
  openGraph: {
    title: "Image Converter - Convert PNG, JPEG, WebP Online",
    description:
      "Convert images between formats instantly. PNG to JPEG, JPEG to WebP, and more. Free online tool.",
    url: "https://www.appguiding.com/tools/image-converter",
    type: "website",
  },
  keywords: ["image converter", "PNG to JPEG", "JPEG to WebP", "image format converter", "convert images online"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
