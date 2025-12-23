import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Converter - Export Text to PDF",
  description:
    "Convert text to PDF documents locally in your browser. Free online PDF converter with no file uploads - your data stays private.",
  alternates: { canonical: "/tools/pdf-converter" },
  openGraph: {
    title: "PDF Converter - Export Text to PDF",
    description:
      "Convert text to PDF instantly in your browser. Free, private, no uploads required.",
    url: "https://www.appguiding.com/tools/pdf-converter",
    type: "website",
  },
  keywords: ["PDF converter", "text to PDF", "create PDF online", "PDF generator", "export to PDF"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
