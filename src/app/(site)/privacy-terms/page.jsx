import LeHero from "@/components/legal/LeHero/LeHero";
import LeBody from "@/components/legal/LeBody/LeBody";
import { legalSections } from "@/lib/data/legal";

export const metadata = {
  title: "Privacy policy and terms of use",
  description: "What the Mirvex platform stores, where form data goes, and the terms that govern this demonstration.",
  alternates: { canonical: "/privacy-terms" },
};

export default function PrivacyTermsPage() {
  return (
    <>
      <LeHero sections={legalSections} />
      <LeBody sections={legalSections} />
    </>
  );
}
