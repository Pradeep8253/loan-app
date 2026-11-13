"use client";
/**
 * BarChart — solid bars that grow on view. Used by the EMI schedule preview.
 * Values are printed above each bar on wide screens and, on narrow screens,
 * rotated inside the column so eight labels never collide at 390px.
 */
import { useEffect, useRef, useState } from "react";
import "./BarChart.css";

export default function BarChart({ data, height = 160, label }) {
  const ref = useRef(null);
  const [drawn, setDrawn] = useState(false);
  const max = Math.max(...data.map((d) => d.value), 1);

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
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="bars" ref={ref} aria-label={label}>
      <div className="bars__plot" style={{ "--bars-h": typeof height === "number" ? `${height}px` : height }}>
        {data.map((d, i) => (
          <div className="bars__col" key={d.label}>
            <span className="bars__value">{d.display}</span>
            <span
              className="bars__bar"
              style={{ "--bar-h": drawn ? `${Math.max(4, (d.value / max) * 100)}%` : "0%", "--delay": `${i * 60}ms` }}
            />
            <span className="bars__label">{d.label}</span>
          </div>
        ))}
      </div>
      <figcaption className="bars__table">
        <span className="sr-only">{label} — values: </span>
        {data.map((d) => (
          <span key={`t-${d.label}`} className="sr-only">{d.label}: {d.display}. </span>
        ))}
      </figcaption>
    </figure>
  );
}
