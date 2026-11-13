"use client";
/**
 * Select — styled native select (best mobile wheel UX) with label, error and helper.
 */
import { ChevronDown } from "lucide-react";
import { FieldShell } from "@/components/ui/FormField/FormField";
import "./Select.css";

export default function Select({ id, label, value, onChange, options, error, helper, required = false, placeholder, disabled }) {
  return (
    <FieldShell id={id} label={label} error={error} helper={helper} required={required}>
      <div className="field__control select">
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
          className="select__input"
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden="true" size={18} className="select__chevron" />
      </div>
    </FieldShell>
  );
}
