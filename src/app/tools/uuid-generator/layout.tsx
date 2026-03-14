import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UUID Generator - Free Online Tool | Tool Kit",
  description:
    "Generate random UUIDs (v4) for your applications. Create multiple UUIDs in different formats - standard, uppercase, or without dashes.",
  alternates: {
    canonical: "https://www.appguiding.com/tools/uuid-generator",
  },
  openGraph: {
    title: "UUID Generator - Free Online Tool",
    description: "Generate random UUIDs (v4) for your applications.",
    url: "https://www.appguiding.com/tools/uuid-generator",
  },
  keywords: [
    "uuid generator",
    "guid generator",
    "random uuid",
    "uuid v4",
    "unique identifier",
    "uuid online",
  ],
};

export default function UUIDGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
