"use client";
/**
 * GrForm — complaint form with reference number field, category select and a
 * side panel listing the statutory officer details.
 */
import { useRef, useState } from "react";
import { AlertTriangle, ClipboardCheck, ShieldAlert } from "lucide-react";
import FormField, { TextArea } from "@/components/ui/FormField/FormField";
import Select from "@/components/ui/Select/Select";
import Consent from "@/components/ui/Consent/Consent";
import Button from "@/components/ui/Button/Button";
import { validateName, validateMobile, validateEmail } from "@/lib/validators";
import { normaliseReference } from "@/lib/reference";
import { submitLead } from "@/lib/leadService";
import { siteConfig } from "@/lib/siteConfig";
import { haptic } from "@/lib/haptics";
import "./GrForm.css";

const CATEGORIES = [
  { value: "delay", label: "Delay in response" },
  { value: "documents", label: "Document handling" },
  { value: "charges", label: "Fees or charges dispute" },
  { value: "miscommunication", label: "Miscommunication with lender" },
  { value: "privacy", label: "Data or privacy concern" },
  { value: "other", label: "Something else" },
];

export default function GrForm() {
  const [v, setV] = useState({ from_name: "", mobile: "", email: "", reference: "", category: "delay", message: "", consent: false, honeypot: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);
  const ref = useRef(null);
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e?.target ? e.target.value : e }));

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    const n = validateName(v.from_name); if (n) next.from_name = n;
    const m = validateMobile(v.mobile); if (m) next.mobile = m;
    const em = validateEmail(v.email, false); if (em) next.email = em;
    if (!v.message.trim()) next.message = "Please describe what happened.";
    if (!v.consent) next.consent = "Please accept the consent note.";
    setErrors(next);
    if (Object.keys(next).length) {
      ref.current?.querySelector(`#gr-${Object.keys(next)[0]}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      haptic(18);
      return;
    }
    setBusy(true);
    const res = await submitLead(
      { ...v, reference: v.reference ? normaliseReference(v.reference) : "", source: "grievance.form", summary: `Grievance · ${v.category} · ${v.message.slice(0, 160)}` },
      { redirect: true, spamKey: "mirvex_grievance" }
    );
    setBusy(false);
    if (res.ok) setDone(res);
    else setErrors(res.errors || {});
  };

  return (
    <section className="gr-form section section--sky" aria-labelledby="gr-form-title">
      <div className="container gr-form__grid">
        <div className="gr-form__side">
          <p className="eyebrow">Officer details</p>
          <h2 id="gr-form-title" className="gr-form__side-title">Grievance officer</h2>
          <dl className="gr-form__dl">
            <div><dt>Name</dt><dd>Ms. R. Kapoor</dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${siteConfig.contact.grievanceEmail}`}>{siteConfig.contact.grievanceEmail}</a></dd></div>
            <div><dt>Phone</dt><dd><a href={`tel:${siteConfig.contact.phoneHref}`}>{siteConfig.contact.phoneDisplay}</a></dd></div>
            <div><dt>Hours</dt><dd>{siteConfig.contact.hours}</dd></div>
            <div><dt>Post</dt><dd>{siteConfig.contact.address.line1}, {siteConfig.contact.address.line2}</dd></div>
          </dl>
          <p className="gr-form__side-note"><ShieldAlert aria-hidden="true" size={16} /> We never ask for OTPs, card numbers or net-banking passwords to resolve a complaint. Anyone who does is not from us.</p>
        </div>
        <div className="gr-form__panel">
          {done ? (
            <div className="gr-form__done">
              <ClipboardCheck aria-hidden="true" size={34} />
              <h3>Complaint logged</h3>
              <p>Ticket <strong>{done.reference}</strong>. Acknowledgement within one working day to the number you gave.</p>
              <p className="gr-form__done-note">WhatsApp should have opened with the complaint summary — send it to keep a written thread.</p>
            </div>
          ) : (
            <form onSubmit={submit} ref={ref} noValidate className="gr-form__form">
              <p className="gr-form__hint"><AlertTriangle aria-hidden="true" size={16} /> Fields marked with an asterisk are required.</p>
              <div className="gr-form__row">
                <FormField id="gr-from_name" label="Your name" value={v.from_name} onChange={set("from_name")} error={errors.from_name} autoComplete="name" required />
                <FormField id="gr-mobile" label="Mobile" type="tel" inputMode="numeric" prefix="+91" maxLength={10} value={v.mobile} onChange={(e) => setV((s) => ({ ...s, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))} error={errors.mobile} autoComplete="tel-national" required />
              </div>
              <div className="gr-form__row">
                <FormField id="gr-email" label="Email" type="email" value={v.email} onChange={set("email")} error={errors.email} autoComplete="email" helper="Optional." />
                <FormField id="gr-reference" label="Application reference" value={v.reference} onChange={set("reference")} placeholder="MVX-4821-RA" helper="If your complaint is about an application." />
              </div>
              <Select id="gr-category" label="Category" value={v.category} onChange={set("category")} options={CATEGORIES} required />
              <TextArea id="gr-message" label="What happened" value={v.message} onChange={set("message")} error={errors.message} required rows={5} placeholder="Dates, names and what you expected to happen." />
              <div className="gr-form__hp" aria-hidden="true"><input tabIndex={-1} aria-label="Company" value={v.honeypot} onChange={(e) => setV((s) => ({ ...s, honeypot: e.target.value }))} /></div>
              <Consent id="gr-consent" checked={v.consent} onChange={(c) => setV((s) => ({ ...s, consent: c }))} error={errors.consent} />
              <Button type="submit" variant="dark" size="lg" block loading={busy}>{busy ? "Logging…" : "Log the complaint"}</Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
