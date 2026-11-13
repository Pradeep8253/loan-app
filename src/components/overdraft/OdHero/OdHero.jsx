"use client";
/**
 * OdHero — overdraft masthead with a live "utilisation vs EMI" comparison widget.
 */
import { useState } from "react";
import { ArrowRight, RefreshCw } from "lucide-react";
import PageHero from "@/components/ui/PageHero/PageHero";
import Button from "@/components/ui/Button/Button";
import Slider from "@/components/ui/Slider/Slider";
import { calculateEMI } from "@/lib/emi";
import { formatINR } from "@/lib/format";
import { useEnquiry } from "@/context/EnquiryContext";
import "./OdHero.css";

export default function OdHero() {
  const [used, setUsed] = useState(300000);
  const { openEnquiry } = useEnquiry();
  const limit = 500000;
  const odInterest = (used * 0.125) / 12;
  const loanEmi = calculateEMI(limit, 12.5, 36);

  return (
    <PageHero
      eyebrow="Overdraft facility"
      title="Borrow the gap. Not the whole year."
      lede="An overdraft is a sanctioned limit you draw from as needed. Interest is charged only on the amount you use, for the days you use it — which makes it the right tool for uneven cash flow."
      tone="white"
      actions={
        <>
          <Button size="lg" onClick={() => openEnquiry({ service: "overdraft", source: "od.hero" })}>
            Check overdraft fit
          </Button>
          <Button href="/contact" variant="outline" size="lg" rightIcon={false}>
            Talk to a specialist
          </Button>
        </>
      }
      facts={[
        { label: "Limit", value: "₹50K – ₹10L" },
        { label: "Rate from", value: "12.50% p.a." },
        { label: "Structure", value: "Revolving" },
        { label: "Review", value: "Annual" },
      ]}
      aside={
        <div className="od-hero__widget">
          <p className="od-hero__widget-head"><RefreshCw aria-hidden="true" size={18} /> Compare: OD vs term loan</p>
          <p className="od-hero__widget-sub">Assume a ₹5,00,000 limit, but only ₹{formatINR(used).replace("₹", "")} is actually used this month.</p>
          <Slider id="od-used" label="Amount used this month" value={used} min={50000} max={limit} step={10000} onChange={(e) => setUsed(Number(e.target.value))} />
          <div className="od-hero__compare">
            <div className="od-hero__compare-card od-hero__compare-card--teal">
              <span>Overdraft interest / month</span>
              <strong>{formatINR(odInterest)}</strong>
            </div>
            <div className="od-hero__compare-card">
              <span>Term loan EMI (full ₹5L)</span>
              <strong>{formatINR(loanEmi)}</strong>
            </div>
          </div>
          <p className="od-hero__widget-note">Illustration only. Actual interest is computed daily on the drawn balance.</p>
          <button type="button" className="od-hero__widget-cta" onClick={() => openEnquiry({ service: "overdraft", source: "od.hero.widget" })}>
            Discuss this limit <ArrowRight aria-hidden="true" size={16} />
          </button>
        </div>
      }
    />
  );
}
