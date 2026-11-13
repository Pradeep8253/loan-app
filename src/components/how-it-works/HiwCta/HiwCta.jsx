"use client";
/**
 * HiwCta — closing conversion for the process page: three service entry points
 * instead of one generic button.
 */
import Link from "next/link";
import { ArrowRight, Wallet, RefreshCw, Home as HomeIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal/Reveal";
import Button from "@/components/ui/Button/Button";
import { useEnquiry } from "@/context/EnquiryContext";
import "./HiwCta.css";

const DOORS = [
  { service: "personal-loan", icon: Wallet, label: "Personal loan", body: "Fastest route. Typically a decision in 24 hours." },
  { service: "overdraft", icon: RefreshCw, label: "Overdraft", body: "For repeating gaps and seasonal cash flow." },
  { service: "home-loan", icon: HomeIcon, label: "Home loan", body: "Start with pre-approval before you shortlist." },
];

export default function HiwCta() {
  const { openEnquiry } = useEnquiry();
  return (
    <section className="hiw-cta section section--sky" aria-labelledby="hiw-cta-title">
      <div className="container">
        <Reveal variant="up" className="hiw-cta__head">
          <p className="eyebrow eyebrow--teal">Step one</p>
          <h2 id="hiw-cta-title" className="hiw-cta__title">Pick your door. The advisor does the rest.</h2>
        </Reveal>
        <div className="hiw-cta__doors">
          {DOORS.map((d, i) => {
            const Icon = d.icon;
            return (
              <Reveal key={d.service} variant="up" delay={i * 70}>
                <button type="button" className="hiw-cta__door" onClick={() => openEnquiry({ service: d.service, source: "hiw.final" })}>
                  <span className="hiw-cta__door-icon" aria-hidden="true"><Icon size={22} /></span>
                  <span className="hiw-cta__door-label">{d.label}</span>
                  <span className="hiw-cta__door-body">{d.body}</span>
                  <span className="hiw-cta__door-arrow"><ArrowRight aria-hidden="true" size={18} /></span>
                </button>
              </Reveal>
            );
          })}
        </div>
        <div className="hiw-cta__alt">
          <span>Prefer a form?</span>
          <Button href="/apply" variant="outline" size="md" rightIcon={false}>Open the full application</Button>
          <Link href="/contact" className="hiw-cta__link">Or call the desk directly <ArrowRight aria-hidden="true" size={15} /></Link>
        </div>
      </div>
    </section>
  );
}
