/**
 * format.js — en-IN number, currency and date helpers used across the platform.
 * All output is deterministic so server and client render identical strings.
 */
const inrGroup = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

export function formatINR(value) {
  const n = Number(value) || 0;
  return `₹${inrGroup.format(Math.round(n))}`;
}

export function formatNumber(value) {
  return inrGroup.format(Number(value) || 0);
}

export function compactINR(value) {
  const n = Number(value) || 0;
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(n % 10000000 === 0 ? 0 : 1)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)} L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  return `₹${n}`;
}

export function formatMobile(mobile) {
  const d = String(mobile || "").replace(/\D/g, "").slice(-10);
  if (d.length !== 10) return mobile || "";
  return `${d.slice(0, 5)} ${d.slice(5)}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Formats an ISO timestamp without locale APIs (hydration-safe). */
export function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatDateTime(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  let h = d.getHours();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${formatDate(iso)}, ${String(h).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")} ${ampm}`;
}

/** "2 days ago" style relative label, deterministic after mount. */
export function timeAgo(iso) {
  const d = new Date(iso).getTime();
  if (Number.isNaN(d)) return "";
  const diff = Math.max(0, Date.now() - d);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? "s" : ""} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

/** Parses a user-typed amount string like "5,00,000" into a number. */
export function parseAmount(value) {
  const n = Number(String(value).replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function titleCase(str) {
  return String(str || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
