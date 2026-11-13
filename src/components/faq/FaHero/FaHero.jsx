/**
 * FaHero — FAQ masthead with quick jump links.
 */
import PageHero from "@/components/ui/PageHero/PageHero";
import "./FaHero.css";

export default function FaHero() {
  return (
    <PageHero
      eyebrow="FAQ"
      title="The questions we actually hear."
      lede="Grouped by what people are trying to decide — whether to apply, how much they can borrow, and what happens to their data. If yours is missing, the desk answers WhatsApp faster than any form."
      tone="sky"
      facts={[
        { label: "Topics", value: "3 groups" },
        { label: "Questions", value: "11" },
        { label: "Updated", value: "Nov 2026" },
        { label: "Still stuck?", value: "Contact" },
      ]}
    />
  );
}
