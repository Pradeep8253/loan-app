"use client";
/**
 * BottomNav — 64px + safe-area app tab bar: Home · Services · Apply (raised) · Track · Chat.
 * Hidden on /apply and /team, and on desktop where floating actions take over.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, FilePlus2, Search } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import { useShell } from "@/context/ShellContext";
import { useEnquiry } from "@/context/EnquiryContext";
import { siteConfig } from "@/lib/siteConfig";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { haptic } from "@/lib/haptics";
import { trackEvent } from "@/lib/analytics";
import "./BottomNav.css";

export default function BottomNav() {
  const pathname = usePathname();
  const { openSheet, currentService } = useShell();
  const { openEnquiry } = useEnquiry();

  if (pathname === "/apply" || pathname.startsWith("/team")) return null;

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const whatsappUrl = buildWhatsAppUrl({
    template: "general",
    params: { serviceLabel: currentService ? siteConfig.serviceLabels[currentService] : "" },
  });

  return (
    <nav className="bnav" aria-label="Primary">
      <div className="bnav__inner">
        <Link href="/" className={`bnav__tab ${isActive("/") ? "is-active" : ""}`} aria-current={isActive("/") ? "page" : undefined}>
          <span className="bnav__pill"><Home aria-hidden="true" size={22} /></span>
          <span className="bnav__label">Home</span>
        </Link>
        <button type="button" className="bnav__tab" onClick={() => openSheet("services")}>
          <span className="bnav__pill"><LayoutGrid aria-hidden="true" size={22} /></span>
          <span className="bnav__label">Services</span>
        </button>
        <button
          type="button"
          className="bnav__apply"
          onClick={() => {
            haptic(10);
            openEnquiry({ service: currentService, source: "nav.mobile.apply" });
          }}
          aria-label="Apply — open enquiry form"
        >
          <FilePlus2 aria-hidden="true" size={24} />
          <span className="bnav__apply-label">Apply</span>
        </button>
        <Link href="/track-application" className={`bnav__tab ${isActive("/track-application") ? "is-active" : ""}`} aria-current={isActive("/track-application") ? "page" : undefined}>
          <span className="bnav__pill"><Search aria-hidden="true" size={22} /></span>
          <span className="bnav__label">Track</span>
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bnav__tab bnav__tab--wa"
          onClick={() => {
            haptic(8);
            trackEvent("whatsapp_click", { source: "nav.mobile.whatsapp", service: currentService });
          }}
          aria-label="Chat on WhatsApp"
        >
          <span className="bnav__pill bnav__pill--wa"><WhatsAppIcon size={22} /></span>
          <span className="bnav__label">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
