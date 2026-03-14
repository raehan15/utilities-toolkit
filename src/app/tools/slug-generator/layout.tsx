import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slug Generator - URL-Friendly Text Converter | Tool Kit",
  description:
    "Convert titles and text into clean, SEO-friendly URL slugs. Customize separators, length limits, and more.",
  alternates: {
    canonical: "https://www.appguiding.com/tools/slug-generator",
  },
  openGraph: {
    title: "Slug Generator - URL-Friendly Text Converter",
    description:
      "Convert titles and text into clean, SEO-friendly URL slugs.",
    url: "https://www.appguiding.com/tools/slug-generator",
  },
  keywords: [
    "slug generator",
    "url slug",
    "seo friendly url",
    "url converter",
    "permalink generator",
    "text to slug",
  ],
};

export default function SlugGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
