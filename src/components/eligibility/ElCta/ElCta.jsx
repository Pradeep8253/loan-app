"use client";
/**
 * ElCta — a two-path closing panel: calculator again or advisor confirmation.
 */
import { Calculator } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import Reveal from "@/components/ui/Reveal/Reveal";
import Button from "@/components/ui/Button/Button";
import { useEnquiry } from "@/context/EnquiryContext";
import "./ElCta.css";

export default function ElCta() {
  const { openEnquiry } = useEnquiry();
  return (
    <section className="el-cta" aria-labelledby="el-cta-title">
      <div className="container el-cta__inner">
        <Reveal variant="up" className="el-cta__copy">
          <h2 id="el-cta-title" className="el-cta__title">An estimate is useful. A confirmation is better.</h2>
          <p className="el-cta__body">Send the estimate to an advisor and they will confirm it against live partner policies — without a bureau pull.</p>
        </Reveal>
        <Reveal variant="up" delay={80} className="el-cta__actions">
          <Button variant="whatsapp" size="lg" block icon={<WhatsAppIcon size={20} />} rightIcon={false} onClick={() => openEnquiry({ source: "eligibility.final" })}>
            Confirm on WhatsApp
          </Button>
          <Button variant="ghost-light" size="lg" block href="/emi-calculator" icon={<Calculator aria-hidden="true" size={18} />} rightIcon={false}>
            Open the EMI calculator
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
