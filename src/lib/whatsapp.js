/**
 * whatsapp.js — builds wa.me deep links with pre-filled, service-aware messages.
 * Message templates live here so copy stays consistent across every CTA.
 */
import { siteConfig } from "./siteConfig";

const TEMPLATES = {
  general: (p) =>
    `Hi ${siteConfig.brand.short}, I'd like help with a loan enquiry${p.serviceLabel ? ` (${p.serviceLabel})` : ""}.${p.reference ? ` My reference is ${p.reference}.` : ""}${p.name ? ` I'm ${p.name}.` : ""}`,
  callback: (p) =>
    `Hi ${siteConfig.brand.short}, please call me back about ${p.serviceLabel || "a loan"}.${p.name ? ` Name: ${p.name}.` : ""}${p.mobile ? ` Mobile: ${p.mobile}.` : ""}`,
  emi: (p) =>
    `Hi ${siteConfig.brand.short}, I used your EMI calculator for ${p.serviceLabel || "a personal loan"} (${p.amount} over ${p.tenure}). Can you help me take this forward?`,
  eligibility: (p) =>
    `Hi ${siteConfig.brand.short}, my eligibility estimate was about ${p.amount}. I'd like to confirm my options.`,
  track: (p) => `Hi ${siteConfig.brand.short}, please share an update on my application ${p.reference}.`,
  grievance: (p) =>
    `Hi ${siteConfig.brand.short}, I'd like to raise a grievance${p.reference ? ` about ${p.reference}` : ""}.`,
  apply: (p) =>
    `Hi ${siteConfig.brand.short}, I just completed my application${p.reference ? ` (${p.reference})` : ""} for ${p.serviceLabel || "a loan"}. Please confirm the next steps.`,
  balanceTransfer: (p) =>
    `Hi ${siteConfig.brand.short}, I'm interested in a balance transfer${p.amount ? ` of about ${p.amount}` : ""}. Please guide me.`,
};

export function buildWhatsAppUrl({ template = "general", params = {}, phone } = {}) {
  const build = TEMPLATES[template] || TEMPLATES.general;
  const text = encodeURIComponent(build(params || {}));
  const number = phone || siteConfig.contact.whatsapp;
  return `https://wa.me/${number}?text=${text}`;
}

export function isIOS() {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

export function isStandalone() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}
