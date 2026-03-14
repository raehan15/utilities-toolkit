import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markdown Previewer - Free Online Tool | Tool Kit",
  description:
    "Write and preview markdown in real-time. Convert markdown to HTML instantly. Perfect for README files, documentation, and blog posts.",
  alternates: {
    canonical: "https://www.appguiding.com/tools/markdown-previewer",
  },
  openGraph: {
    title: "Markdown Previewer - Free Online Tool",
    description:
      "Write and preview markdown in real-time. Convert markdown to HTML instantly.",
    url: "https://www.appguiding.com/tools/markdown-previewer",
  },
  keywords: [
    "markdown previewer",
    "markdown editor",
    "markdown to html",
    "live markdown preview",
    "readme editor",
    "documentation tool",
  ],
};

export default function MarkdownPreviewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
