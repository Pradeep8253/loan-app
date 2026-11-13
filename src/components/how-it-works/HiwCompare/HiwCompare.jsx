/**
 * HiwCompare — "what we do / what the lender does / what you do" in three solid
 * panels. Reinforces the compliance-safe positioning.
 */
import { ShieldCheck, Building2, UserCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import "./HiwCompare.css";

const PANELS = [
  { icon: ShieldCheck, title: "Mirvex does", tone: "navy", items: ["Explains products in plain language", "Checks your profile before you apply", "Compares partner policies and fees", "Coordinates documents and follow-ups"] },
  { icon: Building2, title: "The lender does", tone: "teal", items: ["Makes every credit decision", "Sets the final rate, fee and tenure", "Verifies documents and property", "Sanctions and disburses the loan"] },
  { icon: UserCheck, title: "You do", tone: "amber", items: ["Share accurate information", "Approve the shortlist you prefer", "Sign the lender's agreement", "Keep repayments on time"] },
];

export default function HiwCompare() {
  return (
    <section className="hiw-cmp section section--sky" aria-labelledby="hiw-cmp-title">
      <div className="container">
        <SectionHeading id="hiw-cmp-title" eyebrow="Who does what" title="Three parties. Clear lines." mark={["Clear lines"]} lede="Loan assistance is often confused with lending. This page exists to keep the boundary obvious." />
        <div className="hiw-cmp__grid">
          {PANELS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} variant="up" delay={i * 80} className={`hiw-cmp__panel hiw-cmp__panel--${p.tone}`}>
                <span className="hiw-cmp__icon" aria-hidden="true"><Icon size={22} /></span>
                <h3 className="hiw-cmp__title">{p.title}</h3>
                <ul>
                  {p.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
