"use client";
/**
 * TeamPipeline — filterable application list: status chips, sortable amount, and a
 * card layout on mobile that becomes a compact table on desktop.
 */
import { useMemo, useState } from "react";
import { ChevronRight, Inbox } from "lucide-react";
import { APPLICATION_STATUSES } from "@/lib/data/statuses";
import { formatINR, timeAgo, titleCase } from "@/lib/format";
import "./TeamPipeline.css";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "open", label: "Open" },
  { key: "approved", label: "Approved" },
  { key: "action", label: "On hold / rejected" },
];

export default function TeamPipeline({ apps, query, onPick }) {
  const [filter, setFilter] = useState("all");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = apps;
    if (filter === "open") list = list.filter((a) => !["disbursed", "rejected"].includes(a.status));
    if (filter === "approved") list = list.filter((a) => ["approved", "disbursed"].includes(a.status));
    if (filter === "action") list = list.filter((a) => ["onhold", "rejected"].includes(a.status));
    if (q) list = list.filter((a) => [a.name, a.reference, a.city, a.owner].join(" ").toLowerCase().includes(q));
    return [...list].sort((a, b) => new Date(b.updated) - new Date(a.updated));
  }, [apps, filter, query]);

  return (
    <div className="tp">
      <div className="tp__filters" role="group" aria-label="Filter applications">
        {FILTERS.map((f) => {
          const count = f.key === "all" ? apps.length : f.key === "open" ? apps.filter((a) => !["disbursed", "rejected"].includes(a.status)).length : f.key === "approved" ? apps.filter((a) => ["approved", "disbursed"].includes(a.status)).length : apps.filter((a) => ["onhold", "rejected"].includes(a.status)).length;
          return (
            <button key={f.key} type="button" className={`tp__filter ${filter === f.key ? "is-active" : ""}`} aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
              {f.label}<span>{count}</span>
            </button>
          );
        })}
      </div>

      {rows.length === 0 ? (
        <div className="tp__empty">
          <Inbox aria-hidden="true" size={28} />
          <p>No applications match this filter.</p>
        </div>
      ) : (
        <ul className="tp__list">
          {rows.map((a) => {
            const st = APPLICATION_STATUSES[a.status] || APPLICATION_STATUSES.received;
            return (
              <li key={a.reference}>
                <button type="button" className="tp__row" onClick={() => onPick(a.reference)}>
                  <span className="tp__main">
                    <span className="tp__name">{a.name}{a.local ? <em className="tp__local">new</em> : null}</span>
                    <span className="tp__ref">{a.reference} · {titleCase(a.service)} · {a.city || "—"}</span>
                  </span>
                  <span className="tp__amount">{formatINR(a.amount)}</span>
                  <span className={`tp__status tp__status--${st.tone}`}>{st.label}</span>
                  <span className="tp__updated">{timeAgo(a.updated)}</span>
                  <span className="tp__owner">{a.owner}</span>
                  <ChevronRight aria-hidden="true" size={18} className="tp__chev" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
