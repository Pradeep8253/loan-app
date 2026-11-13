"use client";
/**
 * BlDocs — a custom document checklist where each item can be ticked to build a
 * "ready score". Local-only, intentionally simple.
 */
import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import Button from "@/components/ui/Button/Button";
import { useEnquiry } from "@/context/EnquiryContext";
import "./BlDocs.css";

const ITEMS = [
  { id: "pan", label: "PAN card (proprietor or directors)" },
  { id: "aadhaar", label: "Aadhaar of all signatories" },
  { id: "gst", label: "GST registration certificate" },
  { id: "gst-returns", label: "GST returns — last 12 months" },
  { id: "bank", label: "Current account statement — last 6 months" },
  { id: "itr", label: "ITR — last 2 years" },
  { id: "udyam", label: "Udyam or shop establishment proof" },
  { id: "loss", label: "Existing loan statements (if any)" },
];

export default function BlDocs() {
  const [checked, setChecked] = useState([]);
  const { openEnquiry } = useEnquiry();
  const score = useMemo(() => Math.round((checked.length / ITEMS.length) * 100), [checked]);
  const toggle = (id) => setChecked((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  return (
    <section className="bl-docs section section--white" aria-labelledby="bl-docs-title">
      <div className="container bl-docs__grid">
        <div>
          <SectionHeading id="bl-docs-title" eyebrow="Readiness check" title="Tick what you already have." mark={["already have"]} lede="This does not submit anything. It simply shows the gap between where you are and a complete file." />
          <Reveal variant="up" className="bl-docs__meter">
            <div className="bl-docs__meter-head">
              <span>Document readiness</span>
              <strong>{score}%</strong>
            </div>
            <div className="bl-docs__meter-track" aria-hidden="true"><span className="bl-docs__meter-fill" style={{ "--fill-w": `${score}%` }} /></div>
            <p className="bl-docs__meter-note">
              {score === 100 ? "Complete file. An advisor can move this to submission today." : score >= 60 ? "Close. The advisor can request the remaining items in one message." : "Start with the top four — they unlock most partner policies."}
            </p>
          </Reveal>
          <div className="bl-docs__cta">
            <Button variant="dark" size="lg" block onClick={() => openEnquiry({ service: "business-loan", source: "bl.docs", message: `Readiness score ${score}%` })}>
              Send this to an advisor
            </Button>
          </div>
        </div>
        <Reveal variant="right" className="bl-docs__list-card">
          <ul className="bl-docs__list">
            {ITEMS.map((item) => {
              const on = checked.includes(item.id);
              return (
                <li key={item.id}>
                  <label className={`bl-docs__item ${on ? "is-on" : ""}`}>
                    <input type="checkbox" checked={on} onChange={() => toggle(item.id)} />
                    <span className="bl-docs__box" aria-hidden="true">{on ? <Check size={14} /> : null}</span>
                    <span>{item.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
