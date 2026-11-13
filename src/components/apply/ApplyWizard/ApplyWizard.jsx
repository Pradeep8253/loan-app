"use client";
/**
 * ApplyWizard — the five-step application: product → about you → requirement →
 * documents checklist → review. Saves a draft to localStorage, validates per step,
 * scrolls the first invalid field into view, and finishes through submitLead().
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, Save, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import Stepper from "@/components/ui/Stepper/Stepper";
import FormField from "@/components/ui/FormField/FormField";
import Select from "@/components/ui/Select/Select";
import Consent from "@/components/ui/Consent/Consent";
import Button from "@/components/ui/Button/Button";
import Chip from "@/components/ui/Chip/Chip";
import { services, getService } from "@/lib/data/services";
import { validateName, validateMobile, validateEmail, validateCityPIN } from "@/lib/validators";
import { formatINR, parseAmount } from "@/lib/format";
import { safeGet, safeSet, safeRemove, STORAGE_KEYS } from "@/lib/storage";
import { submitLead } from "@/lib/leadService";
import { haptic } from "@/lib/haptics";
import { trackEvent } from "@/lib/analytics";
import "./ApplyWizard.css";

const STEPS = ["Product", "About you", "Requirement", "Documents", "Review"];
const AMOUNTS = {
  "personal-loan": [100000, 300000, 500000, 1000000],
  overdraft: [100000, 300000, 500000, 1000000],
  "home-loan": [2500000, 4000000, 6000000, 10000000],
  "business-loan": [500000, 1000000, 2500000, 5000000],
  "loan-balance-transfer": [100000, 300000, 500000, 1000000],
};
const BLANK = {
  service: "personal-loan",
  from_name: "",
  mobile: "",
  email: "",
  city_pin: "",
  loan_amount: "",
  purpose: "",
  message: "",
  docs: [],
  consent: false,
  honeypot: "",
};

export default function ApplyWizard({ initialService }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(BLANK);
  const [errors, setErrors] = useState({});
  const [hydrated, setHydrated] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);
  const topRef = useRef(null);
  const service = getService(values.service);

  useEffect(() => {
    const draft = safeGet(STORAGE_KEYS.applyDraft, null);
    const incoming = initialService || draft?.service;
    setValues({ ...BLANK, ...(draft || {}), ...(initialService ? { service: initialService } : {}), consent: false });
    if (incoming) setValues((v) => ({ ...v, service: incoming }));
    setHydrated(true);
  }, [initialService]);

  useEffect(() => {
    if (hydrated) safeSet(STORAGE_KEYS.applyDraft, { ...values, consent: false, honeypot: "" });
  }, [values, hydrated]);

  const set = (key) => (e) => {
    const raw = e?.target ? e.target.value : e;
    if (key === "loan_amount") {
      const n = parseAmount(raw);
      setValues((v) => ({ ...v, loan_amount: n ? formatINR(n) : "" }));
      return;
    }
    setValues((v) => ({ ...v, [key]: raw }));
  };

  const validateStep = (index) => {
    const next = {};
    if (index === 1) {
      const n = validateName(values.from_name);
      if (n) next.from_name = n;
      const m = validateMobile(values.mobile);
      if (m) next.mobile = m;
      const em = validateEmail(values.email, false);
      if (em) next.email = em;
    }
    if (index === 2) {
      if (!parseAmount(values.loan_amount)) next.loan_amount = "Enter the amount you need.";
      const cp = validateCityPIN(values.city_pin);
      if (cp) next.city_pin = cp;
    }
    if (index === 4 && !values.consent) next.consent = "Please accept the consent note.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      const el = topRef.current?.querySelector(`#ap-${first}`) || topRef.current?.querySelector(`#ap-consent`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus?.({ preventScroll: true });
      haptic(18);
      return false;
    }
    return true;
  };

  const go = (dir) => {
    if (dir > 0 && !validateStep(step)) return;
    haptic(8);
    trackEvent("apply_step", { step: step + 1, dir });
    setStep(Math.max(0, Math.min(STEPS.length - 1, step + dir)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveDraft = () => {
    safeSet(STORAGE_KEYS.applyDraft, { ...values, consent: false });
    haptic(10);
    setErrors((e) => ({ ...e, __saved: "Draft saved on this device." }));
    window.setTimeout(() => setErrors((e) => ({ ...e, __saved: "" })), 2400);
  };

  const submit = async () => {
    if (!validateStep(4)) return;
    setBusy(true);
    const amount = parseAmount(values.loan_amount);
    const res = await submitLead(
      {
        ...values,
        __honeypot: values.honeypot,
        loan_amount: amount,
        loan_amount_human: formatINR(amount),
        source: "apply.wizard",
        summary: `Apply wizard · ${service?.name} · ${formatINR(amount)} · docs: ${values.docs.join(", ") || "none selected"}`,
        whatsappTemplate: "apply",
      },
      { redirect: true, spamKey: "mirvex_apply_wizard" }
    );
    setBusy(false);
    if (res.ok) {
      safeRemove(STORAGE_KEYS.applyDraft);
      setDone(res);
      haptic(20);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setErrors(res.errors || {});
    }
  };

  const progress = useMemo(() => Math.round(((step + 1) / STEPS.length) * 100), [step]);
  const errorCount = Object.keys(errors).filter((k) => !k.startsWith("__")).length;

  if (done) {
    return (
      <div className="apply__done">
        <span className="apply__done-icon" aria-hidden="true"><CheckCircle2 size={40} /></span>
        <h2 className="apply__done-title">Application received.</h2>
        <p className="apply__done-ref">{done.reference}</p>
        <p className="apply__done-body">
          Your advisor has the file{service ? ` for ${service.name.toLowerCase()}` : ""}. WhatsApp should have opened with the summary — send it even if it did not, so there is a written record.
        </p>
        <div className="apply__done-actions">
          <Button variant="whatsapp" size="lg" block href={done.whatsappUrl} external icon={<WhatsAppIcon size={20} />} rightIcon={false}>
            Open WhatsApp
          </Button>
          <Button variant="outline" size="lg" block onClick={() => router.push(`/track-application?ref=${done.reference}`)}>
            Track this application
          </Button>
        </div>
        <p className="apply__done-note">Keep the reference. It is your handle for every conversation from here.</p>
      </div>
    );
  }

  return (
    <div className="apply">
      <div className="apply__progress">
        <Stepper steps={STEPS} current={step} />
        <span className="apply__progress-pct" aria-hidden="true">{progress}%</span>
      </div>

      <div className="apply__panel" ref={topRef}>
        {step === 0 ? (
          <div className="apply__step">
            <h2 className="apply__step-title">What are you applying for?</h2>
            <p className="apply__step-sub">Pick a product. You can change it before submitting.</p>
            <div className="apply__products">
              {services.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  className={`apply__product ${values.service === s.key ? "is-active" : ""}`}
                  onClick={() => setValues((v) => ({ ...v, service: s.key, loan_amount: "" }))}
                  aria-pressed={values.service === s.key}
                >
                  <span className="apply__product-name">{s.name}</span>
                  <span className="apply__product-blurb">{s.blurb}</span>
                  {values.service === s.key ? <span className="apply__product-check" aria-hidden="true"><Check size={14} /></span> : null}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="apply__step">
            <h2 className="apply__step-title">About you</h2>
            <p className="apply__step-sub">We use this only to reach you about this application.</p>
            <FormField id="ap-from_name" label="Full name" value={values.from_name} onChange={set("from_name")} error={errors.from_name} autoComplete="name" enterKeyHint="next" required placeholder="e.g. Ananya Sharma" />
            <FormField id="ap-mobile" label="Mobile number" type="tel" inputMode="numeric" prefix="+91" maxLength={10} value={values.mobile} onChange={(e) => setValues((v) => ({ ...v, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))} error={errors.mobile} autoComplete="tel-national" enterKeyHint="next" required placeholder="98765 43210" />
            <FormField id="ap-email" label="Email" type="email" inputMode="email" value={values.email} onChange={set("email")} error={errors.email} autoComplete="email" enterKeyHint="next" placeholder="name@example.com" helper="Optional — used for the written shortlist." />
          </div>
        ) : null}

        {step === 2 ? (
          <div className="apply__step">
            <h2 className="apply__step-title">Your requirement</h2>
            <p className="apply__step-sub">Approximate figures are fine. The advisor refines them on the call.</p>
            <div className="apply__chips">
              {(AMOUNTS[values.service] || AMOUNTS["personal-loan"]).map((a) => (
                <Chip key={a} label={formatINR(a)} active={parseAmount(values.loan_amount) === a} onClick={() => setValues((v) => ({ ...v, loan_amount: formatINR(a) }))} />
              ))}
            </div>
            <FormField id="ap-loan_amount" label="Loan amount" inputMode="numeric" value={values.loan_amount} onChange={set("loan_amount")} error={errors.loan_amount} prefix="₹" enterKeyHint="next" required placeholder="5,00,000" />
            <FormField id="ap-city_pin" label="City and PIN code" value={values.city_pin} onChange={set("city_pin")} error={errors.city_pin} autoComplete="postal-code" enterKeyHint="next" required placeholder="Prayagraj 211001" helper="Helps us match partner policies available in your city." />
            <Select id="ap-purpose" label="Purpose" value={values.purpose} onChange={set("purpose")} placeholder="Select a purpose (optional)" options={[
              { value: "medical", label: "Medical" },
              { value: "travel", label: "Travel" },
              { value: "wedding", label: "Wedding" },
              { value: "renovation", label: "Home renovation" },
              { value: "education", label: "Education" },
              { value: "working-capital", label: "Business working capital" },
              { value: "other", label: "Something else" },
            ]} />
          </div>
        ) : null}

        {step === 3 ? (
          <div className="apply__step">
            <h2 className="apply__step-title">Documents you already have</h2>
            <p className="apply__step-sub">Nothing is uploaded on this demo. Ticking items helps the advisor prepare the right checklist.</p>
            <div className="apply__docs">
              {(service?.docs || []).map((doc) => {
                const on = values.docs.includes(doc);
                return (
                  <label key={doc} className={`apply__doc ${on ? "is-on" : ""}`}>
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => setValues((v) => ({ ...v, docs: on ? v.docs.filter((d) => d !== doc) : [...v.docs, doc] }))}
                    />
                    <span className="apply__doc-box" aria-hidden="true">{on ? <Check size={14} /> : null}</span>
                    <span>{doc}</span>
                  </label>
                );
              })}
            </div>
            <FormField id="ap-message" label="Anything else we should know?" value={values.message} onChange={set("message")} enterKeyHint="next" placeholder="e.g. Salaried, ₹65,000 take-home, need funds within 10 days" />
            <div className="apply__hp" aria-hidden="true">
              <label htmlFor="ap-company">Company</label>
              <input id="ap-company" tabIndex={-1} autoComplete="off" value={values.honeypot} onChange={(e) => setValues((v) => ({ ...v, honeypot: e.target.value }))} />
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="apply__step">
            <h2 className="apply__step-title">Review and submit</h2>
            <p className="apply__step-sub">Check the details. Submitting opens WhatsApp with this summary prefilled.</p>
            <dl className="apply__review">
              <div><dt>Product</dt><dd>{service?.name}</dd></div>
              <div><dt>Name</dt><dd>{values.from_name}</dd></div>
              <div><dt>Mobile</dt><dd>+91 {values.mobile}</dd></div>
              <div><dt>Email</dt><dd>{values.email || "—"}</dd></div>
              <div><dt>Amount</dt><dd>{values.loan_amount || "—"}</dd></div>
              <div><dt>City & PIN</dt><dd>{values.city_pin}</dd></div>
              <div><dt>Purpose</dt><dd>{values.purpose || "—"}</dd></div>
              <div><dt>Documents ready</dt><dd>{values.docs.length ? values.docs.join(", ") : "None selected"}</dd></div>
            </dl>
            <Consent id="ap-consent" checked={values.consent} onChange={(c) => setValues((v) => ({ ...v, consent: c }))} error={errors.consent} />
            <p className="apply__assure"><ShieldCheck aria-hidden="true" size={16} /> No credit-bureau pull happens at this stage. The chosen lender runs a formal check later, with your agreement.</p>
          </div>
        ) : null}

        {errors.__saved ? <p className="apply__saved" role="status"><CheckCircle2 aria-hidden="true" size={16} /> {errors.__saved}</p> : null}
        {busy ? <p className="apply__saved" role="status"><Loader2 aria-hidden="true" size={16} className="apply__spin" /> Sending your application securely…</p> : null}
        {errorCount > 0 && (step === 1 || step === 2 || step === 4) ? (
          <p className="apply__errorline" role="alert"><AlertCircle aria-hidden="true" size={16} /> Some fields need attention before you continue.</p>
        ) : null}
      </div>

      <div className="apply__footer">
        <div className="apply__footer-inner">
          <button type="button" className="apply__back" onClick={() => go(-1)} disabled={step === 0}>
            <ChevronLeft aria-hidden="true" size={18} /> Back
          </button>
          <button type="button" className="apply__save" onClick={saveDraft}>
            <Save aria-hidden="true" size={16} /> Save draft
          </button>
          {step < STEPS.length - 1 ? (
            <Button size="md" onClick={() => go(1)}>
              Next
            </Button>
          ) : (
            <Button size="md" variant="whatsapp" loading={busy} onClick={submit} icon={<WhatsAppIcon size={18} />} rightIcon={false}>
              {busy ? "Submitting…" : "Submit application"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
