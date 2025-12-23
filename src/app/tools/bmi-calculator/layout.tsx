import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI Calculator - Free Body Mass Index Tool",
  description:
    "Calculate your Body Mass Index (BMI) instantly with our free online BMI calculator. Get health category insights including underweight, normal, overweight, and obese classifications.",
  alternates: { canonical: "/tools/bmi-calculator" },
  openGraph: {
    title: "BMI Calculator - Free Online Tool",
    description:
      "Calculate your BMI and understand your health category. Free, instant, and private body mass index calculator.",
    url: "https://www.appguiding.com/tools/bmi-calculator",
    type: "website",
  },
  keywords: ["BMI calculator", "body mass index", "health calculator", "weight calculator", "BMI chart"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
