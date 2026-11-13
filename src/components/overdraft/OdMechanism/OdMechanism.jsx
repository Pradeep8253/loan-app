/**
 * OdMechanism — "how a limit works" explainer with a solid stepped diagram
 * (no gradients) and the four operating rules.
 */
import { ArrowDownRight, ArrowUpRight, Wallet, CalendarClock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import { overdraftHighlights } from "@/lib/data/content";
import "./OdMechanism.css";

const ICONS = { Repeat: ArrowDownRight, ArrowDownUp: ArrowUpRight, CalendarDays: CalendarClock, ShieldCheck: Wallet };

export default function OdMechanism() {
  return (
    <section className="od-mech section section--navy" aria-labelledby="od-mech-title">
      <div className="container">
        <SectionHeading id="od-mech-title" eyebrow="How a limit works" title="Draw. Repay. Repeat." mark={["Repeat."]} tone="dark" lede="The limit stays available through the facility period. Money in reduces the drawn balance; money out increases it again." />
        <div className="od-mech__grid">
          <Reveal variant="left" className="od-mech__diagram">
            <div className="od-mech__row">
              <span className="od-mech__label">Sanctioned limit</span>
              <span className="od-mech__limit">₹5,00,000</span>
            </div>
            <div className="od-mech__bar" role="img" aria-label="Example limit utilisation over a month">
              <span className="od-mech__fill od-mech__fill--used" />
              <span className="od-mech__fill od-mech__fill--free" />
            </div>
            <div className="od-mech__legend">
              <span><i className="od-mech__swatch od-mech__swatch--used" /> Drawn · interest applies</span>
              <span><i className="od-mech__swatch od-mech__swatch--free" /> Available · no interest</span>
            </div>
            <ul className="od-mech__timeline">
              <li><strong>Day 3</strong> Client pays ₹1.2L. Drawn balance falls.</li>
              <li><strong>Day 9</strong> Raw material purchase ₹3.1L. Balance rises.</li>
              <li><strong>Day 26</strong> Advance received ₹2.4L. Interest base shrinks.</li>
              <li><strong>Month end</strong> Interest charged on the daily average, not the limit.</li>
            </ul>
          </Reveal>
          <div className="od-mech__rules">
            {overdraftHighlights.map((h, i) => {
              const Icon = ICONS[h.icon] || Wallet;
              return (
                <Reveal key={h.title} variant="up" delay={i * 70} className="od-mech__rule">
                  <span className="od-mech__rule-icon" aria-hidden="true"><Icon size={20} /></span>
                  <div>
                    <h3 className="od-mech__rule-title">{h.title}</h3>
                    <p className="od-mech__rule-body">{h.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
