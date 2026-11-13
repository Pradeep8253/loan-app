"use client";
/**
 * useApplications — the single client-side source of demo application records.
 * Seeds from sampleApplications on first read, merges locally-created leads and
 * application drafts so the dashboard reflects what the visitor just did, and
 * persists every status/note edit back to localStorage.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { sampleApplications } from "@/lib/data/sampleApplications";
import { STORAGE_KEYS, safeGet, safeSet } from "@/lib/storage";

function readList(key) {
  const raw = safeGet(key, null);
  return Array.isArray(raw) ? raw : [];
}

function fromLead(lead) {
  return {
    reference: lead.reference,
    name: lead.from_name || "Unnamed enquiry",
    mobile: lead.mobile || "",
    email: lead.email || "",
    service: lead.service || "personal-loan",
    amount: Number(lead.loan_amount) || 0,
    city: lead.city || "",
    status: "received",
    stage: "received",
    owner: "Unassigned",
    created: lead.created || new Date().toISOString(),
    updated: lead.created || new Date().toISOString(),
    source: lead.source || "site",
    documents: [],
    notes: lead.summary ? [{ at: lead.created || new Date().toISOString(), by: "System", text: lead.summary }] : [],
    local: true,
  };
}

export default function useApplications() {
  const [overrides, setOverrides] = useState(null);
  const [extra, setExtra] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = safeGet(STORAGE_KEYS.applications, null);
    if (stored && typeof stored === "object") setOverrides(stored.updates || {});
    else setOverrides({});
    const leads = readList(STORAGE_KEYS.leads).map(fromLead).filter((l) => l.reference);
    setExtra(leads);
    setReady(true);
  }, []);

  const base = useMemo(() => {
    const merged = [...sampleApplications, ...extra];
    const seen = new Set();
    return merged.filter((a) => (seen.has(a.reference) ? false : seen.add(a.reference)));
  }, [extra]);

  const applications = useMemo(() => {
    if (!overrides) return base;
    return base.map((a) => {
      const o = overrides[a.reference];
      if (!o) return a;
      return { ...a, status: o.status ?? a.status, stage: o.stage ?? a.stage, updated: o.updated ?? a.updated, notes: o.notes ?? a.notes, owner: o.owner ?? a.owner };
    });
  }, [base, overrides]);

  const persist = useCallback((next) => {
    setOverrides(next);
    safeSet(STORAGE_KEYS.applications, { updates: next, savedAt: new Date().toISOString() });
  }, []);

  const setStatus = useCallback(
    (ref, status) => {
      const current = overrides || {};
      const existing = current[ref] || {};
      persist({ ...current, [ref]: { ...existing, status, stage: status, updated: new Date().toISOString() } });
    },
    [overrides, persist]
  );

  const addNote = useCallback(
    (ref, text, by = "You (demo)") => {
      const current = overrides || {};
      const existing = current[ref] || {};
      const list = existing.notes || base.find((a) => a.reference === ref)?.notes || [];
      persist({ ...current, [ref]: { ...existing, notes: [...list, { at: new Date().toISOString(), by, text }], updated: new Date().toISOString() } });
    },
    [overrides, persist, base]
  );

  const reset = useCallback(() => {
    setOverrides({});
    safeSet(STORAGE_KEYS.applications, { updates: {}, savedAt: new Date().toISOString() });
  }, []);

  return { applications, ready, setStatus, addNote, reset };
}
