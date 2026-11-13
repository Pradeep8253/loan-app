/**
 * leadOutbox.js — durable queue for leads that could not reach EmailJS.
 * Retries when the browser regains connectivity and on the next page load.
 */
import { safeGet, safeSet } from "./storage";
import { sendLeadEmail, sendAckEmail } from "./emailjs";

const KEY = "mirvex_outbox";
const MAX = 25;

export function queueLead(payload) {
  const list = safeGet(KEY, []);
  const next = [{ payload, queued_at: new Date().toISOString() }, ...list].slice(0, MAX);
  safeSet(KEY, next);
  return next.length;
}

export function getOutbox() {
  return safeGet(KEY, []);
}

export function saveOutbox(list) {
  safeSet(KEY, list.slice(0, MAX));
}

export async function flushOutbox({ onResult } = {}) {
  const list = getOutbox();
  if (!list.length) return { flushed: 0, remaining: 0 };
  const remaining = [];
  let flushed = 0;
  for (const item of list) {
    const res = await sendLeadEmail(item.payload);
    if (res.status === "sent" || res.status === "demo") {
      if (item.payload.email) sendAckEmail(item.payload);
      flushed += 1;
    } else {
      remaining.push(item);
    }
  }
  saveOutbox(remaining);
  if (onResult) onResult({ flushed, remaining: remaining.length });
  return { flushed, remaining: remaining.length };
}
