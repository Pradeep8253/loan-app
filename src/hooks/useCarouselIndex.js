"use client";
/**
 * useCarouselIndex — tracks the visible snap card of a horizontal carousel.
 */
import { useCallback, useEffect, useState } from "react";

export default function useCarouselIndex(ref, itemCount) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const card = el.querySelector("[data-carousel-item]");
        if (!card) return;
        const w = card.getBoundingClientRect().width + 16;
        const next = Math.round(el.scrollLeft / w);
        setIndex(Math.max(0, Math.min(itemCount - 1, next)));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref, itemCount]);

  const goTo = useCallback(
    (i) => {
      const el = ref.current;
      if (!el) return;
      const card = el.querySelector("[data-carousel-item]");
      const w = card ? card.getBoundingClientRect().width + 16 : el.clientWidth;
      el.scrollTo({ left: i * w, behavior: "smooth" });
    },
    [ref]
  );

  return [index, goTo];
}
