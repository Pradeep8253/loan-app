/**
 * analytics.js — lightweight event tracking stub.
 * Sends to console (dev), window.dataLayer (GTM-ready) and a session log used by the team dashboard demo.
 */
const LOG_KEY = "mirvex_events";
const MAX_EVENTS = 60;

export function trackEvent(name, props = {}) {
  if (typeof window === "undefined") return;
  const event = { name, props, at: new Date().toISOString() };
  try {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.info("[analytics]", name, props);
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...props });
    const log = JSON.parse(window.sessionStorage.getItem(LOG_KEY) || "[]");
    log.unshift(event);
    window.sessionStorage.setItem(LOG_KEY, JSON.stringify(log.slice(0, MAX_EVENTS)));
  } catch {
    /* storage unavailable — tracking is best-effort */
  }
}

export function getEventLog() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.sessionStorage.getItem(LOG_KEY) || "[]");
  } catch {
    return [];
  }
}
