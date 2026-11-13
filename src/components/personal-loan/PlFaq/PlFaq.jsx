/**
 * PlFaq — personal loan FAQs in a two-column layout with a sticky side note.
 */
import { Lightbulb } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Accordion from "@/components/ui/Accordion/Accordion";
import Reveal from "@/components/ui/Reveal/Reveal";
import { personalFaqs } from "@/lib/data/content";
import "./PlFaq.css";

export default function PlFaq() {
  return (
    <section className="pl-faq section section--white" aria-labelledby="pl-faq-title">
      <div className="container pl-faq__grid">
        <div className="pl-faq__side">
          <SectionHeading id="pl-faq-title" eyebrow="Personal loan FAQ" title="Answers before the application." mark={["before"]} />
          <Reveal variant="up" className="pl-faq__tip">
            <Lightbulb aria-hidden="true" size={22} />
            <p>
              <strong>Advisor tip:</strong> if you need money within 48 hours, say so on the first call. Two partners can move that fast for clean profiles — most cannot.
            </p>
          </Reveal>
        </div>
        <Accordion items={personalFaqs} allowMultiple={false} defaultOpen={0} />
      </div>
    </section>
  );
}
