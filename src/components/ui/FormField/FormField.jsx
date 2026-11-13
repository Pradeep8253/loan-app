"use client";
/**
 * FormField — labelled input with inline error (icon + text, never colour alone),
 * helper line, required marker and the ARIA wiring every form needs.
 * Also exports TextArea.
 */
import { AlertCircle, Check } from "lucide-react";
import "./FormField.css";

export function FieldShell({ id, label, error, helper, required, children, valid, labelHint }) {
  return (
    <div className={`field ${error ? "has-error" : ""} ${valid ? "is-valid" : ""}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required ? <span className="field__req" aria-hidden="true">*</span> : <span className="field__opt">(optional)</span>}
        {labelHint ? <span className="field__hint">{labelHint}</span> : null}
      </label>
      {children}
      {error ? (
        <p className="field__error" id={`${id}-error`} role="alert">
          <AlertCircle aria-hidden="true" size={15} /> {error}
        </p>
      ) : helper ? (
        <p className="field__helper" id={`${id}-helper`}>{helper}</p>
      ) : null}
    </div>
  );
}

export default function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  helper,
  required = false,
  placeholder,
  inputMode,
  autoComplete,
  enterKeyHint,
  maxLength,
  minLength,
  pattern,
  valid,
  disabled,
  prefix,
  suffix,
  labelHint,
  name,
}) {
  return (
    <FieldShell id={id} label={label} error={error} helper={helper} required={required} valid={valid && !error} labelHint={labelHint}>
      <div className="field__control">
        {prefix ? <span className="field__affix field__affix--prefix">{prefix}</span> : null}
        <input
          id={id}
          name={name || id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          inputMode={inputMode}
          autoComplete={autoComplete}
          enterKeyHint={enterKeyHint}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          disabled={disabled}
          required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
          className="field__input"
        />
        {suffix ? <span className="field__affix field__affix--suffix">{suffix}</span> : null}
        {valid && !error ? <Check aria-hidden="true" size={18} className="field__check" /> : null}
      </div>
    </FieldShell>
  );
}

export function TextArea({
  id,
  label,
  value,
  onChange,
  error,
  helper,
  required = false,
  placeholder,
  rows = 4,
  maxLength = 500,
}) {
  return (
    <FieldShell id={id} label={label} error={error} helper={helper} required={required}>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
        className="field__input field__textarea"
      />
      <span className="field__count" aria-hidden="true">{String(value || "").length}/{maxLength}</span>
    </FieldShell>
  );
}
