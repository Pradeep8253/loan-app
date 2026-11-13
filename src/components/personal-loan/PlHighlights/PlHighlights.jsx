/**
 * PlHighlights — the four commercial facts, as solid icon cards.
 */
import { Clock, Percent, Calendar, FileCheck2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import { personalHighlights } from "@/lib/data/content";
import "./PlHighlights.css";

const ICONS = { Clock, Percent, Calendar, FileCheck2 };

export default function PlHighlights() {
  return (
    <section className="pl-hi section section--white" aria-labelledby="pl-hi-title">
      <div className="container">
        <SectionHeading id="pl-hi-title" eyebrow="Key terms" title="What you are actually signing up for." mark={["actually"]} lede="Indicative across the partner panel. The lender confirms final numbers after verification." />
        <div className="pl-hi__grid">
          {personalHighlights.map((h, i) => {
            const Icon = ICONS[h.icon] || Clock;
            return (
              <Reveal key={h.title} variant="up" delay={i * 70} className="pl-hi__card">
                <span className="pl-hi__icon" aria-hidden="true"><Icon size={22} /></span>
                <h3 className="pl-hi__title">{h.title}</h3>
                <p className="pl-hi__body">{h.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
