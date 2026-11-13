/**
 * storage.js — SSR-safe localStorage/sessionStorage helpers with JSON and TTL support.
 */
export function safeGet(key, fallback = null, store = "local") {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = (store === "session" ? window.sessionStorage : window.localStorage).getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function safeSet(key, value, store = "local") {
  if (typeof window === "undefined") return false;
  try {
    (store === "session" ? window.sessionStorage : window.localStorage).setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function safeRemove(key, store = "local") {
  if (typeof window === "undefined") return;
  try {
    (store === "session" ? window.sessionStorage : window.localStorage).removeItem(key);
  } catch {
    /* ignore */
  }
}

/** Stores a value with an expiry timestamp (ms). */
export function safeSetWithExpiry(key, value, ttlMs, store = "local") {
  return safeSet(key, { value, expires: Date.now() + ttlMs }, store);
}

export function safeGetWithExpiry(key, fallback = null, store = "local") {
  const raw = safeGet(key, null, store);
  if (!raw || typeof raw !== "object") return fallback;
  if (raw.expires && Date.now() > raw.expires) {
    safeRemove(key, store);
    return fallback;
  }
  return raw.value ?? fallback;
}

export const STORAGE_KEYS = {
  enquiryDraft: "mirvex_enquiry",
  applyDraft: "mirvex_apply_draft",
  popupSeen: "mirvex_popup_seen",
  installDismissed: "mirvex_install_dismissed",
  pageViews: "mirvex_page_views",
  preloaderSeen: "mirvex_preloader",
  applications: "mirvex_applications",
  leads: "mirvex_leads",
  teamNotes: "mirvex_team_notes",
};
