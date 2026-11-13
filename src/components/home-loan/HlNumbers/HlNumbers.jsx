/**
 * HlNumbers — "what the lender actually checks", a numbered breakdown with a
 * FOIR meter. Distinct from the step timelines elsewhere.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import StatBlock from "@/components/ui/StatBlock/StatBlock";
import "./HlNumbers.css";

const CHECKS = [
  { n: "1", title: "Income stability", body: "Two years of assessment proof for salaried; three years of ITR and banking for self-employed." },
  { n: "2", title: "Obligation ratio", body: "All existing EMIs plus the new one must usually sit under 50% of take-home." },
  { n: "3", title: "Credit history", body: "Twelve months of clean repayment across cards and loans is the common floor." },
  { n: "4", title: "Property quality", body: "Clear title, approved plan and a valuation the lender's engineer signs off on." },
  { n: "5", title: "Age at maturity", body: "Most partners want the loan closed before you turn 60 or 65, which shortens tenure as you age." },
];

export default function HlNumbers() {
  return (
    <section className="hl-num section section--teal" aria-labelledby="hl-num-title">
      <div className="container hl-num__grid">
        <div>
          <SectionHeading id="hl-num-title" eyebrow="Underwriting reality" title="Five things decide your file." mark={["Five things"]} tone="dark" lede="Home loan rejections are rarely about the property alone. Income proof and obligation ratio decide far more files than buyers expect." />
          <Reveal variant="up" delay={100} className="hl-num__stats">
            <StatBlock tone="dark" value={48} suffix="%" label="Typical FOIR ceiling" />
            <StatBlock tone="dark" value={80} suffix="%" label="Loan-to-value, ready property" />
            <StatBlock tone="dark" value={75} suffix="%" label="Loan-to-value, construction" />
          </Reveal>
        </div>
        <ol className="hl-num__list">
          {CHECKS.map((c, i) => (
            <Reveal as="li" key={c.n} variant="right" delay={i * 60} className="hl-num__item">
              <span className="hl-num__n">{c.n}</span>
              <div>
                <h3 className="hl-num__title">{c.title}</h3>
                <p className="hl-num__body">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
