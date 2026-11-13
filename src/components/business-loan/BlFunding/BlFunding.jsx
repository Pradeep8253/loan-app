/**
 * BlFunding — the assessment logic shown as a "what the algorithm sees" panel with
 * weighted bars, plus practical improvement tips.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import SmartImage from "@/components/ui/SmartImage/SmartImage";
import "./BlFunding.css";

const WEIGHTS = [
  { label: "Banking behaviour", weight: 30, note: "Average balance, bounces, turnover trend" },
  { label: "GST turnover", weight: 25, note: "Consistency beats a single big quarter" },
  { label: "Vintage of business", weight: 20, note: "Usually 2+ years for unsecured" },
  { label: "Credit & obligations", weight: 15, note: "Personal and business bureau" },
  { label: "Sector risk", weight: 10, note: "Lender appetite varies by industry" },
];

export default function BlFunding() {
  return (
    <section className="bl-fund section section--sky" aria-labelledby="bl-fund-title">
      <div className="container bl-fund__grid">
        <div>
          <SectionHeading id="bl-fund-title" eyebrow="How you are assessed" title="What the lender actually weighs." mark={["actually weighs"]} lede="Banking behaviour and GST consistency dominate. A tidy current account with steady monthly credits is worth more than glowing references." />
          <Reveal variant="up" className="bl-fund__improve">
            <p className="bl-fund__improve-title">Three things you can fix this month</p>
            <ol>
              <li>Route all receipts through the current account — cash credits do not count.</li>
              <li>File GST on time for six straight months before applying.</li>
              <li>Clear small credit-card balances to bring utilisation under 40%.</li>
            </ol>
          </Reveal>
        </div>
        <Reveal variant="right" className="bl-fund__card">
          <SmartImage slot="biz.machinery" ratio="21 / 9" sizes="(max-width: 899px) 92vw, 520px" className="bl-fund__img" />
          <div className="bl-fund__bars">
            {WEIGHTS.map((w) => (
              <div className="bl-fund__bar-row" key={w.label}>
                <div className="bl-fund__bar-head">
                  <span>{w.label}</span>
                  <strong>{w.weight}%</strong>
                </div>
                <div className="bl-fund__track" aria-hidden="true"><span className="bl-fund__fill" style={{ "--fill-w": `${w.weight * 2.6}%` }} /></div>
                <p className="bl-fund__bar-note">{w.note}</p>
              </div>
            ))}
          </div>
          <p className="bl-fund__foot">Weighting is illustrative of typical partner scorecards, not a published formula.</p>
        </Reveal>
      </div>
    </section>
  );
}
