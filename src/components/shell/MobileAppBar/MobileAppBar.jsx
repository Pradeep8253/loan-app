"use client";
/**
 * MobileAppBar — 56px solid navy top bar. Brand wordmark left, Call + Menu right.
 * Inner pages show a back chevron and page title. Hides on scroll-down.
 */
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, Phone, Menu } from "lucide-react";
import useScrollDirection from "@/hooks/useScrollDirection";
import { useShell } from "@/context/ShellContext";
import { siteConfig } from "@/lib/siteConfig";
import { trackEvent } from "@/lib/analytics";
import "./MobileAppBar.css";

const TITLES = {
  "/personal-loan": "Personal Loan",
  "/overdraft": "Overdraft",
  "/home-loan": "Home Loan",
  "/business-loan": "Business Loan",
  "/loan-balance-transfer": "Balance Transfer",
  "/how-it-works": "How It Works",
  "/emi-calculator": "EMI Calculator",
  "/eligibility": "Eligibility",
  "/track-application": "Track Application",
  "/apply": "Apply",
  "/about": "About",
  "/contact": "Contact",
  "/faq": "FAQ",
  "/privacy-terms": "Privacy & Terms",
  "/grievance": "Grievance",
  "/demo-scope": "Demo Scope",
};

export default function MobileAppBar() {
  const pathname = usePathname();
  const router = useRouter();
  const direction = useScrollDirection();
  const { openSheet } = useShell();
  const title = TITLES[pathname];
  const hidden = direction === "down" && !title;

  return (
    <header className={`appbar ${hidden ? "appbar--hidden" : ""}`}>
      <div className="appbar__inner">
        {title ? (
          <button type="button" className="appbar__icon appbar__back" onClick={() => router.back()} aria-label="Go back">
            <ChevronLeft aria-hidden="true" size={24} />
          </button>
        ) : (
          <Link href="/" className="appbar__brand" aria-label={`${siteConfig.brand.name} home`}>
            <span className="appbar__mark" aria-hidden="true">M</span>
            <span className="appbar__word">{siteConfig.brand.short}</span>
          </Link>
        )}
        {title ? <p className="appbar__title">{title}</p> : <span className="appbar__spacer" />}
        <div className="appbar__actions">
          <a
            href={`tel:${siteConfig.contact.phoneHref}`}
            className="appbar__icon"
            aria-label={`Call ${siteConfig.contact.phoneDisplay}`}
            onClick={() => trackEvent("call_click", { source: "appbar" })}
          >
            <Phone aria-hidden="true" size={20} />
          </a>
          <button type="button" className="appbar__icon" onClick={() => openSheet("more")} aria-label="Open menu">
            <Menu aria-hidden="true" size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
