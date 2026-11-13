"use client";
/**
 * Tabs — scroll-snap chip tabs on mobile with the active chip scrolled into view,
 * swipeable panels on touch, and an underline indicator on desktop.
 */
import { useEffect, useRef, useState } from "react";
import "./Tabs.css";

export default function Tabs({ items, defaultIndex = 0, label = "Sections", variant = "chips", onChange }) {
  const [active, setActive] = useState(defaultIndex);
  const listRef = useRef(null);
  const startX = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    const chip = list?.querySelector(`[data-tab-index="${active}"]`);
    if (list && chip) {
      const offset = chip.offsetLeft - list.clientWidth / 2 + chip.clientWidth / 2;
      list.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
    }
    if (onChange) onChange(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) < 56) return;
    const next = dx < 0 ? Math.min(items.length - 1, active + 1) : Math.max(0, active - 1);
    setActive(next);
  };

  return (
    <div className={`tabs tabs--${variant}`}>
      <div className="tabs__list" role="tablist" aria-label={label} ref={listRef}>
        {items.map((item, i) => (
          <button
            key={item.id || i}
            type="button"
            role="tab"
            id={`tab-${label.replace(/\s+/g, "-").toLowerCase()}-${i}`}
            aria-selected={active === i}
            aria-controls={`panel-${label.replace(/\s+/g, "-").toLowerCase()}-${i}`}
            tabIndex={active === i ? 0 : -1}
            data-tab-index={i}
            className={`tabs__chip ${active === i ? "is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        className="tabs__panels"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {items.map((item, i) => (
          <div
            key={item.id || i}
            role="tabpanel"
            id={`panel-${label.replace(/\s+/g, "-").toLowerCase()}-${i}`}
            aria-labelledby={`tab-${label.replace(/\s+/g, "-").toLowerCase()}-${i}`}
            className={`tabs__panel ${active === i ? "is-active" : ""}`}
            hidden={active !== i}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
