"use client";
/**
 * HiwDocs — document checklist grouped by category with tabs, plus a note that
 * documents are collected once.
 */
import { useState } from "react";
import { IdCard, FileText, Building2, Home, Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import { documentGroups } from "@/lib/data/documents";
import "./HiwDocs.css";

const ICONS = { IdCard, FileText, Building2, Home };

export default function HiwDocs() {
  const [active, setActive] = useState(documentGroups[0].key);
  const group = documentGroups.find((g) => g.key === active);
  return (
    <section className="hiw-docs section section--white" aria-labelledby="hiw-docs-title">
      <div className="container">
        <SectionHeading id="hiw-docs-title" eyebrow="Documents" title="Collected once. Shared securely." mark={["once"]} lede="The same bank statement should never be uploaded to three lenders. We hold one set and share it only with the partner you approve." />
        <div className="hiw-docs__wrap">
          <div className="hiw-docs__tabs" role="tablist" aria-label="Document categories">
            {documentGroups.map((g) => {
              const Icon = ICONS[g.icon] || FileText;
              return (
                <button key={g.key} type="button" role="tab" aria-selected={active === g.key} className={`hiw-docs__tab ${active === g.key ? "is-active" : ""}`} onClick={() => setActive(g.key)}>
                  <Icon aria-hidden="true" size={18} />
                  <span>{g.title}</span>
                  {g.required ? <em className="hiw-docs__req">Core</em> : null}
                </button>
              );
            })}
          </div>
          <Reveal key={group.key} variant="up" className="hiw-docs__panel">
            <p className="hiw-docs__panel-title">{group.title}</p>
            <ul>
              {group.items.map((item) => (
                <li key={item.name}>
                  <Check aria-hidden="true" size={18} />
                  <span>
                    <strong>{item.name}</strong>
                    {item.note}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
