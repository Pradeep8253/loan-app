/**
 * attribution.js — captures UTM parameters and the external referrer once per session.
 * SSR-safe: reads sessionStorage only inside functions called from effects/handlers.
 */
const KEY = "mirvex_attribution";

export function captureAttribution() {
  if (typeof window === "undefined") return null;
  try {
    const existing = window.sessionStorage.getItem(KEY);
    if (existing) return JSON.parse(existing);
    const params = new URLSearchParams(window.location.search);
    const data = {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      referrer: document.referrer && !document.referrer.includes(window.location.host) ? document.referrer : "",
      landing_page: window.location.pathname + window.location.search,
      captured_at: new Date().toISOString(),
    };
    window.sessionStorage.setItem(KEY, JSON.stringify(data));
    return data;
  } catch {
    return null;
  }
}

export function getAttribution() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.sessionStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function detectDevice() {
  if (typeof window === "undefined") return "server";
  const w = window.innerWidth;
  if (w <= 768) return "mobile";
  if (w <= 1024) return "tablet";
  return "desktop";
}
