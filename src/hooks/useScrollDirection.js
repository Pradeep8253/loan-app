"use client";
/**
 * useScrollDirection — returns 'up' | 'down' | 'top' with a small threshold,
 * used by the mobile app bar to hide on scroll-down and reveal on scroll-up.
 */
import { useEffect, useState } from "react";

export default function useScrollDirection(threshold = 8) {
  const [direction, setDirection] = useState("top");

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 24) setDirection("top");
        else if (Math.abs(y - lastY) > threshold) setDirection(y > lastY ? "down" : "up");
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return direction;
}
