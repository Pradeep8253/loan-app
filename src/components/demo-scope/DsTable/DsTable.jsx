/**
 * DsTable — a live-vs-simulated matrix grouped by area.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import "./DsTable.css";

const ROWS = [
  { area: "Lead capture", works: "Validated, deduplicated, saved locally, opens WhatsApp", sim: "EmailJS inbox instead of a CRM" },
  { area: "Application tracking", works: "Reference lookup, stage timeline, advisor notes", sim: "Three seeded applications in localStorage; no lender feed" },
  { area: "EMI calculator", works: "Reducing-balance maths, amortisation, presets", sim: "Rates are indicative ranges, not a live rate card" },
  { area: "Eligibility", works: "FOIR-based estimate with product profiles", sim: "No bureau pull, no lender policy engine" },
  { area: "Documents", works: "Checklists per product and per stage", sim: "Nothing uploaded; ticks are stored in your browser only" },
  { area: "Team dashboard", works: "Pipeline view, filters, status editing", sim: "Reads the same local records; changes stay on your device" },
  { area: "Notifications", works: "Toast confirmations, WhatsApp handoff", sim: "No SMS, email or push service connected" },
  { area: "Authentication", works: "—", sim: "No login anywhere; the dashboard is open by design" },
];

export default function DsTable() {
  return (
    <section className="ds-t section section--sky" aria-labelledby="ds-t-title">
      <div className="container">
        <SectionHeading id="ds-t-title" eyebrow="Live vs simulated" title="What is real, what is theatre." mark={["theatre"]} lede="Anything that touches money, credit or a lender is simulated. Everything on the interface — validation, state, layout, accessibility — is production-grade." />
        <div className="ds-t__wrap">
          <table className="ds-t__table">
            <caption className="sr-only">Feature comparison of live and simulated behaviour</caption>
            <thead>
              <tr><th scope="col">Area</th><th scope="col">Works in this demo</th><th scope="col">Simulated</th></tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.area}>
                  <th scope="row">{r.area}</th>
                  <td data-label="Works"><span className="ds-t__dot ds-t__dot--on" aria-hidden="true" />{r.works}</td>
                  <td data-label="Simulated"><span className="ds-t__dot ds-t__dot--sim" aria-hidden="true" />{r.sim}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
