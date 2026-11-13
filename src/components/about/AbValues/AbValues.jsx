/**
 * AbValues — five operating values as stacked numbered rows with amber rules.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import "./AbValues.css";

const VALUES = [
  { title: "Say the no early", body: "If a profile will not clear a partner's policy, we say it on the first call and explain what to fix." },
  { title: "Price the whole loan", body: "Rate without fees is fiction. Every comparison shows processing, legal and prepayment terms." },
  { title: "One owner per file", body: "A named advisor sees the file through. Handovers lose details." },
  { title: "Collect documents once", body: "One checklist, one upload, shared only with the partner you approve." },
  { title: "No resold leads", body: "Your number is not a lead to be auctioned. It reaches the lender you agreed to." },
];

export default function AbValues() {
  return (
    <section className="ab-v section section--navy" aria-labelledby="ab-v-title">
      <div className="container">
        <SectionHeading id="ab-v-title" eyebrow="How we work" title="Five rules, applied daily." mark={["applied daily"]} tone="dark" lede="These are not wall posters. Advisors are measured on how well they follow them, not only on disbursals." />
        <div className="ab-v__list">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} variant="up" delay={i * 60} className="ab-v__row">
              <span className="ab-v__n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="ab-v__title">{v.title}</h3>
              <p className="ab-v__body">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
