import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to Base64 Converter - Convert Images Online",
  description:
    "Convert images to Base64 encoded strings instantly. Free online tool to convert PNG, JPG, GIF, and other image formats to Base64 for embedding in HTML/CSS.",
  alternates: { canonical: "/tools/image-to-base64" },
  openGraph: {
    title: "Image to Base64 Converter - Convert Images Online",
    description:
      "Convert any image to Base64 string for web embedding. Free online image encoder.",
    url: "https://www.appguiding.com/tools/image-to-base64",
    type: "website",
  },
  keywords: ["image to base64", "base64 encoder", "image encoder", "data URI generator", "convert image online"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
