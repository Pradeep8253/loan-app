"use client";
/**
 * HlHero — home loan masthead with a purchase/construction/renovation switch and
 * a documentary-style aside image.
 */
import { useState } from "react";
import { Home, HardHat, PaintRoller } from "lucide-react";
import PageHero from "@/components/ui/PageHero/PageHero";
import Button from "@/components/ui/Button/Button";
import SmartImage from "@/components/ui/SmartImage/SmartImage";
import { useEnquiry } from "@/context/EnquiryContext";
import "./HlHero.css";

const PATHS = [
  { key: "purchase", label: "Buying", icon: Home, line: "Sale agreement, down payment and registration." },
  { key: "construction", label: "Building", icon: HardHat, line: "Approved plan, staged disbursal, engineer certificate." },
  { key: "renovation", label: "Renovating", icon: PaintRoller, line: "Quotations, valuation and milestone releases." },
];

export default function HlHero() {
  const [path, setPath] = useState("purchase");
  const { openEnquiry } = useEnquiry();
  const active = PATHS.find((p) => p.key === path);

  return (
    <PageHero
      eyebrow="Home Loan"
      title="A 20-year decision deserves better paperwork."
      lede="Purchase, construction or renovation — the lender's checklist is long, and the order matters. We coordinate the legal, technical and income verification so one missed document does not restart the clock."
      tone="sky"
      actions={
        <>
          <Button size="lg" onClick={() => openEnquiry({ service: "home-loan", source: "hl.hero" })}>
            Start a home loan enquiry
          </Button>
          <Button href="/eligibility" variant="outline" size="lg" rightIcon={false}>
            Check my eligibility
          </Button>
        </>
      }
      aside={
        <div className="hl-hero__aside">
          <SmartImage slot="service.home" ratio="5 / 4" priority sizes="(max-width: 899px) 92vw, 460px" frame frameTone="teal" />
          <div className="hl-hero__picker">
            <div className="hl-hero__tabs" role="tablist" aria-label="Type of home loan">
              {PATHS.map((p) => {
                const Icon = p.icon;
                return (
                  <button key={p.key} type="button" role="tab" aria-selected={path === p.key} className={`hl-hero__tab ${path === p.key ? "is-active" : ""}`} onClick={() => setPath(p.key)}>
                    <Icon aria-hidden="true" size={16} /> {p.label}
                  </button>
                );
              })}
            </div>
            <p className="hl-hero__hint">{active.line}</p>
          </div>
        </div>
      }
      facts={[
        { label: "Amount", value: "₹5L – ₹2Cr" },
        { label: "Tenure", value: "Up to 30 yrs" },
        { label: "Rate from", value: "8.35% p.a." },
        { label: "Valuation", value: "48 hours" },
      ]}
    />
  );
}
