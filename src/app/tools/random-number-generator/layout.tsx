import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Number Generator - Generate Random Numbers",
  description:
    "Free online random number generator. Generate random numbers within any range. Perfect for games, lotteries, decisions, and statistical sampling.",
  alternates: { canonical: "/tools/random-number-generator" },
  openGraph: {
    title: "Random Number Generator - Generate Random Numbers",
    description:
      "Generate truly random numbers within any range. Free online random number generator tool.",
    url: "https://www.appguiding.com/tools/random-number-generator",
    type: "website",
  },
  keywords: ["random number generator", "RNG", "random picker", "number randomizer", "dice roller"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
