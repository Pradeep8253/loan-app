/**
 * TrHero — tracking masthead with a search-style entry above the fold.
 */
import PageHero from "@/components/ui/PageHero/PageHero";
import "./TrHero.css";

export default function TrHero() {
  return (
    <PageHero
      eyebrow="Track Application"
      title="Know exactly where your file is."
      lede="Enter the reference from your enquiry (for example MVX-4821-RA) and see the current stage, the owner and the next action. Demo references are listed below the form."
      tone="white"
      facts={[
        { label: "Lookup", value: "Reference" },
        { label: "Updated", value: "On every stage change" },
        { label: "Owner", value: "Named advisor" },
        { label: "Channels", value: "Web + WhatsApp" },
      ]}
    />
  );
}
