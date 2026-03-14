import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Minifier - CSS & JavaScript | Tool Kit",
  description:
    "Minify CSS and JavaScript code to reduce file size. Includes beautifier to format minified code. Free online tool.",
  alternates: {
    canonical: "https://www.appguiding.com/tools/code-minifier",
  },
  openGraph: {
    title: "Code Minifier - CSS & JavaScript",
    description: "Minify CSS and JavaScript code to reduce file size.",
    url: "https://www.appguiding.com/tools/code-minifier",
  },
  keywords: [
    "code minifier",
    "css minifier",
    "javascript minifier",
    "js minifier",
    "code compressor",
    "beautify code",
  ],
};

export default function CodeMinifierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
