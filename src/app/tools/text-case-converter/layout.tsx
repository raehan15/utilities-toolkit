import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Case Converter - Free Online Tool | Tool Kit",
  description:
    "Convert text between uppercase, lowercase, title case, camelCase, snake_case, kebab-case, and more. Free online text transformation tool.",
  alternates: {
    canonical: "https://www.appguiding.com/tools/text-case-converter",
  },
  openGraph: {
    title: "Text Case Converter - Free Online Tool",
    description:
      "Convert text between uppercase, lowercase, title case, camelCase, snake_case, and more.",
    url: "https://www.appguiding.com/tools/text-case-converter",
  },
  keywords: [
    "text case converter",
    "uppercase converter",
    "lowercase converter",
    "title case",
    "camelCase converter",
    "snake_case converter",
    "kebab-case",
    "text transformer",
  ],
};

export default function TextCaseConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
