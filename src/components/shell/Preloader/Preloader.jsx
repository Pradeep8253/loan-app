"use client";
/**
 * Preloader — sub-700ms brand curtain shown once per session. Fades out by itself.
 */
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { safeGet, safeSet, STORAGE_KEYS } from "@/lib/storage";
import "./Preloader.css";

export default function Preloader() {
  const [state, setState] = useState("idle"); // idle | showing | leaving

  useEffect(() => {
    const seen = safeGet(STORAGE_KEYS.preloaderSeen, false, "session");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setState("idle");
      return undefined;
    }
    setState("showing");
    const t1 = window.setTimeout(() => setState("leaving"), 420);
    const t2 = window.setTimeout(() => {
      setState("idle");
      safeSet(STORAGE_KEYS.preloaderSeen, true, "session");
    }, 720);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (state === "idle") return null;

  return (
    <div className={`preloader preloader--${state}`} aria-hidden="true">
      <span className="preloader__mark">M</span>
      <span className="preloader__word">{siteConfig.brand.short}</span>
      <span className="preloader__bar"><span /></span>
    </div>
  );
}
