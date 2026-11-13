"use client";
/**
 * PlHero — personal loan masthead: product facts, CTA pair and a rate card aside.
 */
import { CheckCircle2, Clock3, FileText } from "lucide-react";
import PageHero from "@/components/ui/PageHero/PageHero";
import SmartImage from "@/components/ui/SmartImage/SmartImage";
import Button from "@/components/ui/Button/Button";
import { useEnquiry } from "@/context/EnquiryContext";
import "./PlHero.css";

const FACTS = [
  { label: "Amount", value: "₹25,000 – ₹25L" },
  { label: "Tenure", value: "12 – 60 months" },
  { label: "Rate from", value: "10.99% p.a." },
  { label: "Documents", value: "4 usual" },
];

export default function PlHero() {
  const { openEnquiry } = useEnquiry();
  return (
    <PageHero
      eyebrow="Personal Loan"
      title="A personal loan that respects your time."
      lede="For planned expenses with a fixed repayment: medical bills, travel, a wedding, a renovation. We structure the amount and tenure around your take-home, then shortlist the partners most likely to say yes."
      tone="sky"
      actions={
        <>
          <Button size="lg" onClick={() => openEnquiry({ service: "personal-loan", source: "pl.hero" })}>
            Check my options
          </Button>
          <Button href="/emi-calculator" variant="outline" size="lg" rightIcon={false}>
            Calculate the EMI
          </Button>
        </>
      }
      facts={FACTS}
      aside={
        <div className="pl-hero__card">
          <SmartImage slot="service.personal" ratio="16 / 10" priority sizes="(max-width: 899px) 92vw, 480px" />
          <div className="pl-hero__card-body">
            <p className="pl-hero__card-kicker">Why profiles get declined</p>
            <ul className="pl-hero__card-list">
              <li><CheckCircle2 aria-hidden="true" size={16} /> Card utilisation above 60%</li>
              <li><CheckCircle2 aria-hidden="true" size={16} /> Three or more active loans</li>
              <li><CheckCircle2 aria-hidden="true" size={16} /> Salary credited in cash</li>
            </ul>
            <p className="pl-hero__card-foot">
              <Clock3 aria-hidden="true" size={15} /> We tell you before you apply, not after.
            </p>
          </div>
        </div>
      }
    />
  );
}
