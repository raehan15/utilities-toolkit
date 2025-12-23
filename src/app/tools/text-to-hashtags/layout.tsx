import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to Hashtags Generator - Create Trending Hashtags",
  description:
    "Generate relevant hashtags from your text content. Free online hashtag generator for Instagram, Twitter, TikTok, and other social media platforms.",
  alternates: { canonical: "/tools/text-to-hashtags" },
  openGraph: {
    title: "Text to Hashtags Generator - Create Trending Hashtags",
    description:
      "Generate hashtags from text instantly. Perfect for Instagram, Twitter, and TikTok.",
    url: "https://www.appguiding.com/tools/text-to-hashtags",
    type: "website",
  },
  keywords: ["hashtag generator", "text to hashtags", "Instagram hashtags", "Twitter hashtags", "social media hashtags"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
