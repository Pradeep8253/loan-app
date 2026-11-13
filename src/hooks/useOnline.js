"use client";
/**
 * useOnline — network status with an outbox flush on reconnect.
 */
import { useEffect, useState } from "react";
import { flushOutbox } from "@/lib/leadOutbox";

export default function useOnline({ flush = true } = {}) {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
    const goOnline = () => {
      setOnline(true);
      if (flush) flushOutbox().catch(() => {});
    };
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, [flush]);

  return online;
}
