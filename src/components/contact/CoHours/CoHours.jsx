"use client";
/**
 * CoHours — office hours, response-time expectations and a visual "office location"
 * panel with a map-style layout (no external map dependency).
 */
import { Clock, CheckCircle2, Send } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import SmartImage from "@/components/ui/SmartImage/SmartImage";
import { siteConfig } from "@/lib/siteConfig";
import { trackEvent } from "@/lib/analytics";
import "./CoHours.css";

const EXPECT = [
  { channel: "WhatsApp", normal: "Within 30 minutes", outside: "Next business morning" },
  { channel: "Phone", normal: "Answered in 3 rings", outside: "Callback next morning" },
  { channel: "Email", normal: "Same working day", outside: "Next working day" },
  { channel: "Application update", normal: "Every stage change", outside: "Same rule" },
];

export default function CoHours() {
  return (
    <section className="co-hours section section--white" aria-labelledby="co-hours-title">
      <div className="container co-hours__grid">
        <div>
          <SectionHeading id="co-hours-title" eyebrow="When we are around" title="Response times, stated plainly." mark={["plainly"]} lede="We run one shift, Monday to Saturday. After hours your message queues and gets the first slot next morning — nobody is promised a 2 a.m. reply." />
          <Reveal variant="up" className="co-hours__table-wrap">
            <table className="co-hours__table">
              <caption className="sr-only">Expected response times by channel</caption>
              <thead><tr><th scope="col">Channel</th><th scope="col">Business hours</th><th scope="col">Outside hours</th></tr></thead>
              <tbody>
                {EXPECT.map((r) => (
                  <tr key={r.channel}><th scope="row">{r.channel}</th><td data-label="Business hours"><CheckCircle2 aria-hidden="true" size={15} /> {r.normal}</td><td data-label="Outside hours">{r.outside}</td></tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <p className="co-hours__note"><Clock aria-hidden="true" size={15} /> {siteConfig.contact.hours} · All times IST.</p>
        </div>
        <Reveal variant="right" className="co-hours__office">
          <SmartImage slot="contact.office" ratio="16 / 11" sizes="(max-width: 899px) 92vw, 460px" />
          <div className="co-hours__office-info">
            <p className="co-hours__office-title">Prayagraj desk</p>
            <p>{siteConfig.contact.address.line1}<br />{siteConfig.contact.address.line2}</p>
            <a href={`mailto:${siteConfig.contact.email}`} className="co-hours__mail" onClick={() => trackEvent("email_click", { source: "contact.hours" })}>
              <Send aria-hidden="true" size={15} /> {siteConfig.contact.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
