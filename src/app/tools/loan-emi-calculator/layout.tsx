import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan EMI Calculator - Calculate Monthly Payments",
  description:
    "Calculate loan EMI (Equated Monthly Installment), total interest, and payment breakdown. Free online loan and EMI calculator for home loans, car loans, and personal loans.",
  alternates: { canonical: "/tools/loan-emi-calculator" },
  openGraph: {
    title: "Loan EMI Calculator - Calculate Monthly Payments",
    description:
      "Calculate your loan EMI and interest breakdown instantly. Free online loan calculator.",
    url: "https://www.appguiding.com/tools/loan-emi-calculator",
    type: "website",
  },
  keywords: ["EMI calculator", "loan calculator", "home loan EMI", "car loan calculator", "monthly payment calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
