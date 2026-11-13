"use client";
/**
 * TeamDetail — one application: header, stage timeline, status control, editable
 * notes and the customer-facing summary link.
 */
import { useMemo, useState } from "react";
import { ArrowLeft, Phone, Mail, MessageSquarePlus, ExternalLink, MapPin, User } from "lucide-react";
import { statusStages, statusIndex, APPLICATION_STATUSES } from "@/lib/data/statuses";
import { formatINR, formatDateTime, timeAgo, titleCase, formatMobile } from "@/lib/format";
import "./TeamDetail.css";

const NEXT_ACTIONS = ["review", "matched", "lender", "approved", "disbursed", "onhold", "rejected"];

export default function TeamDetail({ app, onBack, onStatus, onNote }) {
  const [note, setNote] = useState("");
  const idx = statusIndex(app.stage);
  const st = APPLICATION_STATUSES[app.status] || APPLICATION_STATUSES.received;
  const closed = ["disbursed", "rejected"].includes(app.status);

  const options = useMemo(() => NEXT_ACTIONS.map((k) => APPLICATION_STATUSES[k]), []);

  const commit = (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    onNote(note.trim());
    setNote("");
  };

  return (
    <div className="td">
      <button type="button" className="td__back" onClick={onBack}><ArrowLeft aria-hidden="true" size={17} /> All applications</button>

      <header className="td__head">
        <div className="td__head-main">
          <div className="td__id">
            <span className="td__ref">{app.reference}</span>
            <span className={`td__pill td__pill--${st.tone}`}>{st.label}</span>
            {app.local ? <span className="td__pill td__pill--new">from this device</span> : null}
          </div>
          <h2 className="td__name">{app.name}</h2>
          <p className="td__sub">{titleCase(app.service)} · {formatINR(app.amount)} {app.city ? `· ${app.city}${app.pin ? ` ${app.pin}` : ""}` : ""}</p>
        </div>
        <div className="td__amount-box">
          <span>Requested</span>
          <strong>{formatINR(app.amount)}</strong>
          <span className="td__amount-meta">Updated {timeAgo(app.updated)}</span>
        </div>
      </header>

      <div className="td__grid">
        <section className="td__card" aria-labelledby="td-timeline">
          <h3 id="td-timeline" className="td__card-title">Stage timeline</h3>
          <ol className={`td__timeline ${closed ? "is-closed" : ""}`}>
            {statusStages.map((s, i) => {
              const state = i < idx ? "done" : i === idx ? "current" : "todo";
              return (
                <li key={s.key} className={`td__step td__step--${state}`}>
                  <span className="td__dot" aria-hidden="true">{i < idx ? "✓" : i + 1}</span>
                  <div>
                    <p className="td__step-label">{s.label}{state === "current" ? <span className="td__now">now</span> : null}</p>
                    <p className="td__step-blurb">{s.blurb}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          {APP_STATUSES_NOTE(app)}
        </section>

        <section className="td__card" aria-labelledby="td-contact">
          <h3 id="td-contact" className="td__card-title">Contact &amp; owner</h3>
          <dl className="td__dl">
            <div><dt><Phone aria-hidden="true" size={14} /> Mobile</dt><dd><a href={`tel:+91${app.mobile}`}>{formatMobile(app.mobile) || "—"}</a></dd></div>
            <div><dt><Mail aria-hidden="true" size={14} /> Email</dt><dd>{app.email ? <a href={`mailto:${app.email}`}>{app.email}</a> : "—"}</dd></div>
            <div><dt><User aria-hidden="true" size={14} /> Owner</dt><dd>{app.owner}</dd></div>
            <div><dt><MapPin aria-hidden="true" size={14} /> Location</dt><dd>{app.city || "—"}{app.pin ? ` ${app.pin}` : ""}</dd></div>
            <div><dt>Created</dt><dd>{formatDateTime(app.created)}</dd></div>
            <div><dt>Source</dt><dd>{app.source || "site"}</dd></div>
          </dl>
          <div className="td__status-set">
            <p className="td__mini-label">Move to status</p>
            <div className="td__status-grid">
              {NEXT_ACTIONS.map((k) => (
                <button key={k} type="button" className={`td__status-btn ${app.status === k ? "is-active" : ""}`} onClick={() => onStatus(k)}>
                  {APPLICATION_STATUSES[k].label}
                </button>
              ))}
            </div>
          </div>
          <a className="td__public" href={`/track-application?ref=${app.reference}`} target="_blank" rel="noopener noreferrer">
            <ExternalLink aria-hidden="true" size={15} /> View customer tracking
          </a>
        </section>

        <section className="td__card td__card--wide" aria-labelledby="td-notes">
          <h3 id="td-notes" className="td__card-title">Notes <span className="td__count">{app.notes?.length || 0}</span></h3>
          <ul className="td__notes">
            {(app.notes || []).map((n) => (
              <li key={`${n.at}-${n.text.slice(0, 12)}`}>
                <p className="td__note-text">{n.text}</p>
                <p className="td__note-meta">{n.by} · {formatDateTime(n.at)}</p>
              </li>
            ))}
            {!app.notes?.length ? <li className="td__note-empty">No notes yet on this file.</li> : null}
          </ul>
          <form className="td__note-form" onSubmit={commit}>
            <label htmlFor="td-note" className="td__mini-label">Add a note</label>
            <textarea id="td-note" value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="What happened on this call?" />
            <button type="submit" className="td__note-btn" disabled={!note.trim()}>
              <MessageSquarePlus aria-hidden="true" size={16} /> Save note
            </button>
          </form>
        </section>
      </div>
      <p className="td__fine">Edits are stored in this browser only ({options.length} statuses available).</p>
    </div>
  );
}

/* Inline helper so the component file stays self-contained. */
function APP_STATUSES_NOTE(app) {
  if (app.status === "rejected") return <p className="td__flag td__flag--danger">File was not approved. Note the reason before it is archived.</p>;
  if (app.status === "onhold") return <p className="td__flag td__flag--amber">On hold — waiting on the customer or a lender query.</p>;
  if (app.status === "disbursed") return <p className="td__flag td__flag--success">Disbursed. Mark the file for a 90-day post-disbursal check.</p>;
  return null;
}
