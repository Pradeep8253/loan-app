/**
 * HomeMarquee — the amber trust ticker under the hero.
 */
import Marquee from "@/components/ui/Marquee/Marquee";
import "./HomeMarquee.css";

const ITEMS = [
  "18 partner banks & NBFCs compared",
  "No credit-score impact to enquire",
  "Advisor replies in ~30 minutes",
  "Written shortlist before you commit",
  "₹0 customer fee in this demo",
];

export default function HomeMarquee() {
  return (
    <div className="home-marquee">
      <Marquee items={ITEMS} tone="amber" label="Platform promises" />
    </div>
  );
}
