"use client";
/**
 * FaGroups — grouped FAQ accordions with sticky category tabs that jump in-page.
 */
import { useState } from "react";
import Accordion from "@/components/ui/Accordion/Accordion";
import { faqGroups } from "@/lib/data/faqs";
import "./FaGroups.css";

export default function FaGroups() {
  const [active, setActive] = useState(faqGroups[0].key);
  return (
    <section className="fa-groups section section--white" aria-labelledby="fa-groups-title">
      <div className="container">
        <h2 className="sr-only" id="fa-groups-title">FAQ by topic</h2>
        <div className="fa-groups__tabs" role="tablist" aria-label="FAQ topics">
          {faqGroups.map((g) => (
            <button
              key={g.key}
              type="button"
              role="tab"
              aria-selected={active === g.key}
              className={`fa-groups__tab ${active === g.key ? "is-active" : ""}`}
              onClick={() => {
                setActive(g.key);
                document.getElementById(`fa-${g.key}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {g.title}
              <span className="fa-groups__count">{g.faqs.length}</span>
            </button>
          ))}
        </div>
        <div className="fa-groups__list">
          {faqGroups.map((g) => (
            <div key={g.key} id={`fa-${g.key}`} className="fa-groups__group">
              <h3 className="fa-groups__title">{g.title}</h3>
              <Accordion items={g.faqs} defaultOpen={0} allowMultiple />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
