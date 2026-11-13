/**
 * HlCosts — the costs nobody itemises, in a definition list with a total example.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import { formatINR } from "@/lib/format";
import "./HlCosts.css";

const COSTS = [
  { label: "Stamp duty", detail: "State-set, typically 5–7% of the registered value.", example: 420000 },
  { label: "Registration", detail: "Usually 1–2% of the property value.", example: 90000 },
  { label: "Processing fee", detail: "0.25–1% of the loan, plus GST.", example: 45000 },
  { label: "Legal & valuation", detail: "₹3,000–₹15,000 depending on the lender.", example: 12000 },
  { label: "Insurance", detail: "Optional property or term cover. Never mandatory from Mirvex.", example: 18000 },
];

export default function HlCosts() {
  const total = COSTS.reduce((s, c) => s + c.example, 0);
  return (
    <section className="hl-costs section section--sky" aria-labelledby="hl-costs-title">
      <div className="container hl-costs__grid">
        <div>
          <SectionHeading id="hl-costs-title" eyebrow="The full bill" title="The costs outside the EMI." mark={["outside the EMI"]} lede="A ₹75 lakh purchase needs roughly ₹6–7 lakh of costs on top of the down payment. Buyers who budget only the EMI get surprised at registration." />
        </div>
        <Reveal variant="right" className="hl-costs__card">
          <dl className="hl-costs__list">
            {COSTS.map((c) => (
              <div className="hl-costs__row" key={c.label}>
                <div>
                  <dt>{c.label}</dt>
                  <dd className="hl-costs__detail">{c.detail}</dd>
                </div>
                <dd className="hl-costs__amount">{formatINR(c.example)}</dd>
              </div>
            ))}
          </dl>
          <div className="hl-costs__total">
            <span>Example total on ₹75L, Pune</span>
            <strong>{formatINR(total)}</strong>
          </div>
          <p className="hl-costs__note">Illustrative only. Stamp duty varies by state, gender of the buyer and property type.</p>
        </Reveal>
      </div>
    </section>
  );
}
