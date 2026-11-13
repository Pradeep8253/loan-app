/**
 * reference.js — generates human-readable application references like MVX-4821-XX.
 */
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ";

export function generateReference() {
  const n = Math.floor(1000 + Math.random() * 9000);
  const a = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  const b = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  return `MVX-${n}-${a}${b}`;
}

export function isReference(value) {
  return /^MVX-\d{4}-[A-Z]{2}$/.test(String(value || "").trim().toUpperCase());
}

export function normaliseReference(value) {
  return String(value || "").trim().toUpperCase();
}
