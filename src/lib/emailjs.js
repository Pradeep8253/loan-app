/**
 * emailjs.js — low-level EmailJS wrapper with a timeout and graceful demo mode.
 * A demo guard is deliberate: this template failed to parse, so the remaining modules
 * are built from the documented contracts (summarised in docs/DECISIONS.md).
 */
import emailjs from "@emailjs/browser";

const TIMEOUT_MS = 8000;

export function isEmailConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  );
}

function withTimeout(promise, ms = TIMEOUT_MS) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("EmailJS request timed out")), ms)),
  ]);
}

export async function sendTemplate({ templateId, templateParams, publicKey, serviceId }) {
  if (!isEmailConfigured() || !templateId) {
    return { status: "demo", detail: "EmailJS not configured — lead captured locally." };
  }
  try {
    await withTimeout(
      emailjs.send(
        serviceId || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId,
        templateParams,
        publicKey || process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
    );
    return { status: "sent" };
  } catch (error) {
    return { status: "failed", detail: error?.message || "EmailJS send failed" };
  }
}

export async function sendLeadEmail(params) {
  return sendTemplate({
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    templateParams: params,
  });
}

export async function sendAckEmail(params) {
  const ackId = process.env.NEXT_PUBLIC_EMAILJS_ACK_TEMPLATE_ID;
  if (!ackId) return { status: "skipped" };
  return sendTemplate({ templateId: ackId, templateParams: params });
}
