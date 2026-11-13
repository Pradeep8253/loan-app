"use client";
/**
 * PlUseCases — expense scenarios as a compact tile grid with direct enquiry links.
 */
import { HeartPulse, Plane, Sparkles, Hammer, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import { useEnquiry } from "@/context/EnquiryContext";
import "./PlUseCases.css";

const CASES = [
  { key: "medical", icon: HeartPulse, title: "Hospital bills", body: "Clear the bill now, repay over 12–36 months.", amount: "₹50K – ₹5L" },
  { key: "travel", icon: Plane, title: "Travel bookings", body: "Flights and stays without draining savings.", amount: "₹1L – ₹4L" },
  { key: "wedding", icon: Sparkles, title: "Wedding costs", body: "Venue, catering and travel on one EMI.", amount: "₹2L – ₹10L" },
  { key: "renovation", icon: Hammer, title: "Home upgrades", body: "Match the loan to contractor milestones.", amount: "₹1L – ₹8L" },
];

export default function PlUseCases() {
  const { openEnquiry } = useEnquiry();
  return (
    <section className="pl-uc section section--sky" aria-labelledby="pl-uc-title">
      <div className="container">
        <SectionHeading id="pl-uc-title" eyebrow="What it covers" title="Four reasons, four structures." mark={["structures"]} lede="The purpose changes the amount, the tenure and sometimes the lender. Say what the money is for on the call." />
        <div className="pl-uc__grid">
          {CASES.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.key} variant="up" delay={i * 70}>
                <button type="button" className="pl-uc__tile" onClick={() => openEnquiry({ service: "personal-loan", source: `pl.usecase.${c.key}` })}>
                  <span className="pl-uc__icon" aria-hidden="true"><Icon size={22} /></span>
                  <span className="pl-uc__title">{c.title}</span>
                  <span className="pl-uc__body">{c.body}</span>
                  <span className="pl-uc__amount">{c.amount}</span>
                  <span className="pl-uc__cta">Enquire <ArrowRight aria-hidden="true" size={15} /></span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
