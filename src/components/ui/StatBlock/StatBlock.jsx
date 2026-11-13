"use client";
/**
 * StatBlock — animated counter with suffix and label. Respects reduced motion.
 */
import { useEffect, useRef, useState } from "react";
import useCountUp from "@/hooks/useCountUp";
import "./StatBlock.css";

export default function StatBlock({ value, suffix = "", decimals = 0, label, tone = "light" }) {
  const [start, setStart] = useState(false);
  const ref = useRef(null);
  const count = useCountUp(value, { start, decimals, duration: 1500 });

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setStart(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const display = decimals ? count.toFixed(decimals) : Math.round(count).toLocaleString("en-IN");

  return (
    <div className={`stat stat--${tone}`} ref={ref}>
      <p className="stat__value">
        {display}
        <span className="stat__suffix">{suffix}</span>
      </p>
      <p className="stat__label">{label}</p>
    </div>
  );
}
