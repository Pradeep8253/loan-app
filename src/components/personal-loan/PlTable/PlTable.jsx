/**
 * PlTable — indicative partner-panel terms by profile type, plus a rate-note.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import "./PlTable.css";

const ROWS = [
  { profile: "Salaried (MNC / listed)", rate: "10.99% – 14.50%", amount: "up to ₹25L", tenure: "12–60 mo", fee: "0.5% – 2%" },
  { profile: "Salaried (other employers)", rate: "12.50% – 18.00%", amount: "up to ₹15L", tenure: "12–60 mo", fee: "1% – 2.5%" },
  { profile: "Self-employed professional", rate: "13.99% – 20.00%", amount: "up to ₹20L", tenure: "12–60 mo", fee: "1.5% – 3%" },
  { profile: "Self-employed business", rate: "15.00% – 22.00%", amount: "up to ₹15L", tenure: "12–48 mo", fee: "2% – 3%" },
];

export default function PlTable() {
  return (
    <section className="pl-table section section--sky" aria-labelledby="pl-table-title">
      <div className="container">
        <SectionHeading id="pl-table-title" eyebrow="Indicative pricing" title="Rates by profile, not by advertisement." mark={["profile"]} lede="These are the ranges our partner panel typically quotes. Anything outside them is a signal to ask harder questions." />
        <Reveal variant="up" className="pl-table__wrap">
          <table className="pl-table__table">
            <caption className="sr-only">Indicative personal loan rates by borrower profile</caption>
            <thead>
              <tr><th scope="col">Profile</th><th scope="col">Rate p.a.</th><th scope="col">Amount</th><th scope="col">Tenure</th><th scope="col">Processing fee</th></tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.profile}>
                  <th scope="row" data-label="Profile">{r.profile}</th>
                  <td data-label="Rate p.a."><strong>{r.rate}</strong></td>
                  <td data-label="Amount">{r.amount}</td>
                  <td data-label="Tenure">{r.tenure}</td>
                  <td data-label="Processing fee">{r.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="pl-table__note">Rates exclude GST on fees. Insurance is optional and never a condition of approval from Mirvex — if a partner bundles it, ask for the unbundled price.</p>
      </div>
    </section>
  );
}
