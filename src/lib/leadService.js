/**
 * leadService.js — the single lead engine for the whole platform.
 * validate → fingerprint (honeypot + min fill time) → persist locally →
 * EmailJS (internal + optional ack) → queue on failure → redirect to WhatsApp.
 *
 * Contract: submitLead(payload, options) => Promise<{ ok, reference, whatsappUrl, simulated }>
 */
import { siteConfig } from "./siteConfig";
import { buildWhatsAppUrl } from "./whatsapp";
import { sendLeadEmail, sendAckEmail } from "./emailjs";
import { getAttribution, detectDevice } from "./attribution";
import { generateReference } from "./reference";
import { trackEvent } from "./analytics";
import { safeGet, safeSet, STORAGE_KEYS } from "./storage";
import { validateName, validateMobile, validateEmail } from "./validators";

const MIN_FILL_MS = 1500;
const OPEN_WINDOW_FLAG = "mirvex_pending_whatsapp";

function readSpamState(spamKey) {
  if (typeof window === "undefined" || !spamKey) return null;
  try {
    const raw = window.sessionStorage.getItem(spamKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSpamState(spamKey) {
  if (typeof window === "undefined" || !spamKey) return;
  try {
    window.sessionStorage.setItem(spamKey, JSON.stringify({ openedAt: Date.now() }));
  } catch {
    /* ignore */
  }
}

export function resetSpamState(spamKey) {
  if (typeof window === "undefined" || !spamKey) return;
  try {
    window.sessionStorage.removeItem(spamKey);
  } catch {
    /* ignore */
  }
}

export function validateLeadPayload(payload) {
  const errors = {};
  const nameErr = validateName(payload.from_name);
  if (nameErr) errors.from_name = nameErr;
  const mobileErr = validateMobile(payload.mobile);
  if (mobileErr) errors.mobile = mobileErr;
  const emailErr = validateEmail(payload.email, false);
  if (emailErr) errors.email = emailErr;
  if (payload.consent !== true) errors.consent = "Please accept the consent note to continue.";
  return errors;
}

/**
 * @param {object} payload  see docs for full field list
 * @param {object} options  { redirect:boolean, spamKey:string, onStatus:fn }
 */
export async function submitLead(payload = {}, options = {}) {
  const { redirect = true, spamKey = "mirvex_lead_form", onStatus } = options;
  const notify = (status, detail) => {
    if (typeof onStatus === "function") onStatus(status, detail);
  };

  const errors = validateLeadPayload(payload);
  if (Object.keys(errors).length) {
    notify("invalid", errors);
    return { ok: false, errors, whatsappUrl: null };
  }

  if (payload.__honeypot) {
    const fakeReference = generateReference();
    notify("done");
    return { ok: true, reference: fakeReference, whatsappUrl: "#", simulated: true };
  }

  const spam = readSpamState(spamKey);
  if (spam?.openedAt) {
    const recent = Date.now() - spam.openedAt < MIN_FILL_MS;
    if (recent) {
      const retryUrl = buildWhatsAppUrl({ template: "general", params: {} });
      notify("done");
      return { ok: true, reference: generateReference(), whatsappUrl: retryUrl, simulated: true, throttled: true };
    }
  }

  const attribution = getAttribution();
  const reference = payload.reference || generateReference();
  const serviceLabel = siteConfig.serviceLabels[payload.service] || payload.service || "Loan enquiry";
  const messagePayload = {
    from_name: String(payload.from_name || "").trim(),
    mobile: String(payload.mobile || "").replace(/\D/g, "").slice(-10),
    email: String(payload.email || "").trim(),
    service: payload.service || "general",
    service_label: serviceLabel,
    loan_amount: payload.loan_amount || "",
    city_pin: payload.city_pin || "",
    message: payload.message || "",
    source: payload.source || "website",
    page_url: payload.page_url || (typeof window !== "undefined" ? window.location.href : ""),
    reference,
    summary: payload.summary || "",
    submitted_at: new Date().toISOString(),
    consent: "yes",
    utm_source: attribution.utm_source || "",
    utm_medium: attribution.utm_medium || "",
    utm_campaign: attribution.utm_campaign || "",
    referrer: attribution.referrer || "",
    device: detectDevice(),
  };

  try {
    const stored = safeGet(STORAGE_KEYS.leads, []);
    safeSet(STORAGE_KEYS.leads, [{ ...messagePayload, status: "new" }, ...stored].slice(0, 100));
  } catch {
    /* ignore */
  }

  notify("sending");
  const result = await sendLeadEmail(messagePayload);
  if (result.status === "sent" || result.status === "demo") {
    if (messagePayload.email) sendAckEmail(messagePayload);
  } else {
    // Defer import to keep the initial bundle lean.
    import("./leadOutbox").then(({ queueLead }) => queueLead(messagePayload));
  }
  writeSpamState(spamKey);
  trackEvent("lead_submitted", { service: messagePayload.service, source: messagePayload.source, reference, emailjs: result.status });

  const whatsappUrl = buildWhatsAppUrl({
    template: payload.whatsappTemplate || "general",
    params: {
      serviceLabel,
      reference,
      name: messagePayload.from_name.split(" ")[0],
      mobile: messagePayload.mobile,
      amount: payload.loan_amount_human || "",
      tenure: payload.tenure_human || "",
    },
  });

  if (redirect && typeof window !== "undefined") {
    try {
      window.sessionStorage.setItem(OPEN_WINDOW_FLAG, "1");
    } catch {
      /* ignore */
    }
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  notify("done");
  return { ok: true, reference, whatsappUrl, emailjs: result.status };
}
