"use client";
/**
 * Chip — selectable quick-pick chip (amounts, tenures, filters).
 */
import "./Chip.css";

export default function Chip({ label, active = false, onClick, icon = null, size = "md" }) {
  return (
    <button
      type="button"
      className={`chip chip--${size} ${active ? "is-active" : ""}`}
      aria-pressed={active}
      onClick={onClick}
    >
      {icon ? <span className="chip__icon" aria-hidden="true">{icon}</span> : null}
      {label}
    </button>
  );
}
