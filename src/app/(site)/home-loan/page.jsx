import HlHero from "@/components/home-loan/HlHero/HlHero";
import HlPaths from "@/components/home-loan/HlPaths/HlPaths";
import HlNumbers from "@/components/home-loan/HlNumbers/HlNumbers";
import HlProcess from "@/components/home-loan/HlProcess/HlProcess";
import HlCosts from "@/components/home-loan/HlCosts/HlCosts";
import HlFaq from "@/components/home-loan/HlFaq/HlFaq";
import CTABand from "@/components/ui/CTABand/CTABand";
import Disclaimer from "@/components/ui/Disclaimer/Disclaimer";

export const metadata = {
  title: "Home Loan assistance — purchase, construction, renovation",
  description: "Home loan assistance from ₹5 lakh to ₹2 crore. Purchase, construction and renovation finance with legal, technical and documentation coordination.",
  alternates: { canonical: "/home-loan" },
};

export default function HomeLoanPage() {
  return (
    <>
      <HlHero />
      <HlPaths />
      <HlNumbers />
      <HlProcess />
      <HlCosts />
      <HlFaq />
      <CTABand
        id="hl-final"
        eyebrow="Start early"
        title="Pre-approval first,"
        mark="property second."
        body="A funded buyer negotiates better. Get your income and obligation checked before you shortlist, and know your ceiling to the rupee."
        service="home-loan"
        tone="navy"
        bullets={["Valuation coordinated in 48 hours", "Legal and technical documents tracked", "One advisor through registration"]}
        primaryLabel="Book a home loan consultation"
      />
      <div className="container disclaimer-wrap"><Disclaimer /></div>
    </>
  );
}
