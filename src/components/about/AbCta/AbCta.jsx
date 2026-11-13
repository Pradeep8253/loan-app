"use client";
/**
 * AbCta — a closing note that routes to Contact rather than repeating the enquiry band.
 */
import { MapPin, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import Reveal from "@/components/ui/Reveal/Reveal";
import { siteConfig } from "@/lib/siteConfig";
import "./AbCta.css";

export default function AbCta() {
  return (
    <section className="ab-cta" aria-labelledby="ab-cta-title">
      <div className="container ab-cta__inner">
        <Reveal variant="left" className="ab-cta__copy">
          <p className="ab-cta__kicker"><MapPin aria-hidden="true" size={16} /> {siteConfig.contact.address.line1}, {siteConfig.contact.address.line2}</p>
          <h2 id="ab-cta-title" className="ab-cta__title">Come say hello, or just message the desk.</h2>
          <p className="ab-cta__body">We are in the office {siteConfig.contact.hours}. Walk-ins are welcome for business loan discussions.</p>
        </Reveal>
        <Reveal variant="right" className="ab-cta__actions">
          <Button href="/contact" size="lg" block>Contact the desk</Button>
          <Button href="/demo-scope" variant="outline" size="lg" block rightIcon={false}>What this demo covers</Button>
        </Reveal>
      </div>
    </section>
  );
}
