"use client";
/**
 * Sheet — ONE primitive for every dialog: a draggable bottom sheet on mobile
 * and a centred modal on desktop, with backdrop, focus trap and scroll lock.
 */
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import useMediaQuery from "@/hooks/useMediaQuery";
import useFocusTrap from "@/hooks/useFocusTrap";
import useSheetDrag from "@/hooks/useSheetDrag";
import { haptic } from "@/lib/haptics";
import "./Sheet.css";

export default function Sheet({ open, onClose, title, description, children, size = "md", labelledBy, footer = null }) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const panelRef = useRef(null);
  const { offset, handlers } = useSheetDrag(() => {
    haptic(6);
    onClose?.();
  });

  useFocusTrap(panelRef, open);

  // Render during the exit animation, then unmount so nothing sits in the layout.
  const [mounted, setMounted] = useState(open);
  useEffect(() => {
    if (open) {
      setMounted(true);
      return undefined;
    }
    const t = window.setTimeout(() => setMounted(false), 220);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!mounted || typeof document === "undefined") return null;

  const titleId = labelledBy || "sheet-title";

  return createPortal(
    <div className={`sheet ${isMobile ? "sheet--bottom" : "sheet--center"} ${open ? "is-open" : "is-closing"}`} role="presentation">
      <button type="button" className="sheet__backdrop" aria-label="Close dialog" onClick={onClose} tabIndex={-1} />
      <div
        className={`sheet__panel sheet__panel--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? "sheet-desc" : undefined}
        ref={panelRef}
        style={isMobile && offset ? { transform: `translateY(${offset}px)` } : undefined}
      >
        {isMobile ? (
          <div className="sheet__grab" aria-hidden="true" {...handlers}>
            <span className="sheet__handle" />
          </div>
        ) : null}
        <div className="sheet__head">
          <div>
            {title ? <h2 className="sheet__title" id={titleId}>{title}</h2> : null}
            {description ? <p className="sheet__desc" id="sheet-desc">{description}</p> : null}
          </div>
          <button type="button" className="sheet__close" onClick={onClose} aria-label="Close dialog">
            <X aria-hidden="true" size={22} />
          </button>
        </div>
        <div className="sheet__body">{children}</div>
        {footer ? <div className="sheet__footer">{footer}</div> : null}
      </div>
    </div>,
    document.body
  );
}
