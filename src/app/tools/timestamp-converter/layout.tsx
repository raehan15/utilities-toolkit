import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timestamp Converter - Unix to Date | Tool Kit",
  description:
    "Convert Unix timestamps to human-readable dates and vice versa. Supports multiple timezones and date formats.",
  alternates: {
    canonical: "https://www.appguiding.com/tools/timestamp-converter",
  },
  openGraph: {
    title: "Timestamp Converter - Unix to Date",
    description: "Convert Unix timestamps to human-readable dates and vice versa.",
    url: "https://www.appguiding.com/tools/timestamp-converter",
  },
  keywords: [
    "timestamp converter",
    "unix timestamp",
    "epoch converter",
    "date to timestamp",
    "timestamp to date",
    "unix time",
  ],
};

export default function TimestampConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
