"use client";
/**
 * BtSteps — the four-step transfer process, drawn as a numbered horizontal strip
 * with a "documents you will need" drawer.
 */
import { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import "./BtSteps.css";

const STEPS = [
  { n: "01", title: "Share the statement", body: "Existing loan statement, foreclosure letter and last 6 months of banking." },
  { n: "02", title: "Compare offers", body: "We show rate, fee, tenure and net saving after charges — two or three partners." },
  { n: "03", title: "Switch or consolidate", body: "New lender disburses to close the old loan. You confirm the closure in writing." },
  { n: "04", title: "One EMI from here", body: "Repayment schedule issued. If consolidating, all loans close and one EMI begins." },
];

const DOCS = ["PAN card", "Aadhaar card", "Existing loan statement", "Foreclosure letter", "Last 6 months' bank statement", "Income proof (salary slips or ITR)", "Property documents (for secured transfers)"];

export default function BtSteps() {
  const [open, setOpen] = useState(false);
  return (
    <section className="bt-steps section section--navy" aria-labelledby="bt-steps-title">
      <div className="container">
        <SectionHeading id="bt-steps-title" eyebrow="The switch" title="Four moves, in order." mark={["in order"]} tone="dark" lede="The sequence matters. Closing the old loan before the new one is sanctioned is a common and expensive mistake." />
        <ol className="bt-steps__row">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} variant="up" delay={i * 70} className="bt-step">
              <span className="bt-step__n">{s.n}</span>
              <h3 className="bt-step__title">{s.title}</h3>
              <p className="bt-step__body">{s.body}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal variant="up" className="bt-steps__docs">
          <button type="button" className="bt-steps__toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            <span><FileText aria-hidden="true" size={18} /> Documents you will need ({DOCS.length})</span>
            <ChevronDown aria-hidden="true" size={20} className={open ? "rot" : ""} />
          </button>
          <div className={`bt-steps__drawer ${open ? "is-open" : ""}`}>
            <ul>
              {DOCS.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
