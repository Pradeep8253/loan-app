"use client";
/**
 * FloatingActions — quick WhatsApp, Call and back-to-top floating stack.
 * Floats comfortably above the mobile bottom navigation and sits in the
 * bottom-right corner on desktop.
 */
import { useEffect, useState } from "react";
import { ArrowUp, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import { useShell } from "@/context/ShellContext";
import { siteConfig } from "@/lib/siteConfig";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import "./FloatingActions.css";

export default function FloatingActions() {
  const [visible, setVisible] = useState(false);
  const { currentService } = useShell();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappUrl = buildWhatsAppUrl({
    template: "general",
    params: { serviceLabel: currentService ? siteConfig.serviceLabels[currentService] : "" },
  });

  return (
    <div className="float-actions" role="region" aria-label="Quick contact actions">
      {visible ? (
        <button
          type="button"
          className="float-actions__btn float-actions__top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          <ArrowUp aria-hidden="true" size={20} />
        </button>
      ) : null}
      <a
        href={`tel:${siteConfig.contact.phoneHref}`}
        className="float-actions__btn float-actions__call"
        aria-label={`Call ${siteConfig.contact.phoneDisplay}`}
        onClick={() => trackEvent("call_click", { source: "floating" })}
      >
        <Phone aria-hidden="true" size={20} />
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="float-actions__btn float-actions__wa"
        aria-label="Chat on WhatsApp"
        onClick={() => trackEvent("whatsapp_click", { source: "floating" })}
      >
        <WhatsAppIcon size={24} />
        <span className="float-actions__pulse" aria-hidden="true" />
      </a>
    </div>
  );
}
