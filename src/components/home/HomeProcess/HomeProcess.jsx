/**
 * HomeProcess — the six-step journey as a numbered timeline that draws on scroll,
 * with a mid-page conversion card.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import Button from "@/components/ui/Button/Button";
import { journeySteps } from "@/lib/data/journey";
import { MessageSquare, ClipboardCheck, ListChecks, FolderOpen, Scale, Banknote } from "lucide-react";
import "./HomeProcess.css";

const ICONS = { MessageSquare, ClipboardCheck, ListChecks, FolderOpen, Scale, Banknote };

export default function HomeProcess() {
  return (
    <section className="home-process section section--navy" aria-labelledby="home-process-title">
      <div className="container">
        <SectionHeading
          id="home-process-title"
          eyebrow="The process"
          title="Six steps. No mystery."
          mark={["No mystery"]}
          tone="dark"
          lede="Each step tells you what happens, who does it and how long it takes. If something stalls, you will know where."
        />
        <div className="home-process__grid">
          <ol className="home-process__steps">
            {journeySteps.map((step, i) => {
              const Icon = ICONS[step.icon] || MessageSquare;
              return (
                <Reveal as="li" key={step.key} variant="up" delay={i * 60} className="hp-step">
                  <span className="hp-step__num">{step.n}</span>
                  <span className="hp-step__icon" aria-hidden="true"><Icon size={20} /></span>
                  <div>
                    <h3 className="hp-step__title">{step.title}</h3>
                    <p className="hp-step__blurb">{step.blurb}</p>
                    <span className="hp-step__time">{step.minutes}</span>
                  </div>
                </Reveal>
              );
            })}
          </ol>
          <Reveal as="aside" variant="right" delay={120} className="home-process__aside">
            <p className="home-process__aside-kicker">Start here</p>
            <h3 className="home-process__aside-title">Two minutes gets you a named advisor and a reference number.</h3>
            <p className="home-process__aside-body">
              You do not need documents for step one. You need an amount, a rough purpose and a mobile number.
            </p>
            <Button href="/apply" size="lg" block>Start my application</Button>
            <Button href="/how-it-works" variant="ghost-light" size="md" block rightIcon={false}>Read the full process</Button>
            <p className="home-process__aside-note">Prefer voice? Call the desk during business hours and quote the service you need.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
