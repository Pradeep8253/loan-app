"use client";
/**
 * ScrollProgress — 3px amber progress bar pinned to the very top of the viewport.
 */
import useScrollProgress from "@/hooks/useScrollProgress";
import "./ScrollProgress.css";

export default function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="scroll-progress" aria-hidden="true">
      <span className="scroll-progress__bar" style={{ "--p": progress }} />
    </div>
  );
}
