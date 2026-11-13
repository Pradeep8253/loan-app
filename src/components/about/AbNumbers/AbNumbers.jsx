/**
 * AbNumbers — transparent operating metrics with a caveat, in a wide stat ribbon.
 */
import Reveal from "@/components/ui/Reveal/Reveal";
import StatBlock from "@/components/ui/StatBlock/StatBlock";
import "./AbNumbers.css";

const METRICS = [
  { value: 42000, suffix: "+", label: "Enquiries answered since 2019" },
  { value: 18, suffix: "", label: "Active partner banks & NBFCs" },
  { value: 93, suffix: "%", label: "Files updated within 24 hrs" },
  { value: 71, suffix: "%", label: "Enquiries that reach a shortlist" },
];

export default function AbNumbers() {
  return (
    <section className="ab-num section section--white" aria-labelledby="ab-num-title">
      <div className="container">
        <Reveal variant="up" className="ab-num__head">
          <h2 id="ab-num-title" className="ab-num__title">The numbers we are willing to publish.</h2>
          <p className="ab-num__sub">29% of enquiries do not reach a shortlist — because the profile does not fit a partner policy at that moment. We mention it because it is the honest denominator.</p>
        </Reveal>
        <div className="ab-num__grid">
          {METRICS.map((m) => (
            <StatBlock key={m.label} value={m.value} suffix={m.suffix} label={m.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
