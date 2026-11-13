"use client";
/**
 * CTABand — the repeating mid/final enquiry band. Deliberately configurable so each
 * page renders a distinct band (different tone, copy and actions).
 */
import Reveal from "@/components/ui/Reveal/Reveal";
import Button from "@/components/ui/Button/Button";
import { useEnquiry } from "@/context/EnquiryContext";
import "./CTABand.css";

export default function CTABand({ eyebrow, title, mark, body, service, primaryLabel = "Start my enquiry", tone = "navy", bullets = [], id }) {
  const { openEnquiry } = useEnquiry();
  return (
    <section className={`cta-band cta-band--${tone}`} id={id} aria-labelledby={id ? `${id}-title` : undefined}>
      <div className="container cta-band__inner">
        <Reveal variant="left" className="cta-band__copy">
          {eyebrow ? <p className="eyebrow eyebrow--amber">{eyebrow}</p> : null}
          <h2 className="cta-band__title" id={id ? `${id}-title` : undefined}>
            {title}
            {mark ? <> <span className="marker">{mark}</span></> : null}
          </h2>
          {body ? <p className="cta-band__body lede">{body}</p> : null}
          {bullets.length ? (
            <ul className="cta-band__bullets">
              {bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
        </Reveal>
        <Reveal variant="right" delay={120} className="cta-band__actions">
          <Button variant="primary" size="lg" block onClick={() => openEnquiry({ service, source: "cta_band", title })}>
            {primaryLabel}
          </Button>
          <Button variant={tone === "navy" ? "ghost-light" : "outline"} size="lg" block href="/how-it-works" rightIcon={false}>
            See the process
          </Button>
          <p className="cta-band__note">Free assistance · No impact on your credit score · Reply on WhatsApp</p>
        </Reveal>
      </div>
    </section>
  );
}
