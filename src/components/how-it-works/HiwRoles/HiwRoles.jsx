/**
 * HiwRoles — the advisor promise: five commitments in a large-type list beside
 * a portrait. Different rhythm from the icon grids above.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import SmartImage from "@/components/ui/SmartImage/SmartImage";
import "./HiwRoles.css";

const PROMISES = [
  { title: "One named advisor", body: "Not a queue. You get a name, a number and a reference." },
  { title: "A reply within 30 minutes", body: "In business hours. Outside them, first thing next morning." },
  { title: "No lead resale", body: "Your number goes to the partner you approve — nobody else." },
  { title: "Honest rejection reasons", body: "If a policy will decline the file, we say why on the first call." },
  { title: "Fees disclosed before signing", body: "Processing, legal, insurance and prepayment terms in writing." },
];

export default function HiwRoles() {
  return (
    <section className="hiw-roles section section--navy" aria-labelledby="hiw-roles-title">
      <div className="container hiw-roles__grid">
        <Reveal variant="left" className="hiw-roles__media">
          <SmartImage slot="team.support" ratio="4 / 5" sizes="(max-width: 899px) 92vw, 420px" frame frameTone="amber" />
        </Reveal>
        <div>
          <SectionHeading id="hiw-roles-title" eyebrow="The advisor promise" title="Five commitments we can be held to." mark={["held to"]} tone="dark" />
          <ol className="hiw-roles__list">
            {PROMISES.map((p, i) => (
              <Reveal as="li" key={p.title} variant="right" delay={i * 60} className="hiw-roles__item">
                <span className="hiw-roles__n">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="hiw-roles__title">{p.title}</h3>
                  <p className="hiw-roles__body">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
