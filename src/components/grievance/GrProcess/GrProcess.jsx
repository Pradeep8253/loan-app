/**
 * GrProcess — the four-level escalation ladder rendered as a rail.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import "./GrProcess.css";

const LEVELS = [
  { n: "01", who: "Your advisor", when: "Day 0", body: "Raise it in the WhatsApp thread you already have. Your advisor logs it and shares a ticket number." },
  { n: "02", who: "Grievance Officer", when: "Day 3", body: "If the advisor cannot close it, the ticket moves to the Grievance Officer — details in the panel alongside." },
  { n: "03", who: "Principal Officer", when: "Day 8", body: "Unresolved after seven working days escalates to the Principal Officer, who reviews the file and responds in writing." },
  { n: "04", who: "RBI Ombudsman", when: "Day 30", body: "If the lender or we fail to resolve within 30 days, you may approach the RBI Integrated Ombudsman. It costs nothing and does not need an agent." },
];

export default function GrProcess() {
  return (
    <section className="gr-p section section--white" aria-labelledby="gr-p-title">
      <div className="container">
        <SectionHeading id="gr-p-title" eyebrow="The ladder" title="Four levels, each with a clock." mark={["a clock"]} lede="Times are working days. A ticket older than its level clock is reported to the Principal Officer automatically." />
        <ol className="gr-p__rail">
          {LEVELS.map((l, i) => (
            <Reveal as="li" key={l.n} variant="up" delay={i * 70} className="gr-p__step">
              <div className="gr-p__marker" aria-hidden="true"><span>{l.n}</span></div>
              <div className="gr-p__content">
                <div className="gr-p__head">
                  <h3>{l.who}</h3>
                  <span className="gr-p__when">{l.when}</span>
                </div>
                <p>{l.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
