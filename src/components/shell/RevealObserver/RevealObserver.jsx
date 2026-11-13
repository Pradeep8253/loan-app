"use client";
/**
 * RevealObserver — one IntersectionObserver for every [data-reveal] block on the page.
 * Re-scans on route change and after images/tabs mount.
 */
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    let io;
    const scan = () => {
      const nodes = document.querySelectorAll("[data-reveal]:not(.is-in)");
      if (!nodes.length) return;
      if (!("IntersectionObserver" in window)) {
        nodes.forEach((n) => n.classList.add("is-in"));
        return;
      }
      if (io) io.disconnect();
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
      );
      nodes.forEach((n) => io.observe(n));
    };

    scan();
    const t = window.setTimeout(scan, 400);
    const onLoad = () => scan();
    window.addEventListener("load", onLoad);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", onLoad);
      if (io) io.disconnect();
    };
  }, [pathname]);

  return null;
}
