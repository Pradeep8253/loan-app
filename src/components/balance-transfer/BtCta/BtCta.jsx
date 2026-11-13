"use client";
/**
 * BtCta — closing panel with a consolidation toggle that changes the copy and the
 * lead summary, then opens the enquiry sheet.
 */
import { useState } from "react";
import { Combine } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import Reveal from "@/components/ui/Reveal/Reveal";
import { useEnquiry } from "@/context/EnquiryContext";
import "./BtCta.css";

export default function BtCta() {
  const [consolidate, setConsolidate] = useState(false);
  const { openEnquiry } = useEnquiry();
  return (
    <section className="bt-cta" aria-labelledby="bt-cta-title">
      <div className="container bt-cta__inner">
        <Reveal variant="left" className="bt-cta__copy">
          <p className="eyebrow eyebrow--teal">Transfer desk</p>
          <h2 id="bt-cta-title" className="bt-cta__title">Move one loan — or bring three together.</h2>
          <p className="bt-cta__body">Either way, the desk starts with your statement, not a sales pitch. If the transfer does not save you money, we tell you that instead.</p>
        </Reveal>
        <Reveal variant="right" delay={80} className="bt-cta__panel">
          <button type="button" className={`bt-cta__toggle ${consolidate ? "is-on" : ""}`} onClick={() => setConsolidate((v) => !v)} aria-pressed={consolidate}>
            <span className="bt-cta__toggle-icon" aria-hidden="true"><Combine size={18} /></span>
            <span className="bt-cta__toggle-copy">
              <strong>Consolidate multiple loans</strong>
              <span>{consolidate ? "On — we will look at combining everything into one EMI." : "Off — a straight transfer of one loan."}</span>
            </span>
            <span className="bt-cta__switch" aria-hidden="true"><span /></span>
          </button>
          <Button
            variant="dark"
            size="lg"
            block
            onClick={() => openEnquiry({ service: "loan-balance-transfer", source: "bt.final", summary: consolidate ? "Consolidation enquiry" : "Single-loan transfer enquiry" })}
            rightIcon
          >
            {consolidate ? "Start a consolidation review" : "Start my transfer review"}
          </Button>
          <p className="bt-cta__note">No cost to review. You decide after seeing the net-of-fee numbers.</p>
        </Reveal>
      </div>
    </section>
  );
}
