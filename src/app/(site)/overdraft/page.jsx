import OdHero from "@/components/overdraft/OdHero/OdHero";
import OdMechanism from "@/components/overdraft/OdMechanism/OdMechanism";
import OdScenarios from "@/components/overdraft/OdScenarios/OdScenarios";
import OdCompare from "@/components/overdraft/OdCompare/OdCompare";
import OdCta from "@/components/overdraft/OdCta/OdCta";
import OdFaq from "@/components/overdraft/OdFaq/OdFaq";
import CTABand from "@/components/ui/CTABand/CTABand";
import Disclaimer from "@/components/ui/Disclaimer/Disclaimer";

export const metadata = {
  title: "Overdraft assistance — pay only for what you draw",
  description: "Overdraft facility assistance from ₹50,000 to ₹10 lakh. Interest only on the amount drawn, with annual review and flexible repayment.",
  alternates: { canonical: "/overdraft" },
};

export default function OverdraftPage() {
  return (
    <>
      <OdHero />
      <OdMechanism />
      <OdScenarios />
      <OdCompare />
      <OdCta />
      <OdFaq />
      <CTABand
        id="od-final"
        eyebrow="Cash flow, sorted"
        title="A limit you can grow into"
        mark="next year."
        body="Tell us your average monthly turnover and banking vintage. The specialist will tell you honestly whether a limit or a term loan is the better fit."
        service="overdraft"
        tone="teal"
        bullets={["Interest on utilisation only", "Reusable through the facility", "Reviewed annually"]}
        primaryLabel="Speak to an overdraft specialist"
      />
      <div className="container disclaimer-wrap"><Disclaimer /></div>
    </>
  );
}
