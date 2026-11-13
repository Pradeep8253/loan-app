"use client";
/**
 * HlProcess — the home-buying timeline as a connected horizontal rail with dates,
 * plus a sticky "what to do this week" card.
 */
import { CalendarDays } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import Button from "@/components/ui/Button/Button";
import { useEnquiry } from "@/context/EnquiryContext";
import "./HlProcess.css";

const STAGES = [
  { when: "Week 1", title: "Pre-approval check", body: "Income, FOIR and credit reviewed before you shortlist flats. Know your budget first." },
  { when: "Week 2–3", title: "Agreement & valuation", body: "We file the agreement, arrange the technical valuation and flag title gaps early." },
  { when: "Week 3–4", title: "Legal opinion", body: "The lender's advocate reviews title, encumbrance and approvals. Most delays happen here." },
  { when: "Week 5", title: "Sanction letter", body: "Terms in writing — rate, tenure, fee, insurance (optional) and disbursal conditions." },
  { when: "Week 6–8", title: "Disbursal & registration", body: "Funds move to the seller or builder; we coordinate registration and documents." },
];

export default function HlProcess() {
  const { openEnquiry } = useEnquiry();
  return (
    <section className="hl-proc section section--white" aria-labelledby="hl-proc-title">
      <div className="container">
        <SectionHeading id="hl-proc-title" eyebrow="The timeline" title="Six to eight weeks, honestly." mark={["honestly"]} lede="That is realistic for a clean resale purchase. New launches with pending approvals take longer — ask us before paying a token." />
        <div className="hl-proc__wrap">
          <ol className="hl-proc__rail">
            {STAGES.map((s, i) => (
              <Reveal as="li" key={s.title} variant="up" delay={i * 60} className="hl-proc__stage">
                <span className="hl-proc__dot" aria-hidden="true" />
                <p className="hl-proc__when"><CalendarDays aria-hidden="true" size={14} /> {s.when}</p>
                <h3 className="hl-proc__title">{s.title}</h3>
                <p className="hl-proc__body">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
        <Reveal variant="up" className="hl-proc__now">
          <div>
            <p className="hl-proc__now-title">Buying this quarter?</p>
            <p className="hl-proc__now-body">Get the pre-approval check done before you negotiate. Sellers take a funded buyer more seriously.</p>
          </div>
          <Button variant="dark" size="md" onClick={() => openEnquiry({ service: "home-loan", source: "hl.process" })}>Book a pre-approval call</Button>
        </Reveal>
      </div>
    </section>
  );
}
