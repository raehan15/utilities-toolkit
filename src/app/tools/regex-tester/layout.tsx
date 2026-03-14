import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex Tester - Online Regular Expression Tool | Tool Kit",
  description:
    "Test and debug regular expressions in real-time. See matches highlighted, capture groups extracted, and test replacements.",
  alternates: {
    canonical: "https://www.appguiding.com/tools/regex-tester",
  },
  openGraph: {
    title: "Regex Tester - Online Regular Expression Tool",
    description: "Test and debug regular expressions in real-time.",
    url: "https://www.appguiding.com/tools/regex-tester",
  },
  keywords: [
    "regex tester",
    "regular expression",
    "regex online",
    "regex debugger",
    "pattern matching",
    "regex replace",
  ],
};

export default function RegexTesterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
