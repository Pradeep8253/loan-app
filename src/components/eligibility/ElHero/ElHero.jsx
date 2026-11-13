/**
 * ElHero — eligibility masthead explaining that no bureau pull happens here.
 */
import PageHero from "@/components/ui/PageHero/PageHero";
import "./ElHero.css";

export default function ElHero() {
  return (
    <PageHero
      eyebrow="Eligibility Check"
      title="See your realistic range before you apply."
      lede="Two minutes of inputs against typical partner policies. This is an estimator, not a decision — and it never touches your credit report."
      tone="sky"
      facts={[
        { label: "Inputs", value: "4 fields" },
        { label: "Bureau pull", value: "None" },
        { label: "Accuracy", value: "Indicative" },
        { label: "Next step", value: "Advisor check" },
      ]}
    />
  );
}
