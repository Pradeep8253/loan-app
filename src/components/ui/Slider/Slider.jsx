"use client";
/**
 * Slider — accessible range input with a filled track, live label and press-safe handle.
 */
import { formatINR, formatNumber } from "@/lib/format";
import "./Slider.css";

export default function Slider({ id, label, value, min, max, step = 1, onChange, format = "inr", suffix = "" }) {
  const pct = ((value - min) / (max - min)) * 100;
  const display = format === "inr" ? formatINR(value) : `${formatNumber(value)}${suffix}`;
  return (
    <div className="slider">
      <div className="slider__meta">
        <label htmlFor={id} className="slider__label">{label}</label>
        <output htmlFor={id} className="slider__value">{display}</output>
      </div>
      <div className="slider__track" style={{ "--pct": `${pct}%` }}>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className="slider__input"
          aria-valuetext={display}
        />
      </div>
      <div className="slider__scale" aria-hidden="true">
        <span>{format === "inr" ? formatINR(min) : `${formatNumber(min)}${suffix}`}</span>
        <span>{format === "inr" ? formatINR(max) : `${formatNumber(max)}${suffix}`}</span>
      </div>
    </div>
  );
}
