"use client";
/**
 * useReveal — observes elements with [data-reveal] inside a root and adds `.is-in`
 * once they enter the viewport. Falls back to instantly visible without IO.
 */
import { useEffect } from "react";

export default function useReveal(rootRef, deps = []) {
  useEffect(() => {
    const root = rootRef?.current || document;
    if (!root) return undefined;
    const nodes = root.querySelectorAll("[data-reveal]");
    if (!nodes.length) return undefined;
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
