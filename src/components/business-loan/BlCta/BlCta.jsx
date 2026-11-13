"use client";
/**
 * BlCta — final business CTA with a two-step "amount + requirement" micro-form that
 * writes straight into a lead. No modal — the page closes with an inline form.
 */
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import Chip from "@/components/ui/Chip/Chip";
import FormField from "@/components/ui/FormField/FormField";
import Button from "@/components/ui/Button/Button";
import Reveal from "@/components/ui/Reveal/Reveal";
import { formatINR } from "@/lib/format";
import { validateMobile, validateName } from "@/lib/validators";
import { submitLead } from "@/lib/leadService";
import { useShell } from "@/context/ShellContext";
import "./BlCta.css";

const AMOUNTS = [500000, 1000000, 2500000, 5000000];

export default function BlCta() {
  const [amount, setAmount] = useState(1000000);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const { toast } = useShell();

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    const n = validateName(name);
    if (n) next.name = n;
    const m = validateMobile(mobile);
    if (m) next.mobile = m;
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    const res = await submitLead(
      {
        from_name: name,
        mobile,
        service: "business-loan",
        loan_amount: amount,
        source: "bl.final",
        summary: `Business loan enquiry for ${formatINR(amount)}`,
        whatsappTemplate: "callback",
      },
      { redirect: true, spamKey: "mirvex_bl_final", onStatus: () => {} }
    );
    setBusy(false);
    if (res.ok) toast(`Reference ${res.reference} — sent to the business desk.`, "success");
  };

  return (
    <section className="bl-cta" aria-labelledby="bl-cta-title">
      <div className="container bl-cta__inner">
        <Reveal variant="left" className="bl-cta__copy">
          <p className="eyebrow eyebrow--amber">Business desk</p>
          <h2 id="bl-cta-title" className="bl-cta__title">A number, a sector, a callback.</h2>
          <p className="bl-cta__body">Retail, services, manufacturing or trading — the specialist who calls you covers your sector and knows which partners are actively lending to it.</p>
          <ul className="bl-cta__meta">
            <li><ArrowRight aria-hidden="true" size={16} /> No collateral required for eligible profiles</li>
            <li><ArrowRight aria-hidden="true" size={16} /> GST and banking-based assessment</li>
            <li><ArrowRight aria-hidden="true" size={16} /> Terms in writing before you commit</li>
          </ul>
        </Reveal>
        <Reveal variant="right" delay={80} className="bl-cta__form-card">
          <form onSubmit={onSubmit} className="bl-cta__form" noValidate>
            <p className="bl-cta__form-label">I need</p>
            <div className="bl-cta__chips">
              {AMOUNTS.map((a) => (
                <Chip key={a} label={formatINR(a)} active={amount === a} onClick={() => setAmount(a)} size="sm" />
              ))}
            </div>
            <FormField id="bl-name" label="Your name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} autoComplete="name" required placeholder="Full name" />
            <FormField id="bl-mobile" label="Mobile" type="tel" inputMode="numeric" prefix="+91" maxLength={10} value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))} error={errors.mobile} autoComplete="tel-national" required placeholder="98765 43210" />
            <Button type="submit" variant="primary" size="lg" block loading={busy} icon={<WhatsAppIcon size={20} />} rightIcon={false}>
              {busy ? "Sending…" : `Enquire about ${formatINR(amount)}`}
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
