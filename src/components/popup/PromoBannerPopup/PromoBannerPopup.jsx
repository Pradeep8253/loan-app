"use client";
/**
 * PromoBannerPopup — dismissible offer card after a delay on the first visit.
 * Suppressed for the rest of the session; desktop modal and mobile sheet.
 */
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BadgePercent, Clock } from "lucide-react";
import Sheet from "@/components/ui/Sheet/Sheet";
import Button from "@/components/ui/Button/Button";
import EnquiryForm from "@/components/popup/EnquiryForm/EnquiryForm";
import SmartImage from "@/components/ui/SmartImage/SmartImage";
import { useShell } from "@/context/ShellContext";
import { safeGetWithExpiry, safeSetWithExpiry, STORAGE_KEYS } from "@/lib/storage";
import "./PromoBannerPopup.css";

const ONE_DAY = 24 * 60 * 60 * 1000;

const EXCLUDED = ["/apply", "/track-application", "/privacy-terms", "/grievance"];

export default function PromoBannerPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("offer"); // offer | form
  const { toast } = useShell();

  useEffect(() => {
    if (EXCLUDED.some((p) => pathname.startsWith(p))) return undefined;
    if (safeGetWithExpiry(STORAGE_KEYS.popupSeen, false, "session")) return undefined;
    let timer;
    const onIdle = () => {
      if (timer) return;
      timer = window.setTimeout(() => setOpen(true), 4000);
    };
    // Wait for the visitor to actually engage — scrolling or pointing — so the
    // promo never lands in the middle of their first read.
    window.addEventListener("scroll", onIdle, { passive: true, once: true });
    window.addEventListener("pointermove", onIdle, { passive: true, once: true });
    const fallback = window.setTimeout(onIdle, 30000);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(fallback);
      window.removeEventListener("scroll", onIdle);
      window.removeEventListener("pointermove", onIdle);
    };
  }, [pathname]);

  const close = (remember = true) => {
    setOpen(false);
    if (remember) {
      safeSetWithExpiry(STORAGE_KEYS.popupSeen, true, ONE_DAY, "session");
    }
  };

  return (
    <Sheet open={open} onClose={() => close(true)} title={step === "offer" ? "Compare before you commit" : "One last step"} size="md">
      {step === "offer" ? (
        <div className="promo">
          <SmartImage slot="popup.personal" ratio="21 / 9" sizes="(max-width: 767px) 92vw, 520px" className="promo__img" />
          <div className="promo__badges">
            <span className="promo__badge"><BadgePercent aria-hidden="true" size={16} /> From 10.99% p.a.</span>
            <span className="promo__badge promo__badge--teal"><Clock aria-hidden="true" size={16} /> Reply in 30 min</span>
          </div>
          <h3 className="promo__title">Three partner options, one honest comparison.</h3>
          <p className="promo__body">
            Personal loan enquiries get a written shortlist with rate, processing fee and total cost — before you sign anything.
          </p>
          <Button size="lg" block onClick={() => setStep("form")}>
            Show me my options
          </Button>
          <button type="button" className="promo__skip" onClick={() => close(true)}>
            No thanks, keep browsing
          </button>
        </div>
      ) : (
        <EnquiryForm
          compact
          prefill={{ service: "personal-loan", source: "popup.banner" }}
          onDone={() => {
            close(false);
            toast("Enquiry received — check WhatsApp for the confirmation.", "success");
          }}
          submitLabel="Send my enquiry"
        />
      )}
    </Sheet>
  );
}
