/**
 * HlPaths — the four funding paths as image cards with a cost-and-paperwork note each.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import SmartImage from "@/components/ui/SmartImage/SmartImage";
import "./HlPaths.css";

const PATHS = [
  { slot: "home.purchase", title: "Ready to move", body: "Resale or builder inventory. The lender verifies title, encumbrance and the agreement to sell.", tag: "80% of value", note: "Registration and stamp duty are usually not financed." },
  { slot: "home.construction", title: "Self-construction", body: "Funds release in stages against engineer certificates, matched to the build schedule.", tag: "Staged release", note: "Approved plan and estimate required up front." },
  { slot: "home.renovation", title: "Renovation", body: "Structural work, waterproofing, flooring or a full interior fit-out.", tag: "₹2L – ₹50L", note: "Often assessed as a home-improvement loan." },
  { slot: "home.interior", title: "Interiors", body: "Modular kitchens, wardrobes and furnishing — sometimes with a shorter tenure.", tag: "Up to 10 yrs", note: "Compare the rate against a personal loan first." },
];

export default function HlPaths() {
  return (
    <section className="hl-paths section section--white" aria-labelledby="hl-paths-title">
      <div className="container">
        <SectionHeading id="hl-paths-title" eyebrow="What the loan covers" title="Four ways to fund a home." mark={["fund a home"]} lede="Each path has a different valuation rhythm. Construction, in particular, releases money in stages rather than one transfer." />
        <div className="hl-paths__grid">
          {PATHS.map((p, i) => (
            <Reveal key={p.title} variant="up" delay={i * 70} className="hl-path">
              <SmartImage slot={p.slot} ratio="16 / 10" sizes="(max-width: 767px) 92vw, (max-width: 1100px) 50vw, 560px" />
              <div className="hl-path__body">
                <div className="hl-path__head">
                  <h3 className="hl-path__title">{p.title}</h3>
                  <span className="hl-path__tag">{p.tag}</span>
                </div>
                <p className="hl-path__text">{p.body}</p>
                <p className="hl-path__note">{p.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
