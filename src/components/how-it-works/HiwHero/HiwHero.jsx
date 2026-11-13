"use client";
/**
 * HiwHero — process masthead with an at-a-glance duration strip and a jump link.
 */
import { ArrowDown, Clock3 } from "lucide-react";
import PageHero from "@/components/ui/PageHero/PageHero";
import Button from "@/components/ui/Button/Button";
import { useEnquiry } from "@/context/EnquiryContext";
import "./HiwHero.css";

export default function HiwHero() {
  const { openEnquiry } = useEnquiry();
  return (
    <PageHero
      eyebrow="How it works"
      title="From enquiry to disbursal, in six honest steps."
      lede="Most platforms stop at 'apply now'. This page is the part they skip: what each step costs you in time, who does the work, and where files usually stall."
      tone="sky"
      actions={
        <>
          <Button size="lg" onClick={() => openEnquiry({ source: "hiw.hero" })}>Start the process</Button>
          <Button href="#timeline" variant="outline" size="lg" rightIcon={false} icon={<ArrowDown aria-hidden="true" size={18} />}>
            Jump to the timeline
          </Button>
        </>
      }
      facts={[
        { label: "Step 1", value: "2 minutes" },
        { label: "First reply", value: "~30 min" },
        { label: "Shortlist", value: "1 working day" },
        { label: "Decision", value: "1–5 days" },
      ]}
      aside={
        <div className="hiw-hero__card">
          <p className="hiw-hero__card-title"><Clock3 aria-hidden="true" size={18} /> The realistic clock</p>
          <ul>
            <li><span>Personal loan</span><strong>24–72 hrs</strong></li>
            <li><span>Overdraft</span><strong>2–3 days</strong></li>
            <li><span>Business loan</span><strong>2–5 days</strong></li>
            <li><span>Home loan</span><strong>6–8 weeks</strong></li>
          </ul>
          <p className="hiw-hero__card-note">Assumes complete documents and a clean bureau. Anything else is a different conversation.</p>
        </div>
      }
    />
  );
}
