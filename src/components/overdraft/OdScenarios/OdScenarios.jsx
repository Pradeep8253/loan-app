"use client";
/**
 * OdScenarios — who an overdraft actually suits, as selectable scenario cards.
 */
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import { overdraftScenarios } from "@/lib/data/content";
import { useEnquiry } from "@/context/EnquiryContext";
import "./OdScenarios.css";

export default function OdScenarios() {
  const [active, setActive] = useState(0);
  const { openEnquiry } = useEnquiry();
  const current = overdraftScenarios[active];

  return (
    <section className="od-sc section section--white" aria-labelledby="od-sc-title">
      <div className="container od-sc__grid">
        <div>
          <SectionHeading id="od-sc-title" eyebrow="Who it suits" title="Four cash-flow patterns that fit a limit." mark={["cash-flow"]} lede="Pick the pattern closest to yours. The advisor will map it to a partner whose policy accepts that profile." />
          <div className="od-sc__tabs" role="tablist" aria-label="Overdraft scenarios">
            {overdraftScenarios.map((s, i) => (
              <button
                key={s.title}
                role="tab"
                aria-selected={active === i}
                className={`od-sc__tab ${active === i ? "is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="od-sc__tab-tag">{s.tag}</span>
                <span className="od-sc__tab-title">{s.title}</span>
              </button>
            ))}
          </div>
        </div>
        <Reveal key={current.title} variant="scale" className="od-sc__panel">
          <p className="od-sc__panel-tag">{current.tag}</p>
          <h3 className="od-sc__panel-title">{current.title}</h3>
          <p className="od-sc__panel-body">{current.body}</p>
          <div className="od-sc__panel-facts">
            <span>Suggested check</span>
            <p>Turnover, banking vintage and existing EMIs decide the limit — usually 10–20% of annual turnover.</p>
          </div>
          <button type="button" className="od-sc__panel-cta" onClick={() => openEnquiry({ service: "overdraft", source: "od.scenarios" })}>
            Ask about this pattern <ArrowRight aria-hidden="true" size={16} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
