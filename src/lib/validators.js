/**
 * validators.js — field-level validation shared by every form on the platform.
 * Returns plain string messages (English India) or null.
 */
export const MOBILE_RE = /^[6-9]\d{9}$/;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PIN_RE = /^[1-9][0-9]{5}$/;
export const NAME_RE = /^[A-Za-z][A-Za-z\s.'-]{1,59}$/;

export function validateName(value) {
  const v = String(value || "").trim();
  if (!v) return "Please enter your full name.";
  if (v.length < 2) return "Name is too short.";
  if (v.length > 60) return "Name must be 60 characters or fewer.";
  if (!NAME_RE.test(v)) return "Use letters only — no digits or symbols.";
  return null;
}

export function validateMobile(value) {
  const v = String(value || "").replace(/\D/g, "");
  if (!v) return "Please enter your mobile number.";
  if (v.length !== 10) return "Enter a 10-digit mobile number.";
  if (!MOBILE_RE.test(v)) return "Indian mobiles start with 6, 7, 8 or 9.";
  return null;
}

export function validateEmail(value, required = false) {
  const v = String(value || "").trim();
  if (!v) return required ? "Please enter your email address." : null;
  if (!EMAIL_RE.test(v)) return "Enter a valid email like name@example.com.";
  return null;
}

export function validatePIN(value) {
  const v = String(value || "").trim();
  if (!v) return null;
  if (!PIN_RE.test(v)) return "Enter a valid 6-digit PIN code.";
  return null;
}

export function validateCityPIN(value) {
  const v = String(value || "").trim();
  if (!v) return "City and PIN help us find the right partner.";
  if (v.length < 2) return "That looks too short.";
  return validatePIN(v.split(/\s+/).pop());
}

export function validateAmount(value, min = 10000, max = 10000000) {
  const n = Number(String(value).replace(/[^\d]/g, ""));
  if (!n) return "Please enter a loan amount.";
  if (n < min) return `Minimum amount is ₹${min.toLocaleString("en-IN")}.`;
  if (n > max) return `Maximum amount is ₹${max.toLocaleString("en-IN")}.`;
  return null;
}

export function validateConsent(value, required = true) {
  if (!required) return null;
  return value === true ? null : "Please accept the consent note to continue.";
}

/** Runs a map of validators; returns { valid, errors }. */
export function runValidators(fields) {
  const errors = {};
  Object.entries(fields).forEach(([key, fn]) => {
    const msg = fn();
    if (msg) errors[key] = msg;
  });
  return { valid: Object.keys(errors).length === 0, errors };
}
