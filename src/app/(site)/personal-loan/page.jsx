import PlHero from "@/components/personal-loan/PlHero/PlHero";
import PlHighlights from "@/components/personal-loan/PlHighlights/PlHighlights";
import PlUseCases from "@/components/personal-loan/PlUseCases/PlUseCases";
import PlSteps from "@/components/personal-loan/PlSteps/PlSteps";
import PlTable from "@/components/personal-loan/PlTable/PlTable";
import PlCta from "@/components/personal-loan/PlCta/PlCta";
import PlFaq from "@/components/personal-loan/PlFaq/PlFaq";
import CTABand from "@/components/ui/CTABand/CTABand";
import Disclaimer from "@/components/ui/Disclaimer/Disclaimer";

export const metadata = {
  title: "Personal Loan assistance — from 10.99% p.a.",
  description: "Personal loan assistance for ₹25,000 to ₹25 lakh. Compare partner rates, tenure and fees, with a written shortlist before you commit.",
  alternates: { canonical: "/personal-loan" },
};

export default function PersonalLoanPage() {
  return (
    <>
      <PlHero />
      <PlHighlights />
      <PlUseCases />
      <PlSteps />
      <PlCta />
      <PlTable />
      <PlFaq />
      <CTABand
        id="pl-final"
        eyebrow="Ready when you are"
        title="Compare three options before you sign"
        mark="anything."
        body="Send your requirement now. An advisor confirms your eligibility range and shares a written shortlist on WhatsApp."
        service="personal-loan"
        tone="navy"
        bullets={["₹0 customer fee in this demo", "No credit-score impact to enquire", "One named advisor until disbursal"]}
        primaryLabel="Check my personal loan options"
      />
      <div className="container disclaimer-wrap"><Disclaimer /></div>
    </>
  );
}
