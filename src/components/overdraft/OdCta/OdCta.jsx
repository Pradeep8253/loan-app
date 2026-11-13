"use client";
/**
 * OdCta — final overdraft conversion panel with a limit selector that carries into
 * the enquiry sheet. Deliberately different from the personal loan CTA band.
 */
import { useState } from "react";
import { LineChart } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import Chip from "@/components/ui/Chip/Chip";
import Button from "@/components/ui/Button/Button";
import Reveal from "@/components/ui/Reveal/Reveal";
import { useEnquiry } from "@/context/EnquiryContext";
import { formatINR } from "@/lib/format";
import "./OdCta.css";

const LIMITS = [200000, 500000, 1000000];

export default function OdCta() {
  const [limit, setLimit] = useState(500000);
  const { openEnquiry } = useEnquiry();

  return (
    <section className="od-cta" aria-labelledby="od-cta-title">
      <div className="container od-cta__inner">
        <Reveal variant="left" className="od-cta__copy">
          <span className="od-cta__icon" aria-hidden="true"><LineChart size={24} /></span>
          <h2 id="od-cta-title" className="od-cta__title">Set the limit you need. Grow it next year.</h2>
          <p className="od-cta__body">Most limits are reviewed annually. Starting right-sized is better than starting oversized and paying for unused capacity.</p>
        </Reveal>
        <Reveal variant="right" delay={100} className="od-cta__panel">
          <p className="od-cta__panel-label">I am thinking about a limit of</p>
          <div className="od-cta__chips">
            {LIMITS.map((l) => (
              <Chip key={l} label={formatINR(l)} active={limit === l} onClick={() => setLimit(l)} />
            ))}
          </div>
          <Button
            variant="primary"
            size="lg"
            block
            icon={<WhatsAppIcon size={20} />}
            rightIcon={false}
            onClick={() => openEnquiry({ service: "overdraft", source: "od.final", loan_amount: formatINR(limit) })}
          >
            Start my overdraft enquiry
          </Button>
          <p className="od-cta__panel-note">Advisor confirms whether your turnover supports this limit before anything is submitted.</p>
        </Reveal>
      </div>
    </section>
  );
}
