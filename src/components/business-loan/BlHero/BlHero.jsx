"use client";
/**
 * BlHero — business loan masthead with a use-of-funds selector that prefills the enquiry.
 */
import { useState } from "react";
import { Truck, Factory, Store, Wrench } from "lucide-react";
import PageHero from "@/components/ui/PageHero/PageHero";
import Button from "@/components/ui/Button/Button";
import { useEnquiry } from "@/context/EnquiryContext";
import "./BlHero.css";

const USES = [
  { key: "working-capital", icon: Truck, label: "Working capital", body: "Inventory, supplier advances and the gap between invoice and payment." },
  { key: "machinery", icon: Factory, label: "Machinery", body: "Equipment finance with the asset as security and a longer tenure." },
  { key: "expansion", icon: Store, label: "New outlet", body: "Deposit, fit-out and licence costs for a second location." },
  { key: "services", icon: Wrench, label: "Services business", body: "Tools, hiring and receivables cover for a service firm." },
];

export default function BlHero() {
  const [use, setUse] = useState("working-capital");
  const { openEnquiry } = useEnquiry();
  const active = USES.find((u) => u.key === use);

  return (
    <PageHero
      eyebrow="Business Loan"
      title="Working capital that understands invoices."
      lede="Orders arrive before payments do. A business loan bridges that gap — assessed on GST, banking and real cash flow rather than a salaried template that never fit you."
      tone="navy"
      actions={
        <>
          <Button size="lg" onClick={() => openEnquiry({ service: "business-loan", source: "bl.hero", message: `Use of funds: ${active.label}` })}>
            Discuss my requirement
          </Button>
          <Button href="/overdraft" variant="ghost-light" size="lg" rightIcon={false}>
            Compare with overdraft
          </Button>
        </>
      }
      aside={
        <div className="bl-hero__panel">
          <p className="bl-hero__panel-title">What is the money for?</p>
          <div className="bl-hero__uses">
            {USES.map((u) => {
              const Icon = u.icon;
              return (
                <button key={u.key} type="button" className={`bl-hero__use ${use === u.key ? "is-active" : ""}`} onClick={() => setUse(u.key)} aria-pressed={use === u.key}>
                  <Icon aria-hidden="true" size={18} />
                  <span>{u.label}</span>
                </button>
              );
            })}
          </div>
          <p className="bl-hero__detail">{active.body}</p>
          <p className="bl-hero__note">This choice is carried into your enquiry — the advisor arrives prepared.</p>
        </div>
      }
      facts={[
        { label: "Amount", value: "₹1L – ₹50L" },
        { label: "Tenure", value: "12 – 84 mo" },
        { label: "Rate from", value: "13.99% p.a." },
        { label: "Decision", value: "~24 hours" },
      ]}
    />
  );
}
