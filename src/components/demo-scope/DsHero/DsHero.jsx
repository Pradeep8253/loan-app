/**
 * DsHero — demo-scope masthead stating plainly what is simulated.
 */
import PageHero from "@/components/ui/PageHero/PageHero";
import "./DsHero.css";

export default function DsHero() {
  return (
    <PageHero
      eyebrow="Demo scope"
      title="This is a demonstration. Here is exactly what that means."
      lede="Every screen is real. The data behind it is not. This page lists what works, what is simulated, and what a production deployment would need to add — so nobody is surprised later."
      tone="white"
      facts={[
        { label: "Frontend", value: "Fully working" },
        { label: "Backend", value: "None" },
        { label: "Data store", value: "Your browser" },
        { label: "Lender calls", value: "Simulated" },
      ]}
    />
  );
}
