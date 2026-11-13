"use client";
/**
 * PlCta — mid-page conversion panel for the personal loan page. Distinct layout:
 * a horizontal rate ticker + inline enquiry trigger, no form.
 */
import { ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import Button from "@/components/ui/Button/Button";
import Reveal from "@/components/ui/Reveal/Reveal";
import { useEnquiry } from "@/context/EnquiryContext";
import "./PlCta.css";

export default function PlCta() {
  const { openEnquiry } = useEnquiry();
  return (
    <section className="pl-cta" aria-labelledby="pl-cta-title">
      <div className="container pl-cta__inner">
        <Reveal variant="up" className="pl-cta__copy">
          <p className="pl-cta__kicker">Eligibility check · no credit pull</p>
          <h2 id="pl-cta-title" className="pl-cta__title">Know your realistic range in one call.</h2>
        </Reveal>
        <Reveal variant="up" delay={100} className="pl-cta__actions">
          <Button variant="primary" size="lg" onClick={() => openEnquiry({ service: "personal-loan", source: "pl.midcta" })} icon={<WhatsAppIcon size={20} />} rightIcon={false}>
            Start with a WhatsApp check
          </Button>
          <Button variant="ghost-light" size="lg" href="/eligibility" rightIcon>
            Use the calculator <ArrowRight aria-hidden="true" size={18} />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
