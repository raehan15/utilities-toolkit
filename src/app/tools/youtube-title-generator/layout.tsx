import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Title Generator - Create Viral Video Titles",
  description:
    "Generate catchy, attention-grabbing YouTube titles for your videos. Free AI-powered YouTube title generator to boost views and engagement on your channel.",
  alternates: { canonical: "/tools/youtube-title-generator" },
  openGraph: {
    title: "YouTube Title Generator - Create Viral Video Titles",
    description:
      "Generate catchy, clickable YouTube titles instantly. Free tool to create engaging video titles that attract more views.",
    url: "https://www.appguiding.com/tools/youtube-title-generator",
    type: "website",
  },
  keywords: ["YouTube title generator", "video title generator", "viral titles", "YouTube SEO", "clickbait titles"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
