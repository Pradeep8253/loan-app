/**
 * BtMath — a worked example table + break-even note, so the customer sees the
 * arithmetic rather than the marketing.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import { formatINR } from "@/lib/format";
import "./BtMath.css";

const ROWS = [
  { label: "Outstanding balance", old: 800000, next: 800000 },
  { label: "Rate", old: "16.0% p.a.", next: "11.5% p.a." },
  { label: "Remaining tenure", old: "36 months", next: "36 months" },
  { label: "Monthly EMI", old: 28144, next: 26377 },
  { label: "Total interest", old: 213184, next: 149572 },
  { label: "Processing + legal (est.)", old: "—", next: 16000 },
];

export default function BtMath() {
  return (
    <section className="bt-math section section--white" aria-labelledby="bt-math-title">
      <div className="container">
        <SectionHeading id="bt-math-title" eyebrow="Worked example" title="The arithmetic, laid bare." mark={["arithmetic"]} lede="A ₹8 lakh personal loan with 36 months left, moved from 16% to 11.5%. The fee is subtracted from the saving — not ignored." />
        <Reveal variant="up" className="bt-math__card">
          <table className="bt-math__table">
            <caption className="sr-only">Worked balance transfer example</caption>
            <thead>
              <tr><th scope="col">Line item</th><th scope="col">Current loan</th><th scope="col">After transfer</th></tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td data-label="Current loan">{typeof r.old === "number" ? formatINR(r.old) : r.old}</td>
                  <td data-label="After transfer" className="bt-math__next">{typeof r.next === "number" ? formatINR(r.next) : r.next}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bt-math__summary">
            <div>
              <span>Net interest saved</span>
              <strong>{formatINR(213184 - 149572 - 16000)}</strong>
            </div>
            <div>
              <span>Break-even</span>
              <strong>~23 months</strong>
            </div>
          </div>
        </Reveal>
        <p className="bt-math__note">Numbers are illustrative. Your foreclosure charge, fee waiver and new tenure change the result — the advisor recalculates with your actual statement.</p>
      </div>
    </section>
  );
}
