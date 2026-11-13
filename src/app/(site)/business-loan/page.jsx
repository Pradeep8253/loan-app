import BlHero from "@/components/business-loan/BlHero/BlHero";
import BlTypes from "@/components/business-loan/BlTypes/BlTypes";
import BlFunding from "@/components/business-loan/BlFunding/BlFunding";
import BlDocs from "@/components/business-loan/BlDocs/BlDocs";
import BlFaq from "@/components/business-loan/BlFaq/BlFaq";
import BlCta from "@/components/business-loan/BlCta/BlCta";
import CTABand from "@/components/ui/CTABand/CTABand";
import Disclaimer from "@/components/ui/Disclaimer/Disclaimer";

export const metadata = {
  title: "Business Loan assistance — MSME working capital",
  description: "Business loan assistance from ₹1 lakh to ₹50 lakh. Unsecured, secured and invoice finance for MSMEs, with GST and banking-based assessment.",
  alternates: { canonical: "/business-loan" },
};

export default function BusinessLoanPage() {
  return (
    <>
      <BlHero />
      <BlTypes />
      <BlFunding />
      <BlDocs />
      <BlFaq />
      <CTABand
        id="bl-mid"
        eyebrow="One advisor, one sector desk"
        title="Orders should not wait for"
        mark="receivables."
        body="Tell us the gap in your cash cycle. We will tell you whether a term loan, an overdraft or invoice finance is the cheaper fix."
        service="business-loan"
        tone="teal"
        bullets={["Collateral-free options", "GST-based assessment", "Written terms before commitment"]}
        primaryLabel="Talk to the business desk"
      />
      <BlCta />
      <div className="container disclaimer-wrap"><Disclaimer /></div>
    </>
  );
}
