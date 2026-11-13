"use client";
/**
 * HomeFinalCta — the closing split panel with a dedicated callback form (not the
 * generic band) and a WhatsApp alternative.
 */
import { useState } from "react";
import { Phone, ShieldCheck } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import FormField from "@/components/ui/FormField/FormField";
import Select from "@/components/ui/Select/Select";
import Consent from "@/components/ui/Consent/Consent";
import Button from "@/components/ui/Button/Button";
import Reveal from "@/components/ui/Reveal/Reveal";
import { services } from "@/lib/data/services";
import { validateName, validateMobile } from "@/lib/validators";
import { submitLead } from "@/lib/leadService";
import { siteConfig } from "@/lib/siteConfig";
import { useShell } from "@/context/ShellContext";
import "./HomeFinalCta.css";

export default function HomeFinalCta() {
  const [values, setValues] = useState({ from_name: "", mobile: "", service: "personal-loan", consent: false, honeypot: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const { toast } = useShell();

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    const n = validateName(values.from_name);
    if (n) next.from_name = n;
    const m = validateMobile(values.mobile);
    if (m) next.mobile = m;
    if (!values.consent) next.consent = "Please accept the consent note.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    const res = await submitLead({ ...values, source: "home.final", summary: "Callback from home closing panel", whatsappTemplate: "callback" }, { redirect: true, spamKey: "mirvex_home_final" });
    setBusy(false);
    if (res.ok) toast(`Request logged · ${res.reference}`, "success");
  };

  return (
    <section className="home-final section section--teal" aria-labelledby="home-final-title">
      <div className="container home-final__grid">
        <Reveal variant="left" className="home-final__copy">
          <p className="eyebrow eyebrow--amber">Last step</p>
          <h2 id="home-final-title" className="home-final__title">
            Tell us the amount. <span className="marker">We will tell you the truth.</span>
          </h2>
          <p className="home-final__body lede">
            A named advisor reviews your enquiry, compares partner policies and comes back with a shortlist — or an honest reason why now is not the time.
          </p>
          <ul className="home-final__points">
            <li><ShieldCheck aria-hidden="true" size={18} /> Enquiry does not pull your credit report</li>
            <li><ShieldCheck aria-hidden="true" size={18} /> Written comparison before any application</li>
            <li><ShieldCheck aria-hidden="true" size={18} /> Advisor replies in {siteConfig.contact.responseTime.toLowerCase()}</li>
          </ul>
          <div className="home-final__alt">
            <a href={`tel:${siteConfig.contact.phoneHref}`} className="home-final__alt-btn">
              <Phone aria-hidden="true" size={18} /> {siteConfig.contact.phoneDisplay}
            </a>
          </div>
        </Reveal>
        <Reveal variant="right" delay={100} className="home-final__card">
          <p className="home-final__card-title">Request a callback</p>
          <form className="home-final__form" onSubmit={onSubmit} noValidate>
            <FormField id="hf-name" label="Full name" value={values.from_name} onChange={(e) => setValues((v) => ({ ...v, from_name: e.target.value }))} error={errors.from_name} autoComplete="name" required placeholder="Your name" />
            <FormField id="hf-mobile" label="Mobile" type="tel" inputMode="numeric" prefix="+91" maxLength={10} autoComplete="tel-national" value={values.mobile} onChange={(e) => setValues((v) => ({ ...v, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))} error={errors.mobile} required placeholder="98765 43210" />
            <Select id="hf-service" label="Service" value={values.service} onChange={(e) => setValues((v) => ({ ...v, service: e.target.value }))} options={services.map((s) => ({ value: s.key, label: s.name }))} required />
            <div className="enq-form__hp" aria-hidden="true">
              <input tabIndex={-1} autoComplete="off" value={values.honeypot} onChange={(e) => setValues((v) => ({ ...v, honeypot: e.target.value }))} aria-hidden="true" />
            </div>
            <Consent id="hf-consent" checked={values.consent} onChange={(c) => setValues((v) => ({ ...v, consent: c }))} error={errors.consent} />
            <Button type="submit" variant="whatsapp" size="lg" block loading={busy} icon={<WhatsAppIcon size={20} />} rightIcon={false}>
              {busy ? "Sending…" : "Confirm on WhatsApp"}
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
