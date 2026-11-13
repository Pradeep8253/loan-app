"use client";
/**
 * MegaMenu — desktop services dropdown panel with icons, blurbs and a CTA rail.
 */
import Link from "next/link";
import { Wallet, RefreshCw, Home, Briefcase, ArrowLeftRight, ArrowRight } from "lucide-react";
import { services } from "@/lib/data/services";
import IconTile from "@/components/ui/IconTile/IconTile";
import { useEnquiry } from "@/context/EnquiryContext";
import "./MegaMenu.css";

const ICONS = { Wallet, RefreshCw, Home, Briefcase, ArrowLeftRight };

export default function MegaMenu({ onNavigate }) {
  const { openEnquiry } = useEnquiry();
  return (
    <div className="mega" role="menu" aria-label="Loan services">
      <div className="mega__grid">
        <div className="mega__list">
          {services.map((s) => {
            const Icon = ICONS[s.icon] || Wallet;
            return (
              <Link key={s.key} href={s.href} className="mega__item" role="menuitem" onClick={onNavigate}>
                <IconTile tone={s.key === "personal-loan" || s.key === "overdraft" ? "navy" : "sky"} size="sm">
                  <Icon size={18} />
                </IconTile>
                <span>
                  <span className="mega__name">
                    {s.name}
                    {s.key === "personal-loan" || s.key === "overdraft" ? <em className="mega__flag">Popular</em> : null}
                  </span>
                  <span className="mega__blurb">{s.blurb}</span>
                </span>
              </Link>
            );
          })}
        </div>
        <div className="mega__rail">
          <p className="mega__rail-title">Not sure which fits?</p>
          <p className="mega__rail-body">Two minutes on chat and an advisor will shortlist the right product for your profile.</p>
          <button
            type="button"
            className="mega__rail-cta"
            onClick={() => {
              onNavigate?.();
              openEnquiry({ source: "navbar.megamenu" });
            }}
          >
            Talk to an advisor <ArrowRight aria-hidden="true" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
