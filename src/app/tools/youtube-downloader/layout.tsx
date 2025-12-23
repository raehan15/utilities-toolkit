import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Downloader Guide - Best Tools & Methods",
  description:
    "Comprehensive guide to YouTube downloader tools and methods. Learn how to download YouTube videos legally and safely using various free tools and services.",
  alternates: { canonical: "/tools/youtube-downloader" },
  openGraph: {
    title: "YouTube Downloader Guide - Best Tools & Methods",
    description:
      "Complete guide to download YouTube videos. Learn about the best tools and methods available.",
    url: "https://www.appguiding.com/tools/youtube-downloader",
    type: "website",
  },
  keywords: ["YouTube downloader", "download YouTube videos", "YouTube video download", "video downloader", "YouTube mp4"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
