import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Palette Generator - Create Beautiful Color Schemes",
  description:
    "Generate beautiful color palettes from hex colors. Create harmonious color schemes for web design, UI/UX, and graphic design projects.",
  alternates: { canonical: "/tools/color-palette-generator" },
  openGraph: {
    title: "Color Palette Generator - Create Beautiful Color Schemes",
    description:
      "Generate stunning color palettes instantly. Free tool for designers and developers.",
    url: "https://www.appguiding.com/tools/color-palette-generator",
    type: "website",
  },
  keywords: ["color palette generator", "color scheme generator", "hex color palette", "UI colors", "design colors"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
