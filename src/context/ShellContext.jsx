"use client";
/**
 * ShellContext — global shell state: which sheet is open, toasts, install prompt
 * and the desktop/mobile navigation presentation.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const ShellContext = createContext(null);

let toastId = 0;

export function ShellProvider({ children }) {
  const [sheet, setSheet] = useState(null); // 'services' | 'more' | 'enquiry' | 'install'
  const [toasts, setToasts] = useState([]);
  const [currentService, setCurrentService] = useState("personal-loan");
  const scrollLockY = useRef(0);

  const openSheet = useCallback((name, meta = null) => {
    setSheet({ name, meta });
  }, []);

  const closeSheet = useCallback(() => setSheet(null), []);

  const toast = useCallback((message, tone = "info", duration = 3800) => {
    const id = ++toastId;
    setToasts((list) => [...list.slice(-2), { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((list) => list.filter((t) => t.id !== id));
    }, duration);
    return id;
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  // Scroll lock that preserves the scroll position.
  useEffect(() => {
    if (sheet) {
      scrollLockY.current = window.scrollY;
      document.body.classList.add("no-scroll");
      document.body.style.top = `-${scrollLockY.current}px`;
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.classList.remove("no-scroll");
      document.body.style.top = "";
      document.body.style.position = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollLockY.current);
    }
    return () => {
      document.body.classList.remove("no-scroll");
      document.body.style.top = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [sheet]);

  useEffect(() => {
    if (!sheet) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") closeSheet();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheet, closeSheet]);

  const value = useMemo(
    () => ({ sheet, openSheet, closeSheet, toasts, toast, dismissToast, currentService, setCurrentService }),
    [sheet, openSheet, closeSheet, toasts, toast, dismissToast, currentService]
  );

  return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>;
}

export function useShell() {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error("useShell must be used inside ShellProvider");
  return ctx;
}
