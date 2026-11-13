/**
 * AbStory — editorial founding story with a pull-quote and three timeline beats.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import SmartImage from "@/components/ui/SmartImage/SmartImage";
import "./AbStory.css";

const BEATS = [
  { year: "2019", title: "Two people, one desk", body: "A former credit analyst and a systems engineer start helping local businesses decode loan offers." },
  { year: "2022", title: "The comparison becomes a product", body: "Written shortlists replace verbal quotes. Advisors begin tracking every file to disbursal." },
  { year: "2026", title: "24 advisors, 18 partners", body: "Five products, one process and a firm rule: never recommend a product the profile cannot clear." },
];

export default function AbStory() {
  return (
    <section className="ab-story section section--white" aria-labelledby="ab-story-title">
      <div className="container ab-story__grid">
        <div>
          <SectionHeading id="ab-story-title" eyebrow="Why we exist" title="Loan advice is usually a sales funnel." mark={["sales funnel"]} lede="Most comparison sites are paid per approved application, which quietly turns advice into a quota. We built the desk around the opposite incentive: fewer, better-matched submissions." />
          <Reveal variant="up" className="ab-story__quote">
            <blockquote>“A fast no costs a customer ten minutes. A slow maybe costs them three weeks and a credit enquiry.”</blockquote>
            <p>— founding principle, written on the office wall</p>
          </Reveal>
          <Reveal variant="up" delay={100} className="ab-story__beats">
            {BEATS.map((b) => (
              <div key={b.year} className="ab-story__beat">
                <span>{b.year}</span>
                <div>
                  <h3>{b.title}</h3>
                  <p>{b.body}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
        <Reveal variant="right" className="ab-story__media">
          <SmartImage slot="about.mission" ratio="4 / 5" sizes="(max-width: 899px) 92vw, 440px" frame frameTone="teal" />
          <div className="ab-story__badge">
            <strong>7 years</strong>
            <span>of doing this one thing</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
