"use client";
/**
 * DonutChart — solid two-colour SVG ring that draws on view (stroke-dashoffset).
 * Used by the EMI page for the principal vs interest split.
 */
import { useEffect, useRef, useState } from "react";
import "./DonutChart.css";

export default function DonutChart({ segments, size = 180, thickness = 26, centerTop, centerBottom, label }) {
  const ref = useRef(null);
  const [drawn, setDrawn] = useState(false);
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setDrawn(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let offset = 0;

  return (
    <figure className="donut" ref={ref} aria-label={label}>
      <div className="donut__ring" style={{ "--donut-size": `${size}px` }}>
        <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-hidden="true">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={thickness} />
          {segments.map((s) => {
            const len = (s.value / total) * c;
            const dash = drawn ? `${len} ${c - len}` : `0 ${c}`;
            const circle = (
              <circle
                key={s.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={thickness}
                strokeDasharray={dash}
                strokeDashoffset={-offset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                className="donut__seg"
              />
            );
            offset += len;
            return circle;
          })}
        </svg>
        <div className="donut__center">
          <span className="donut__top">{centerTop}</span>
          <span className="donut__bottom">{centerBottom}</span>
        </div>
      </div>
      <figcaption className="donut__legend">
        {segments.map((s) => (
          <span className="donut__key" key={s.label}>
            <span className="donut__swatch" style={{ "--swatch": s.color }} aria-hidden="true" />
            {s.label}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
