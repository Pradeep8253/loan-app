"use client";
/**
 * TeamOverview — KPI tiles, a stage funnel bar and the "needs attention" queue.
 */
import { useMemo } from "react";
import { AlertTriangle, ArrowRight, Banknote, Clock4, CheckCheck } from "lucide-react";
import { statusStages } from "@/lib/data/statuses";
import { formatINR, compactINR, timeAgo } from "@/lib/format";
import "./TeamOverview.css";

const DAY = 86400000;

export default function TeamOverview({ apps, onPick }) {
  const stats = useMemo(() => {
    const total = apps.length;
    const open = apps.filter((a) => !["disbursed", "rejected"].includes(a.status)).length;
    const approved = apps.filter((a) => ["approved", "disbursed"].includes(a.status)).length;
    const value = apps.reduce((s, a) => s + (a.amount || 0), 0);
    const stale = apps.filter((a) => Date.now() - new Date(a.updated).getTime() > 2 * DAY && !["disbursed", "rejected"].includes(a.status));
    return { total, open, approved, value, stale };
  }, [apps]);

  const funnel = useMemo(
    () =>
      statusStages.map((s) => ({
        ...s,
        count: apps.filter((a) => a.stage === s.key).length,
      })),
    [apps]
  );
  const maxCount = Math.max(1, ...funnel.map((f) => f.count));

  return (
    <div className="to">
      <div className="to__kpis">
        <div className="to__kpi to__kpi--dark">
          <span className="to__kpi-icon" aria-hidden="true"><Banknote size={18} /></span>
          <span className="to__kpi-label">Pipeline value</span>
          <strong className="to__kpi-value">{compactINR(stats.value)}</strong>
          <span className="to__kpi-sub">{stats.total} applications</span>
        </div>
        <div className="to__kpi">
          <span className="to__kpi-label">Open files</span>
          <strong className="to__kpi-value">{stats.open}</strong>
          <span className="to__kpi-sub">Not yet decided</span>
        </div>
        <div className="to__kpi">
          <span className="to__kpi-label">Approved</span>
          <strong className="to__kpi-value">{stats.approved}</strong>
          <span className="to__kpi-sub">{stats.total ? Math.round((stats.approved / stats.total) * 100) : 0}% of book</span>
        </div>
        <div className="to__kpi to__kpi--warn">
          <span className="to__kpi-icon" aria-hidden="true"><Clock4 size={18} /></span>
          <span className="to__kpi-label">Stale &gt; 48 h</span>
          <strong className="to__kpi-value">{stats.stale.length}</strong>
          <span className="to__kpi-sub">Needs a nudge</span>
        </div>
      </div>

      <div className="to__funnel">
        <h2 className="to__h">Stage spread</h2>
        <ul className="to__bars">
          {funnel.map((f) => (
            <li key={f.key} className="to__bar-row">
              <span className="to__bar-label">{f.label}</span>
              <span className="to__bar-track">
                <span className="to__bar-fill" data-zero={f.count === 0 ? "true" : "false"} style={{ "--pct": `${(f.count / maxCount) * 100}%` }} />
              </span>
              <span className="to__bar-num">{f.count}</span>
            </li>
          ))}
        </ul>
      </div>

      {stats.stale.length ? (
        <div className="to__attn">
          <h2 className="to__h"><AlertTriangle aria-hidden="true" size={16} /> Needs attention</h2>
          <ul>
            {stats.stale.slice(0, 4).map((a) => (
              <li key={a.reference}>
                <button type="button" onClick={() => onPick(a.reference)}>
                  <span className="to__attn-name">{a.name}</span>
                  <span className="to__attn-meta">{a.reference} · {formatINR(a.amount)} · updated {timeAgo(a.updated)}</span>
                  <ArrowRight aria-hidden="true" size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="to__attn to__attn--clear">
          <h2 className="to__h"><CheckCheck aria-hidden="true" size={16} /> Nothing stale</h2>
          <p>Every open file has been touched in the last 48 hours.</p>
        </div>
      )}
    </div>
  );
}
