"use client";
/**
 * DsClear — a "start clean" utility that wipes every local record this demo wrote,
 * plus a short note on what a production build would add.
 */
import { useState } from "react";
import { Trash2, CheckCircle2, Database, ServerCog, ShieldCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal/Reveal";
import Button from "@/components/ui/Button/Button";
import { useShell } from "@/context/ShellContext";
import { haptic } from "@/lib/haptics";
import "./DsClear.css";

const NEXT = [
  { icon: Database, title: "A real data store", body: "Server-side lead records with encryption at rest, retention rules and audit logs." },
  { icon: ServerCog, title: "Lender integrations", body: "Partner APIs for eligibility, offer generation and application status — replacing the seeded data." },
  { icon: ShieldCheck, title: "Consent and compliance", body: "Versioned consent capture, a DPDP-aligned rights workflow and a mounted grievance ticketing system." },
];

export default function DsClear() {
  const [wiped, setWiped] = useState(false);
  const { toast } = useShell();

  const wipe = () => {
    try {
      Object.keys(window.localStorage).filter((k) => k.startsWith("mirvex")).forEach((k) => window.localStorage.removeItem(k));
      Object.keys(window.sessionStorage).filter((k) => k.startsWith("mirvex")).forEach((k) => window.sessionStorage.removeItem(k));
      setWiped(true);
      haptic(14);
      toast("Local demo data cleared. Refresh to see the seeded state.", "success");
      window.setTimeout(() => setWiped(false), 3000);
    } catch {
      toast("Could not clear storage in this browser.", "error");
    }
  };

  return (
    <section className="ds-c section section--white" aria-labelledby="ds-c-title">
      <div className="container ds-c__grid">
        <div>
          <Reveal variant="up" className="ds-c__head">
            <h2 id="ds-c-title" className="ds-c__title">Start from zero.</h2>
            <p className="ds-c__body">This demo writes leads, drafts and dashboard edits to your browser. One button removes all of it — nothing leaves your device to begin with.</p>
          </Reveal>
          <Reveal variant="up" delay={80} className="ds-c__actions">
            <Button variant="dark" size="lg" onClick={wipe} icon={wiped ? <CheckCircle2 aria-hidden="true" size={18} /> : <Trash2 aria-hidden="true" size={18} />} rightIcon={false}>
              {wiped ? "Cleared" : "Clear local demo data"}
            </Button>
            <p className="ds-c__fine">Removes keys beginning with <code>mirvex</code> from localStorage and sessionStorage.</p>
          </Reveal>
        </div>
        <div className="ds-c__next">
          <p className="ds-c__next-label">If this went to production</p>
          {NEXT.map((n, i) => (
            <Reveal key={n.title} variant="right" delay={i * 60} className="ds-c__next-row">
              <span className="ds-c__next-icon" aria-hidden="true"><n.icon size={18} /></span>
              <div>
                <h3>{n.title}</h3>
                <p>{n.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
