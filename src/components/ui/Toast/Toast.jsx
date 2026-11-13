"use client";
/**
 * Toast — native-style snackbars stacked above the bottom navigation.
 */
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import { useShell } from "@/context/ShellContext";
import "./Toast.css";

const ICONS = { success: CheckCircle2, info: Info, error: AlertTriangle };

export default function ToastHost() {
  const { toasts, dismissToast } = useShell();

  return (
    <div className="toasts" aria-live="polite" aria-atomic="false">
      {toasts.map((t) => {
        const Icon = ICONS[t.tone] || Info;
        return (
          <div className={`toast toast--${t.tone}`} key={t.id} role="status">
            <Icon aria-hidden="true" size={20} className="toast__icon" />
            <p>{t.message}</p>
            <button type="button" className="toast__close" onClick={() => dismissToast(t.id)} aria-label="Dismiss notification">
              <X aria-hidden="true" size={18} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
