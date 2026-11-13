"use client";
/**
 * Accordion — grid-template-rows 0fr→1fr animation, one-or-many open panels.
 * Each item: { q, a } for FAQs, or { title, body } for generic panels.
 */
import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import "./Accordion.css";

export default function Accordion({ items, allowMultiple = false, defaultOpen = null, variant = "light" }) {
  const [open, setOpen] = useState(defaultOpen === null ? [] : [defaultOpen]);
  const baseId = useId();

  const toggle = (index) => {
    setOpen((prev) => {
      if (prev.includes(index)) return prev.filter((i) => i !== index);
      return allowMultiple ? [...prev, index] : [index];
    });
  };

  return (
    <div className={`accordion accordion--${variant}`}>
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        const q = item.q || item.title;
        const a = item.a || item.body;
        return (
          <div className={`accordion__item ${isOpen ? "is-open" : ""}`} key={`${baseId}-${index}`}>
            <h3 className="accordion__heading">
              <button
                type="button"
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={`${baseId}-panel-${index}`}
                id={`${baseId}-btn-${index}`}
                onClick={() => toggle(index)}
              >
                <span>{q}</span>
                <ChevronDown aria-hidden="true" size={20} className="accordion__chevron" />
              </button>
            </h3>
            <div
              className="accordion__panel"
              id={`${baseId}-panel-${index}`}
              role="region"
              aria-labelledby={`${baseId}-btn-${index}`}
              hidden={!isOpen}
            >
              <div className="accordion__inner">
                <p>{a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
