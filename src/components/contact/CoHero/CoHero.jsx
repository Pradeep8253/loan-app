/**
 * CoHero — contact masthead with the four channels listed as facts.
 */
import PageHero from "@/components/ui/PageHero/PageHero";
import "./CoHero.css";

export default function CoHero() {
  return (
    <PageHero
      eyebrow="Contact"
      title="Talk to a person, on the channel you prefer."
      lede="WhatsApp gets the fastest reply, phone is best for anything complex, and the office is open six days a week. Every enquiry gets a named advisor and a reference."
      tone="white"
      facts={[
        { label: "WhatsApp", value: "~30 min reply" },
        { label: "Phone", value: "Mon–Sat, 9:30–7" },
        { label: "Email", value: "Same working day" },
        { label: "Office", value: "Prayagraj" },
      ]}
    />
  );
}
