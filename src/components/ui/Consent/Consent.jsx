"use client";
/**
 * Consent — the shared marketing consent checkbox used by every lead form.
 */
import { AlertCircle, Check } from "lucide-react";
import "./Consent.css";

export default function Consent({ id = "consent", checked, onChange, error, text }) {
  return (
    <div className="consent">
      <label className="consent__row" htmlFor={id}>
        <span className={`consent__box ${checked ? "is-on" : ""}`} aria-hidden="true">
          {checked ? <Check size={14} /> : null}
        </span>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="consent__input"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <span className="consent__text">
          {text ||
            "I agree to be contacted about this enquiry. I understand Mirvex is a loan assistance platform and not a lender."}
        </span>
      </label>
      {error ? (
        <p className="consent__error" id={`${id}-error`} role="alert">
          <AlertCircle aria-hidden="true" size={15} /> {error}
        </p>
      ) : null}
    </div>
  );
}
