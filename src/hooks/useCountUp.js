"use client";
/**
 * useCountUp — animates 0 → target once `start` becomes true.
 * Respects prefers-reduced-motion. Returns the display value.
 */
import { useEffect, useRef, useState } from "react";

export default function useCountUp(target, { duration = 1400, decimals = 0, start = true } = {}) {
  const [value, setValue] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (!start) return undefined;
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return undefined;
    }
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Number((target * eased).toFixed(decimals)));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, decimals, start]);

  return value;
}
