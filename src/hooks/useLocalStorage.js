"use client";
/**
 * useLocalStorage — SSR-safe persisted state. Reads after mount to avoid hydration drift.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { safeGet, safeSet } from "@/lib/storage";

export default function useLocalStorage(key, initialValue, store = "local") {
  const [value, setValue] = useState(initialValue);
  const [hydrated, setHydrated] = useState(false);
  const keyRef = useRef(key);

  useEffect(() => {
    setValue(safeGet(keyRef.current, initialValue, store));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyRef.current]);

  const update = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next;
        safeSet(keyRef.current, resolved, store);
        return resolved;
      });
    },
    [store]
  );

  return [value, update, hydrated];
}
