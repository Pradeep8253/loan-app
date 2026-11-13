/**
 * EmiExplainer — the maths explained step by step and the three levers that change
 * an EMI, in a two-column editorial layout.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import "./EmiExplainer.css";

const LEVERS = [
  { title: "Amount", body: "Every extra ₹1 lakh adds roughly ₹2,100–₹2,400 to a 5-year EMI at mid-teens rates." },
  { title: "Rate", body: "A 1% rate change moves the EMI of a ₹5 lakh, 3-year loan by about ₹145 a month." },
  { title: "Tenure", body: "Longer tenure lowers the EMI but raises total interest — dramatically after 60 months on unsecured loans." },
];

export default function EmiExplainer() {
  return (
    <section className="emi-x section section--white" aria-labelledby="emi-x-title">
      <div className="container emi-x__grid">
        <div>
          <SectionHeading id="emi-x-title" eyebrow="The formula" title="What the calculator is doing." mark={["doing"]} />
          <Reveal variant="up" className="emi-x__formula">
            <code>EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)</code>
            <dl>
              <div><dt>P</dt><dd>Principal — the amount borrowed</dd></div>
              <div><dt>r</dt><dd>Monthly rate — annual rate ÷ 12 ÷ 100</dd></div>
              <div><dt>n</dt><dd>Number of monthly instalments</dd></div>
            </dl>
          </Reveal>
          <p className="emi-x__body">
            Every EMI has an interest part and a principal part. Early EMIs are interest-heavy; later ones are principal-heavy. That is why prepaying early saves more than prepaying late.
          </p>
        </div>
        <div className="emi-x__levers">
          {LEVERS.map((l, i) => (
            <Reveal key={l.title} variant="right" delay={i * 70} className="emi-x__lever">
              <p className="emi-x__lever-n">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="emi-x__lever-title">{l.title}</h3>
              <p className="emi-x__lever-body">{l.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
