/**
 * BtWhy — the three signals that a transfer deserves a look, plus a "when not to
 * transfer" honesty block. Deliberately asymmetrical two-column layout.
 */
import { TrendingDown, Clock, Layers, AlertOctagon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import SmartImage from "@/components/ui/SmartImage/SmartImage";
import "./BtWhy.css";

const SIGNALS = [
  { icon: TrendingDown, title: "Rate is 75+ bps above market", body: "A gap smaller than 0.75% rarely survives processing and legal fees within the remaining tenure." },
  { icon: Clock, title: "More than 12 months left", body: "Transfers need a runway. With under a year remaining, the break-even month may never arrive." },
  { icon: Layers, title: "You have three or more loans", body: "Consolidation into one EMI simplifies cash flow even when the blended rate change is small." },
];

export default function BtWhy() {
  return (
    <section className="bt-why section section--sky" aria-labelledby="bt-why-title">
      <div className="container">
        <SectionHeading id="bt-why-title" eyebrow="When to transfer" title="Three signals, one honest caveat." mark={["honest caveat"]} lede="A transfer is a refinance, not a discount coupon. It only makes sense when the maths clears the fees inside the remaining tenure." />
        <div className="bt-why__grid">
          <div className="bt-why__signals">
            {SIGNALS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} variant="left" delay={i * 70} className="bt-why__signal">
                  <span className="bt-why__icon" aria-hidden="true"><Icon size={20} /></span>
                  <div>
                    <h3 className="bt-why__title">{s.title}</h3>
                    <p className="bt-why__body">{s.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div className="bt-why__right">
            <Reveal variant="up" className="bt-why__image">
              <SmartImage slot="service.transfer" ratio="16 / 10" sizes="(max-width: 899px) 92vw, 480px" />
            </Reveal>
            <Reveal variant="up" delay={100} className="bt-why__no">
              <p className="bt-why__no-title"><AlertOctagon aria-hidden="true" size={18} /> When not to transfer</p>
              <ul>
                <li>Less than 12 EMIs remain.</li>
                <li>The rate gap is under 0.5%.</li>
                <li>Your credit profile has weakened since origination.</li>
                <li>The new lender charges a 2%+ processing fee with no waiver.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
