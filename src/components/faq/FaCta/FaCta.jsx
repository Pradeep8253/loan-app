"use client";
/**
 * FaCta — closing support panel with three contact routes.
 */
import { Phone, FileQuestion } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import Reveal from "@/components/ui/Reveal/Reveal";
import { useEnquiry } from "@/context/EnquiryContext";
import { siteConfig } from "@/lib/siteConfig";
import "./FaCta.css";

export default function FaCta() {
  const { openEnquiry } = useEnquiry();
  return (
    <section className="fa-cta section section--sky" aria-labelledby="fa-cta-title">
      <div className="container fa-cta__inner">
        <Reveal variant="up" className="fa-cta__head">
          <FileQuestion aria-hidden="true" size={30} />
          <h2 id="fa-cta-title" className="fa-cta__title">Question not answered?</h2>
          <p className="fa-cta__body">Ask a person. Most replies take under 30 minutes during business hours.</p>
        </Reveal>
        <Reveal variant="up" delay={80} className="fa-cta__actions">
          <button type="button" className="fa-cta__btn fa-cta__btn--wa" onClick={() => openEnquiry({ source: "faq.final" })}>
            <WhatsAppIcon size={20} /> Ask on WhatsApp
          </button>
          <a href={`tel:${siteConfig.contact.phoneHref}`} className="fa-cta__btn">
            <Phone aria-hidden="true" size={20} /> {siteConfig.contact.phoneDisplay}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
