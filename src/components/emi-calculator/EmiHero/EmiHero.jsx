/**
 * EmiHero — calculator masthead, lean so the tool appears above the fold on mobile.
 */
import PageHero from "@/components/ui/PageHero/PageHero";
import "./EmiHero.css";

export default function EmiHero() {
  return (
    <PageHero
      eyebrow="EMI Calculator"
      title="Run the numbers before anyone runs you."
      lede="Adjust the amount, rate and tenure to see the monthly EMI, total interest and amortisation. No signup, no phone number, no pressure."
      tone="white"
      facts={[
        { label: "Formula", value: "Reducing balance" },
        { label: "Currency", value: "₹ INR" },
        { label: "Updates", value: "Live" },
        { label: "Signup", value: "None" },
      ]}
    />
  );
}
