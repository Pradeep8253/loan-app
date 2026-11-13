"use client";
/**
 * EnquiryForm — the compact lead form used inside the enquiry sheet, the promo popup
 * and inline enquiry sections. Everything funnels through leadService.submitLead().
 */
import { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import FormField from "@/components/ui/FormField/FormField";
import Select from "@/components/ui/Select/Select";
import Consent from "@/components/ui/Consent/Consent";
import Button from "@/components/ui/Button/Button";
import { validateName, validateMobile, validateEmail } from "@/lib/validators";
import { formatINR, parseAmount } from "@/lib/format";
import { services } from "@/lib/data/services";
import { submitLead } from "@/lib/leadService";
import { haptic } from "@/lib/haptics";
import "./EnquiryForm.css";

const SERVICE_OPTIONS = services.map((s) => ({ value: s.key, label: s.name }));

export default function EnquiryForm({ prefill = {}, onDone, submitLabel = "Get my options on WhatsApp", compact = false }) {
  const formRef = useRef(null);
  const [values, setValues] = useState({
    from_name: "",
    mobile: "",
    email: "",
    service: prefill.service || "personal-loan",
    loan_amount: "",
    message: "",
    consent: false,
    honeypot: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (prefill.service) setValues((v) => ({ ...v, service: prefill.service }));
  }, [prefill.service]);

  const set = (key) => (e) => {
    const raw = e?.target ? e.target.value : e;
    if (key === "loan_amount") {
      const n = parseAmount(raw);
      setValues((v) => ({ ...v, loan_amount: n ? formatINR(n) : "" }));
      return;
    }
    setValues((v) => ({ ...v, [key]: raw }));
  };

  const validate = () => {
    const next = {};
    const nameErr = validateName(values.from_name);
    if (nameErr) next.from_name = nameErr;
    const mobileErr = validateMobile(values.mobile);
    if (mobileErr) next.mobile = mobileErr;
    const emailErr = validateEmail(values.email, false);
    if (emailErr) next.email = emailErr;
    if (!values.consent) next.consent = "Please tick the consent box so we can contact you.";
    setErrors(next);
    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length) {
      const firstKey = Object.keys(next)[0];
      const el = formRef.current?.querySelector(`#ef-${firstKey}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus?.({ preventScroll: true });
      haptic(20);
      return;
    }
    setStatus("sending");
    const amount = parseAmount(values.loan_amount);
    const res = await submitLead(
      {
        ...values,
        __honeypot: values.honeypot,
        loan_amount: amount || "",
        loan_amount_human: amount ? formatINR(amount) : "",
        source: prefill.source || "enquiry_form",
        summary: values.message || `Enquiry for ${values.service}`,
      },
      { redirect: true, spamKey: "mirvex_enquiry_form" }
    );
    if (res.ok) {
      setStatus("done");
      haptic(14);
      onDone?.(res);
    } else {
      setErrors(res.errors || {});
      setStatus("idle");
    }
  };

  return (
    <form className={`enq-form ${compact ? "enq-form--compact" : ""}`} onSubmit={onSubmit} ref={formRef} noValidate>
      <div className="enq-form__row">
        <FormField
          id="ef-from_name"
          label="Full name"
          value={values.from_name}
          onChange={set("from_name")}
          error={errors.from_name}
          placeholder="e.g. Ananya Sharma"
          autoComplete="name"
          enterKeyHint="next"
          required
          valid={values.from_name.length > 2 && !validateName(values.from_name)}
        />
        <FormField
          id="ef-mobile"
          label="Mobile number"
          type="tel"
          inputMode="numeric"
          pattern="[6-9][0-9]{9}"
          maxLength={10}
          value={values.mobile}
          onChange={(e) => setValues((v) => ({ ...v, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
          error={errors.mobile}
          prefix="+91"
          placeholder="98765 43210"
          autoComplete="tel-national"
          enterKeyHint="next"
          required
          valid={values.mobile.length === 10 && !validateMobile(values.mobile)}
        />
      </div>
      {!compact ? (
        <FormField
          id="ef-email"
          label="Email"
          type="email"
          inputMode="email"
          value={values.email}
          onChange={set("email")}
          error={errors.email}
          placeholder="name@example.com"
          autoComplete="email"
          enterKeyHint="next"
        />
      ) : null}
      <div className="enq-form__row">
        <Select id="ef-service" label="Service" value={values.service} onChange={set("service")} options={SERVICE_OPTIONS} required />
        <FormField
          id="ef-loan_amount"
          label="Loan amount"
          inputMode="numeric"
          value={values.loan_amount}
          onChange={set("loan_amount")}
          placeholder="₹5,00,000"
          helper="Approximate is fine"
          enterKeyHint="next"
        />
      </div>
      {!compact ? (
        <FormField
          id="ef-message"
          label="Anything we should know?"
          value={values.message}
          onChange={set("message")}
          placeholder="Salaried, ₹65,000 take-home, need funds in 10 days"
          enterKeyHint="send"
        />
      ) : null}
      <div className="enq-form__hp" aria-hidden="true">
        <label htmlFor="ef-company">Company</label>
        <input id="ef-company" name="company" tabIndex={-1} autoComplete="off" value={values.honeypot} onChange={(e) => setValues((v) => ({ ...v, honeypot: e.target.value }))} />
      </div>
      <Consent checked={values.consent} onChange={(checked) => setValues((v) => ({ ...v, consent: checked }))} error={errors.consent} />
      <Button type="submit" variant="whatsapp" size="lg" block icon={<WhatsAppIcon size={20} />} rightIcon={false} loading={status === "sending"}>
        {status === "sending" ? "Sending securely…" : submitLabel}
      </Button>
      <p className="enq-form__assure">
        <ShieldCheck aria-hidden="true" size={15} />
        No impact on your credit score. Your number is used only for this enquiry.
      </p>
    </form>
  );
}
