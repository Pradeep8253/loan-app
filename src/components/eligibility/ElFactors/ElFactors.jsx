/**
 * ElFactors — the five factors with a weight ring each, in an offset-cards layout.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import "./ElFactors.css";

const FACTORS = [
  { score: 35, title: "Bureau score", body: "The strongest single signal. 750+ opens most doors; below 650, options narrow sharply.", tone: "teal" },
  { score: 25, title: "Income & stability", body: "Salary credits, employer category and job tenure all feed the model.", tone: "navy" },
  { score: 20, title: "Existing obligations", body: "Total EMIs versus take-home. Cards count too.", tone: "amber" },
  { score: 12, title: "Age & profile", body: "Lenders want the loan closed before retirement age.", tone: "sky" },
  { score: 8, title: "City & employer", body: "Some partner policies are geography-specific.", tone: "white" },
];

export default function ElFactors() {
  return (
    <section className="el-f section section--sky" aria-labelledby="el-f-title">
      <div className="container">
        <SectionHeading id="el-f-title" eyebrow="What moves the number" title="Five factors, ranked by impact." mark={["ranked"]} lede="Percentages below are a rough weighting across typical partner scorecards — useful for prioritising what to fix first." />
        <div className="el-f__grid">
          {FACTORS.map((f, i) => (
            <Reveal key={f.title} variant="up" delay={i * 60} className={`el-f__card el-f__card--${f.tone}`}>
              <span className="el-f__score">{f.score}%</span>
              <h3 className="el-f__title">{f.title}</h3>
              <p className="el-f__body">{f.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
