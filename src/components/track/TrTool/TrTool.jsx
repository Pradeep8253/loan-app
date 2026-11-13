"use client";
/**
 * TrTool — reference lookup with a simulated 720ms fetch, skeleton state, a stage
 * timeline, and design for the not-found and empty cases.
 */
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Loader2, AlertCircle, CheckCircle2, Circle } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import FormField from "@/components/ui/FormField/FormField";
import Button from "@/components/ui/Button/Button";
import { SkeletonBlock } from "@/components/ui/Skeleton/Skeleton";
import { statusStages, statusIndex } from "@/lib/data/statuses";
import { sampleApplications } from "@/lib/data/sampleApplications";
import { getService } from "@/lib/data/services";
import { safeGet, safeSet, STORAGE_KEYS } from "@/lib/storage";
import { formatDate, formatDateTime, formatINR } from "@/lib/format";
import { normaliseReference, isReference } from "@/lib/reference";
import { useEnquiry } from "@/context/EnquiryContext";
import "./TrTool.css";

export default function TrTool() {
  const params = useSearchParams();
  const initial = params.get("ref") || "";
  const [ref, setRef] = useState(initial);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { openEnquiry } = useEnquiry();

  const lookup = (value) => {
    const cleaned = normaliseReference(value);
    if (!cleaned) {
      setError("Enter your reference number.");
      return;
    }
    if (!isReference(cleaned)) {
      setError("References look like MVX-4821-RA. Check the message you received.");
      return;
    }
    setError("");
    setNotFound(false);
    setLoading(true);
    setResult(null);
    // Simulate an API round-trip; also checks locally stored leads from this browser.
    window.setTimeout(() => {
      const seeded = sampleApplications.find((a) => a.reference === cleaned);
      const local = (safeGet(STORAGE_KEYS.leads, []) || []).find((l) => l.reference === cleaned);
      const found = seeded || (local ? {
        reference: local.reference,
        name: local.from_name,
        mobile: local.mobile,
        service: local.service,
        amount: Number(local.loan_amount) || 0,
        city: local.city_pin || "",
        status: "received",
        stage: "received",
        created: local.submitted_at,
        updated: local.submitted_at,
        owner: "Assignment pending",
        notes: [{ at: local.submitted_at, by: "System", text: "Enquiry captured from the website." }],
      } : null);
      setLoading(false);
      if (found) {
        setResult(found);
        safeSet("mirvex_last_lookup", cleaned, "session");
      } else {
        setNotFound(true);
      }
    }, 720);
  };

  useEffect(() => {
    if (initial) lookup(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const service = result ? getService(result.service) : null;
  const stageIdx = result ? statusIndex(result.stage) : 0;

  return (
    <section className="tr-tool section section--sky" aria-labelledby="tr-tool-title">
      <div className="container">
        <h2 className="sr-only" id="tr-tool-title">Track your application</h2>
        <div className="tr-tool__search">
          <FormField
            id="tr-ref"
            label="Application reference"
            value={ref}
            onChange={(e) => setRef(e.target.value.toUpperCase())}
            error={error}
            placeholder="MVX-0000-AA"
            autoComplete="off"
            enterKeyHint="search"
            helper="Printed in your WhatsApp confirmation"
            required
          />
          <Button size="lg" onClick={() => lookup(ref)} loading={loading} icon={<Search aria-hidden="true" size={18} />} rightIcon={false}>
            {loading ? "Checking…" : "Track my application"}
          </Button>
        </div>

        <div className="tr-tool__samples">
          <span>Try a demo reference:</span>
          {["MVX-4821-RA", "MVX-3177-KS", "MVX-9045-FK"].map((r) => (
            <button key={r} type="button" onClick={() => { setRef(r); lookup(r); }}>{r}</button>
          ))}
        </div>

        {loading ? (
          <div className="tr-tool__loading" role="status" aria-live="polite">
            <span className="sr-only">Fetching application status</span>
            <div className="tr-tool__loading-head"><Loader2 className="spin" aria-hidden="true" size={20} /> Contacting the status service…</div>
            <SkeletonBlock h={28} w="50%" />
            <SkeletonBlock h={16} w="80%" />
            <SkeletonBlock h={72} w="100%" r={16} />
            <SkeletonBlock h={72} w="100%" r={16} />
          </div>
        ) : null}

        {notFound ? (
          <div className="tr-tool__empty">
            <span className="tr-tool__empty-icon" aria-hidden="true"><AlertCircle size={26} /></span>
            <div>
              <h3 className="tr-tool__empty-title">We cannot find that reference.</h3>
              <p className="tr-tool__empty-body">Check the format — four digits and two letters after the MVX prefix. If it still fails, the enquiry may not have reached us; contact the desk and we will search by mobile number.</p>
            </div>
            <Button href="/contact" variant="dark" size="md">Contact the desk</Button>
          </div>
        ) : null}

        {result ? (
          <div className="tr-tool__result">
            <div className="tr-tool__head-card">
              <div>
                <p className="tr-tool__ref">{result.reference}</p>
                <h3 className="tr-tool__name">{result.name} · {service ? service.short : result.service}</h3>
                <p className="tr-tool__meta">
                  {result.amount ? `${formatINR(result.amount)} requested · ` : ""}
                  Applied {formatDate(result.created)} · Owner {result.owner}
                </p>
              </div>
              <span className={`tr-tool__status tr-tool__status--${result.status}`}>
                {result.status === "approved" ? "Approved" : result.status === "lender" ? "With lender" : result.status === "review" ? "In review" : result.status === "received" ? "Received" : result.status === "onhold" ? "On hold" : result.status === "disbursed" ? "Disbursed" : result.status === "matched" ? "Matched" : "Not approved"}
              </span>
            </div>

            <ol className="tr-tool__stages">
              {statusStages.map((s, i) => {
                const state = i < stageIdx ? "done" : i === stageIdx ? "current" : "todo";
                return (
                  <li key={s.key} className={`tr-tool__stage tr-tool__stage--${state}`}>
                    <span className="tr-tool__stage-icon" aria-hidden="true">
                      {state === "done" ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                    </span>
                    <div>
                      <p className="tr-tool__stage-label">{s.label}</p>
                      <p className="tr-tool__stage-blurb">{s.blurb}</p>
                    </div>
                    {state === "current" ? <span className="tr-tool__stage-now">Now</span> : null}
                  </li>
                );
              })}
            </ol>

            {result.notes && result.notes.length ? (
              <div className="tr-tool__notes">
                <p className="tr-tool__notes-title">Latest updates</p>
                <ul>
                  {result.notes.map((n) => (
                    <li key={n.at}>
                      <span className="tr-tool__note-time">{formatDateTime(n.at)}</span>
                      <span className="tr-tool__note-text">{n.text} <em>— {n.by}</em></span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="tr-tool__actions">
              <Button variant="whatsapp" size="md" icon={<WhatsAppIcon size={18} />} rightIcon={false} onClick={() => openEnquiry({ service: result.service, source: "track.ask", message: `Question about ${result.reference}`, whatsappTemplate: "track", reference: result.reference })}>
                Ask about this file
              </Button>
              <Button variant="outline" size="md" href="/how-it-works" rightIcon>What each stage means</Button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
