import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter - Format, Minify & Validate JSON",
  description:
    "Free online JSON formatter that beautifies, minifies, and validates JSON data. Format messy JSON into readable structure with syntax highlighting.",
  alternates: { canonical: "/tools/json-formatter" },
  openGraph: {
    title: "JSON Formatter - Format, Minify & Validate JSON",
    description:
      "Beautify, minify, and validate JSON instantly. Free online JSON formatter for developers.",
    url: "https://www.appguiding.com/tools/json-formatter",
    type: "website",
  },
  keywords: ["JSON formatter", "JSON beautifier", "JSON validator", "JSON minifier", "format JSON online"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
