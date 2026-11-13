"use client";
/**
 * Navbar — desktop primary navigation with the services mega menu, tools and auth-less CTA.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Phone, HeadphonesIcon } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import MegaMenu from "@/components/shell/MegaMenu/MegaMenu";
import { siteConfig } from "@/lib/siteConfig";
import { useEnquiry } from "@/context/EnquiryContext";
import "./Navbar.css";

export default function Navbar() {
  const [mega, setMega] = useState(false);
  const pathname = usePathname();
  const wrapRef = useRef(null);
  const { openEnquiry } = useEnquiry();

  useEffect(() => setMega(false), [pathname]);

  useEffect(() => {
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setMega(false);
    };
    document.addEventListener("pointerdown", onClick);
    return () => document.removeEventListener("pointerdown", onClick);
  }, []);

  return (
    <div className="navbar">
      <div className="container navbar__inner">
        <Link href="/" className="navbar__brand" aria-label={`${siteConfig.brand.name} home`}>
          <span className="navbar__mark" aria-hidden="true">M</span>
          <span>
            <span className="navbar__word">{siteConfig.brand.short}</span>
            <span className="navbar__sub">Loan Assist</span>
          </span>
        </Link>

        <nav className="navbar__links" aria-label="Main">
          <div className="navbar__mega-wrap" ref={wrapRef}>
            <button
              type="button"
              className={`navbar__link ${pathname.includes("loan") || pathname === "/overdraft" ? "is-active" : ""}`}
              aria-expanded={mega}
              aria-haspopup="true"
              onClick={() => setMega((v) => !v)}
            >
              Services <ChevronDown aria-hidden="true" size={16} className={mega ? "rot" : ""} />
            </button>
            {mega ? <MegaMenu onNavigate={() => setMega(false)} /> : null}
          </div>
          <Link href="/how-it-works" className={`navbar__link ${pathname === "/how-it-works" ? "is-active" : ""}`}>How It Works</Link>
          <Link href="/emi-calculator" className={`navbar__link ${pathname === "/emi-calculator" ? "is-active" : ""}`}>EMI</Link>
          <Link href="/eligibility" className={`navbar__link ${pathname === "/eligibility" ? "is-active" : ""}`}>Eligibility</Link>
          <Link href="/track-application" className={`navbar__link ${pathname === "/track-application" ? "is-active" : ""}`}>Track</Link>
          <Link href="/contact" className={`navbar__link ${pathname === "/contact" ? "is-active" : ""}`}>Contact</Link>
        </nav>

        <div className="navbar__actions">
          <a href={`tel:${siteConfig.contact.phoneHref}`} className="navbar__call">
            <Phone aria-hidden="true" size={16} />
            <span>{siteConfig.contact.phoneDisplay}</span>
          </a>
          <Button size="sm" onClick={() => openEnquiry({ source: "navbar.desktop" })} icon={<HeadphonesIcon aria-hidden="true" size={16} />} rightIcon={false}>
            Get a callback
          </Button>
        </div>
      </div>
    </div>
  );
}
