import ElHero from "@/components/eligibility/ElHero/ElHero";
import ElTool from "@/components/eligibility/ElTool/ElTool";
import ElFactors from "@/components/eligibility/ElFactors/ElFactors";
import ElCta from "@/components/eligibility/ElCta/ElCta";
import Disclaimer from "@/components/ui/Disclaimer/Disclaimer";

export const metadata = {
  title: "Eligibility Check — estimate your loan range",
  description: "Estimate your eligible loan amount from income and existing obligations. No credit-bureau pull, no signup.",
  alternates: { canonical: "/eligibility" },
};

export default function EligibilityPage() {
  return (
    <>
      <ElHero />
      <ElTool />
      <ElFactors />
      <ElCta />
      <div className="container disclaimer-wrap"><Disclaimer /></div>
    </>
  );
}
