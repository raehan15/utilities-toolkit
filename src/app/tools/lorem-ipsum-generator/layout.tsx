import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator - Free Placeholder Text | Tool Kit",
  description:
    "Generate customizable lorem ipsum placeholder text for your designs, mockups, and layouts. Adjust paragraph count and word length.",
  alternates: {
    canonical: "https://www.appguiding.com/tools/lorem-ipsum-generator",
  },
  openGraph: {
    title: "Lorem Ipsum Generator - Free Placeholder Text",
    description:
      "Generate customizable lorem ipsum placeholder text for your designs and mockups.",
    url: "https://www.appguiding.com/tools/lorem-ipsum-generator",
  },
  keywords: [
    "lorem ipsum generator",
    "placeholder text",
    "dummy text",
    "filler text",
    "design mockup text",
    "lorem ipsum",
  ],
};

export default function LoremIpsumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
