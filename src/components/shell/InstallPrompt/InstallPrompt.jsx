"use client";
/**
 * InstallPrompt — captures beforeinstallprompt and offers a compact card after the
 * second page view. Dismissals are honoured for 14 days. iOS Safari gets instructions.
 */
import { useEffect, useState } from "react";
import { Download, X, Share } from "lucide-react";
import { useShell } from "@/context/ShellContext";
import { isIOS, isStandalone } from "@/lib/whatsapp";
import { safeGet, safeSet, safeSetWithExpiry, safeGetWithExpiry, STORAGE_KEYS } from "@/lib/storage";
import "./InstallPrompt.css";

const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState(null);
  const [show, setShow] = useState(false);
  const [iosHint, setIosHint] = useState(false);
  const { toast } = useShell();

  useEffect(() => {
    if (isStandalone()) return undefined;
    if (safeGetWithExpiry(STORAGE_KEYS.installDismissed, false)) return undefined;

    const views = (safeGet(STORAGE_KEYS.pageViews, 0, "session") || 0) + 1;
    safeSet(STORAGE_KEYS.pageViews, views, "session");

    const onPrompt = (e) => {
      e.preventDefault();
      setDeferred(e);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    const t = window.setTimeout(() => {
      if (views >= 2 && isIOS()) {
        setIosHint(true);
        setShow(true);
      }
    }, 2400);

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (!deferred) return;
    const views = safeGet(STORAGE_KEYS.pageViews, 0, "session") || 0;
    if (views >= 2) setShow(true);
  }, [deferred]);

  const dismiss = () => {
    setShow(false);
    safeSetWithExpiry(STORAGE_KEYS.installDismissed, true, FOURTEEN_DAYS);
  };

  const install = async () => {
    if (!deferred) return;
    deferred.prompt();
    const choice = await deferred.userChoice;
    if (choice.outcome === "accepted") toast("Mirvex is being added to your home screen.", "success");
    setDeferred(null);
    dismiss();
  };

  if (!show) return null;

  return (
    <div className="install" role="dialog" aria-label="Install Mirvex">
      <span className="install__icon" aria-hidden="true"><Download size={20} /></span>
      <div className="install__copy">
        <p className="install__title">Install Mirvex</p>
        {iosHint ? (
          <p className="install__body"><Share aria-hidden="true" size={14} /> Tap Share, then “Add to Home Screen”.</p>
        ) : (
          <p className="install__body">One tap to reopen your enquiry and track status.</p>
        )}
      </div>
      {!iosHint ? (
        <button type="button" className="install__cta" onClick={install}>Install</button>
      ) : null}
      <button type="button" className="install__close" onClick={dismiss} aria-label="Dismiss install prompt">
        <X aria-hidden="true" size={18} />
      </button>
    </div>
  );
}
