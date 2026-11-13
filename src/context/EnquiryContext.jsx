"use client";
/**
 * EnquiryContext — opens the global enquiry sheet/modal pre-filled with a service,
 * and remembers the last enquiry reference for the thank-you state.
 */
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useShell } from "./ShellContext";

const EnquiryContext = createContext(null);

export function EnquiryProvider({ children }) {
  const { openSheet } = useShell();
  const [lastResult, setLastResult] = useState(null);
  const [prefill, setPrefill] = useState({});

  const openEnquiry = useCallback(
    (options = {}) => {
      setPrefill(options);
      openSheet("enquiry", options);
    },
    [openSheet]
  );

  const value = useMemo(() => ({ openEnquiry, prefill, lastResult, setLastResult }), [openEnquiry, prefill, lastResult]);

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside EnquiryProvider");
  return ctx;
}
