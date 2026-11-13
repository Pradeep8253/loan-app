"use client";
/**
 * LeBody — the two documents with a sticky table of contents on desktop and
 * collapsible section index on mobile.
 */
import { useEffect, useState } from "react";
import "./LeBody.css";

export default function LeBody({ sections }) {
  const [active, setActive] = useState(sections[0]?.key);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.key)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); }),
      { rootMargin: "-20% 0px -70% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const current = sections.find((s) => s.key === active) || sections[0];

  return (
    <section className="le-body section section--white">
      <div className="container le-body__grid">
        <aside className="le-body__toc" aria-label="Document index">
          <p className="le-body__toc-title">On this page</p>
          {sections.map((s) => (
            <div key={s.key} className="le-body__toc-group">
              <a href={`#${s.key}`} className={`le-body__toc-doc ${s.key === active ? "is-active" : ""}`}>{s.title}</a>
              {s.key === current?.key ? (
                <ul>
                  {s.sections.map((sec, i) => (
                    <li key={sec.h}><a href={`#${s.key}-${i}`}>{sec.h}</a></li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </aside>
        <div className="le-body__docs">
          {sections.map((s) => (
            <article key={s.key} id={s.key} className="le-body__doc">
              <header className="le-body__doc-head">
                <h2>{s.title}</h2>
                <p>Last updated {s.updated}</p>
              </header>
              <p className="le-body__intro">{s.intro}</p>
              {s.sections.map((sec, i) => (
                <div key={sec.h} id={`${s.key}-${i}`} className="le-body__block">
                  <h3>{sec.h}</h3>
                  <p>{sec.p}</p>
                </div>
              ))}
              {s.outro ? <p className="le-body__outro">{s.outro}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
