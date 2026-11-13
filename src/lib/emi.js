/**
 * emi.js — EMI, amortisation and eligibility maths.
 * Pure functions, safe on server and client.
 */

/** @returns {number} monthly EMI */
export function calculateEMI(principal, annualRate, months) {
  const P = Number(principal);
  const n = Number(months);
  const r = Number(annualRate) / 12 / 100;
  if (!P || !n) return 0;
  if (!r) return P / n;
  const factor = Math.pow(1 + r, n);
  return (P * r * factor) / (factor - 1);
}

export function totalPayment(emi, months) {
  return emi * months;
}

export function totalInterest(emi, months, principal) {
  return Math.max(0, emi * months - principal);
}

/** First 12 months of an amortisation schedule. */
export function amortisation(principal, annualRate, months, rows = 12) {
  const P = Number(principal);
  const r = Number(annualRate) / 12 / 100;
  const emi = calculateEMI(principal, annualRate, months);
  let balance = P;
  const out = [];
  for (let m = 1; m <= Math.min(rows, months); m += 1) {
    const interest = balance * r;
    const principalPart = Math.min(emi - interest, balance);
    balance = Math.max(0, balance - principalPart);
    out.push({ month: m, interest, principal: principalPart, balance });
  }
  return out;
}

/** Simple FOIR-based eligible amount, used by the eligibility estimator. */
export function estimateEligibility({ monthlyIncome, existingEmi, foir = 0.5, rate = 13, years = 5 }) {
  const income = Number(monthlyIncome) || 0;
  const existing = Number(existingEmi) || 0;
  const capacity = Math.max(0, income * foir - existing);
  const r = rate / 12 / 100;
  const n = years * 12;
  const factor = Math.pow(1 + r, n);
  const principal = capacity > 0 ? (capacity * (factor - 1)) / (r * factor) : 0;
  return { capacity, principal: Math.floor(principal / 1000) * 1000 };
}
