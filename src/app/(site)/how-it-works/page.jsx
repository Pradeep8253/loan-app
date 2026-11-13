import HiwHero from "@/components/how-it-works/HiwHero/HiwHero";
import HiwTimeline from "@/components/how-it-works/HiwTimeline/HiwTimeline";
import HiwCompare from "@/components/how-it-works/HiwCompare/HiwCompare";
import HiwDocs from "@/components/how-it-works/HiwDocs/HiwDocs";
import HiwRoles from "@/components/how-it-works/HiwRoles/HiwRoles";
import HiwCta from "@/components/how-it-works/HiwCta/HiwCta";
import Disclaimer from "@/components/ui/Disclaimer/Disclaimer";

export const metadata = {
  title: "How loan assistance works — six steps",
  description: "From enquiry to disbursal in six transparent steps. Learn who does what, how long each stage takes, and where files usually stall.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <HiwHero />
      <HiwTimeline />
      <HiwCompare />
      <HiwDocs />
      <HiwRoles />
      <HiwCta />
      <div className="container disclaimer-wrap"><Disclaimer /></div>
    </>
  );
}
