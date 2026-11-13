/**
 * TrFaq — tracking FAQs plus a support block.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Accordion from "@/components/ui/Accordion/Accordion";
import Reveal from "@/components/ui/Reveal/Reveal";
import { Headset } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import "./TrFaq.css";

const FAQS = [
  { q: "How often is the status updated?", a: "Every time a stage changes. The advisor updates the file after each call or lender response, and the portal reflects it immediately in production." },
  { q: "Why does my reference not work?", a: "References are case-insensitive but must match the full pattern. If the lookup fails, the enquiry may not have been recorded — contact the desk with your mobile number." },
  { q: "Can I track an application I made with another platform?", a: "No. Mirvex can only track files raised through this desk. If you applied elsewhere, ask that platform for a reference." },
  { q: "What does 'On hold' mean?", a: "The advisor is waiting on something — usually a document or a clarification — and the file is paused, not rejected. The latest update note explains what is missing." },
];

export default function TrFaq() {
  return (
    <section className="tr-faq section section--white" aria-labelledby="tr-faq-title">
      <div className="container tr-faq__grid">
        <div>
          <SectionHeading id="tr-faq-title" eyebrow="Tracking FAQ" title="What the status really means." mark={["really means"]} />
          <Reveal variant="up" className="tr-faq__support">
            <Headset aria-hidden="true" size={22} />
            <div>
              <p className="tr-faq__support-title">Prefer to ask a person?</p>
              <a href={`tel:${siteConfig.contact.phoneHref}`}>{siteConfig.contact.phoneDisplay}</a>
              <p>{siteConfig.contact.hours}</p>
            </div>
          </Reveal>
        </div>
        <Accordion items={FAQS} defaultOpen={0} />
      </div>
    </section>
  );
}
