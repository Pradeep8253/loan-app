/**
 * HiwTimeline — the six-step journey with detail, owner and duration per stage.
 * The connecting line draws with the Reveal state rather than JS measurement.
 */
import { MessageSquare, ClipboardCheck, ListChecks, FolderOpen, Scale, Banknote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import { journeySteps } from "@/lib/data/journey";
import "./HiwTimeline.css";

const ICONS = { MessageSquare, ClipboardCheck, ListChecks, FolderOpen, Scale, Banknote };
const OWNER = ["You", "Advisor", "Advisor", "You + Advisor", "Lender", "Lender"];

export default function HiwTimeline() {
  return (
    <section className="hiw-tl section section--white" id="timeline" aria-labelledby="hiw-tl-title">
      <div className="container">
        <SectionHeading id="hiw-tl-title" eyebrow="The timeline" title="Every step, with the owner named." mark={["owner named"]} lede="Nothing moves to the next stage without someone owning it. If a file sits still, you know whose desk it is on." />
        <ol className="hiw-tl__list">
          {journeySteps.map((step, i) => {
            const Icon = ICONS[step.icon] || MessageSquare;
            return (
              <Reveal as="li" key={step.key} variant="up" delay={i * 50} className="hiw-tl__row">
                <div className="hiw-tl__marker" aria-hidden="true">
                  <span className="hiw-tl__n">{step.n}</span>
                  <span className="hiw-tl__icon"><Icon size={18} /></span>
                </div>
                <div className="hiw-tl__content">
                  <div className="hiw-tl__head">
                    <h3 className="hiw-tl__title">{step.title}</h3>
                    <span className="hiw-tl__time">{step.minutes}</span>
                  </div>
                  <p className="hiw-tl__blurb">{step.blurb}</p>
                  <p className="hiw-tl__detail">{step.detail}</p>
                  <p className="hiw-tl__owner"><span>Owner:</span> {OWNER[i]}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
