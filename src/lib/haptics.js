/**
 * haptics.js — feature-detected vibration for key confirmations. No-ops silently.
 */
export function haptic(pattern = 10) {
  if (typeof window === "undefined") return;
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return;
  try {
    navigator.vibrate(pattern);
  } catch {
    /* ignore */
  }
}
