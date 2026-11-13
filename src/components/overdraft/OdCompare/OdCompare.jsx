/**
 * OdCompare — overdraft vs personal loan vs credit card, a three-column comparison
 * built from definition lists rather than a table.
 */
import { Check, Minus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import "./OdCompare.css";

const ROWS = [
  { label: "Interest applies to", od: "Amount drawn, daily", pl: "Full principal, from day one", cc: "Unpaid balance, monthly" },
  { label: "Reusable", od: true, pl: false, cc: true },
  { label: "Typical rate", od: "12.5% – 18% p.a.", pl: "10.99% – 22% p.a.", cc: "36% – 42% p.a." },
  { label: "Repayment", od: "Flexible, within facility", pl: "Fixed EMI", cc: "Minimum due or full" },
  { label: "Best for", od: "Uneven cash flow", pl: "A planned lump sum", cc: "Short, small spends" },
  { label: "Discipline required", od: "High", pl: "Medium", cc: "Very high" },
];

function Cell({ value }) {
  if (value === true) return <span className="od-cmp__yes"><Check aria-hidden="true" size={18} /> Yes</span>;
  if (value === false) return <span className="od-cmp__no"><Minus aria-hidden="true" size={18} /> No</span>;
  return <span>{value}</span>;
}

export default function OdCompare() {
  return (
    <section className="od-cmp section section--sky" aria-labelledby="od-cmp-title">
      <div className="container">
        <SectionHeading id="od-cmp-title" eyebrow="Overdraft vs alternatives" title="Pick the cheapest tool for the shape of the need." mark={["cheapest tool"]} lede="A credit card is convenient and expensive. A term loan is cheap per rupee but inflexible. An overdraft sits between them when usage is genuinely variable." />
        <Reveal variant="up" className="od-cmp__wrap">
          <table className="od-cmp__table">
            <caption className="sr-only">Comparison of overdraft, personal loan and credit card</caption>
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col" className="od-cmp__hl">Overdraft</th>
                <th scope="col">Personal Loan</th>
                <th scope="col">Credit Card</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row" data-label="Feature">{r.label}</th>
                  <td data-label="Overdraft" className="od-cmp__hl"><Cell value={r.od} /></td>
                  <td data-label="Personal Loan"><Cell value={r.pl} /></td>
                  <td data-label="Credit Card"><Cell value={r.cc} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
