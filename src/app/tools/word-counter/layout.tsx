import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Counter - Live Word & Character Count",
  description:
    "Count words, characters, sentences, and paragraphs in real-time. Free online word counter and character counter for writers, students, and content creators.",
  alternates: { canonical: "/tools/word-counter" },
  openGraph: {
    title: "Word Counter - Live Word & Character Count",
    description:
      "Count words, characters, and more in real-time. Free online word counter tool.",
    url: "https://www.appguiding.com/tools/word-counter",
    type: "website",
  },
  keywords: ["word counter", "character counter", "word count tool", "text counter", "letter counter"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
