"use client";
/**
 * CoForm — the full contact form: name, mobile, email, service, subject and message,
 * with the same validation and lead engine as every other form.
 */
import { useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import FormField, { TextArea } from "@/components/ui/FormField/FormField";
import Select from "@/components/ui/Select/Select";
import Consent from "@/components/ui/Consent/Consent";
import Button from "@/components/ui/Button/Button";
import { services } from "@/lib/data/services";
import { validateName, validateMobile, validateEmail } from "@/lib/validators";
import { submitLead } from "@/lib/leadService";
import { useShell } from "@/context/ShellContext";
import { haptic } from "@/lib/haptics";
import "./CoForm.css";

const SUBJECTS = [
  { value: "enquiry", label: "New loan enquiry" },
  { value: "existing", label: "About an existing application" },
  { value: "documents", label: "Document question" },
  { value: "complaint", label: "A complaint" },
  { value: "partnership", label: "Partnership or press" },
];

export default function CoForm() {
  const [values, setValues] = useState({ from_name: "", mobile: "", email: "", service: "", subject: "enquiry", message: "", consent: false, honeypot: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);
  const formRef = useRef(null);
  const { toast } = useShell();

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e?.target ? e.target.value : e }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    const n = validateName(values.from_name); if (n) next.from_name = n;
    const m = validateMobile(values.mobile); if (m) next.mobile = m;
    const em = validateEmail(values.email, true); if (em) next.email = em;
    if (!values.consent) next.consent = "Please accept the consent note.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      const el = formRef.current?.querySelector(`#co-${first}`) || formRef.current?.querySelector("#co-consent");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      haptic(18);
      return;
    }
    setBusy(true);
    const res = await submitLead(
      { ...values, source: "contact.form", summary: `${values.subject}: ${values.message || "no message"}` },
      { redirect: true, spamKey: "mirvex_contact_form" }
    );
    setBusy(false);
    if (res.ok) {
      setDone(res);
      toast("Message received — check WhatsApp.", "success");
    } else setErrors(res.errors || {});
  };

  if (done) {
    return (
      <div className="co-form__done">
        <CheckCircle2 aria-hidden="true" size={36} />
        <h3>Message received</h3>
        <p>Your reference is <strong>{done.reference}</strong>. An advisor replies within {`${30} minutes`} in business hours.</p>
        <Button variant="whatsapp" size="md" href={done.whatsappUrl} external icon={<WhatsAppIcon size={18} />} rightIcon={false}>Continue on WhatsApp</Button>
      </div>
    );
  }

  return (
    <form className="co-form" onSubmit={onSubmit} ref={formRef} noValidate>
      <div className="co-form__row">
        <FormField id="co-from_name" label="Full name" value={values.from_name} onChange={set("from_name")} error={errors.from_name} autoComplete="name" required placeholder="Your name" />
        <FormField id="co-mobile" label="Mobile" type="tel" inputMode="numeric" prefix="+91" maxLength={10} value={values.mobile} onChange={(e) => setValues((v) => ({ ...v, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))} error={errors.mobile} autoComplete="tel-national" required placeholder="98765 43210" />
      </div>
      <FormField id="co-email" label="Email" type="email" inputMode="email" value={values.email} onChange={set("email")} error={errors.email} autoComplete="email" required placeholder="name@example.com" />
      <div className="co-form__row">
        <Select id="co-service" label="Service" value={values.service} onChange={set("service")} placeholder="Any / not sure" options={services.map((s) => ({ value: s.key, label: s.name }))} />
        <Select id="co-subject" label="Subject" value={values.subject} onChange={set("subject")} options={SUBJECTS} required />
      </div>
      <TextArea id="co-message" label="Message" value={values.message} onChange={set("message")} placeholder="Tell us what you need. If it is about an existing application, include the reference." />
      <div className="co-form__hp" aria-hidden="true">
        <input tabIndex={-1} autoComplete="off" value={values.honeypot} onChange={(e) => setValues((v) => ({ ...v, honeypot: e.target.value }))} aria-label="Company" />
      </div>
      <Consent id="co-consent" checked={values.consent} onChange={(c) => setValues((v) => ({ ...v, consent: c }))} error={errors.consent} />
      <Button type="submit" variant="whatsapp" size="lg" block loading={busy} icon={<WhatsAppIcon size={20} />} rightIcon={false}>
        {busy ? "Sending…" : "Send message on WhatsApp"}
      </Button>
    </form>
  );
}
