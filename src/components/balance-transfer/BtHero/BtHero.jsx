"use client";
/**
 * BtHero — balance transfer masthead with an inline savings estimator (rate + tenure
 * inputs, live savings figure) as the aside.
 */
import { useState } from "react";
import PageHero from "@/components/ui/PageHero/PageHero";
import Button from "@/components/ui/Button/Button";
import Slider from "@/components/ui/Slider/Slider";
import { calculateEMI } from "@/lib/emi";
import { formatINR } from "@/lib/format";
import { useEnquiry } from "@/context/EnquiryContext";
import "./BtHero.css";

export default function BtHero() {
  const [outstanding, setOutstanding] = useState(800000);
  const [currentRate, setCurrentRate] = useState(16);
  const [newRate, setNewRate] = useState(11.5);
  const [months, setMonths] = useState(36);
  const { openEnquiry } = useEnquiry();

  const oldEmi = calculateEMI(outstanding, currentRate, months);
  const newEmi = calculateEMI(outstanding, newRate, months);
  const saving = Math.max(0, (oldEmi - newEmi) * months);
  const monthly = Math.max(0, oldEmi - newEmi);

  return (
    <PageHero
      eyebrow="Loan Balance Transfer"
      title="Move the loan. Keep the house."
      lede="If your existing loan rate no longer reflects your profile, a transfer or consolidation can cut the rate, the tenure, or both. We compare the real cost after fees — not just the headline rate."
      tone="white"
      actions={
        <>
          <Button size="lg" onClick={() => openEnquiry({ service: "loan-balance-transfer", source: "bt.hero" })}>
            Run my transfer numbers
          </Button>
          <Button href="/emi-calculator" variant="outline" size="lg" rightIcon={false}>
            Open EMI calculator
          </Button>
        </>
      }
      facts={[
        { label: "Eligibility", value: "12+ clean EMIs" },
        { label: "Savings guide", value: "0.75%+ rate gap" },
        { label: "Time", value: "2–4 weeks" },
        { label: "Includes", value: "Home, personal, auto" },
      ]}
      aside={
        <div className="bt-hero__calc">
          <p className="bt-hero__calc-title">Quick transfer estimate</p>
          <Slider id="bt-out" label="Outstanding balance" value={outstanding} min={100000} max={5000000} step={50000} onChange={(e) => setOutstanding(Number(e.target.value))} />
          <Slider id="bt-cur" label="Current rate (p.a.)" value={currentRate} min={8} max={24} step={0.25} format="number" suffix="%" onChange={(e) => setCurrentRate(Number(e.target.value))} />
          <Slider id="bt-new" label="New rate (p.a.)" value={newRate} min={8} max={24} step={0.25} format="number" suffix="%" onChange={(e) => setNewRate(Number(e.target.value))} />
          <Slider id="bt-months" label="Remaining tenure" value={months} min={12} max={120} step={6} format="number" suffix=" mo" onChange={(e) => setMonths(Number(e.target.value))} />
          <div className="bt-hero__result">
            <div>
              <span>Monthly EMI change</span>
              <strong>{formatINR(monthly)}</strong>
            </div>
            <div>
              <span>Lifetime interest saved</span>
              <strong>{formatINR(saving)}</strong>
            </div>
          </div>
          <p className="bt-hero__foot">Before fees and foreclosure charges. The advisor adds those before you decide.</p>
        </div>
      }
    />
  );
}
