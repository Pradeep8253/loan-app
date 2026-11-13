import EmiHero from "@/components/emi-calculator/EmiHero/EmiHero";
import EmiTool from "@/components/emi-calculator/EmiTool/EmiTool";
import EmiExplainer from "@/components/emi-calculator/EmiExplainer/EmiExplainer";
import EmiFaq from "@/components/emi-calculator/EmiFaq/EmiFaq";
import Disclaimer from "@/components/ui/Disclaimer/Disclaimer";

export const metadata = {
  title: "EMI Calculator — free, no signup",
  description: "Calculate your monthly EMI, total interest and amortisation with a free reducing-balance EMI calculator. No signup required.",
  alternates: { canonical: "/emi-calculator" },
};

export default function EmiPage() {
  return (
    <>
      <EmiHero />
      <EmiTool />
      <EmiExplainer />
      <EmiFaq />
      <div className="container disclaimer-wrap"><Disclaimer /></div>
    </>
  );
}
