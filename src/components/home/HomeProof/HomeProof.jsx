/**
 * HomeProof — customer outcomes in a snap carousel with outcome tags, plus the
 * "what we do differently" list on the right. No star-rating theatre.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import Carousel from "@/components/ui/Carousel/Carousel";
import SmartImage from "@/components/ui/SmartImage/SmartImage";
import { Quote, CheckCircle2 } from "lucide-react";
import { homeProof } from "@/lib/data/content";
import "./HomeProof.css";

const DIFFERENT = [
  { title: "The comparison includes the fee", body: "Total cost of borrowing, not the floor rate on an ad." },
  { title: "A fast no beats a slow maybe", body: "If the profile will not clear a partner's policy, we say so on the first call." },
  { title: "One advisor until disbursal", body: "A named person answers your reference number. No queue roulette." },
];

export default function HomeProof() {
  return (
    <section className="home-proof section section--sky" aria-labelledby="home-proof-title">
      <div className="container home-proof__grid">
        <div className="home-proof__left">
          <SectionHeading
            id="home-proof-title"
            eyebrow="Customer outcomes"
            title="People who stopped guessing."
            mark={["stopped"]}
            lede="Enquiries come from search, WhatsApp and referrals. These are the outcomes the advisors are proudest of — edited for length, not sentiment."
          />
          <Reveal variant="left" className="home-proof__media">
            <SmartImage slot="team.advisor" ratio="5 / 4" frame frameTone="teal" sizes="(max-width: 899px) 92vw, 420px" />
            <div className="home-proof__badge">
              <strong>4.7/5</strong>
              <span>advisor rating after enquiry</span>
            </div>
          </Reveal>
        </div>
        <div className="home-proof__right">
          <Carousel count={homeProof.length} label="Customer outcomes" desktopColumns={2}>
            {homeProof.map((p) => (
              <figure className="proof-card" key={p.name}>
                <Quote aria-hidden="true" size={26} className="proof-card__quote" />
                <blockquote>{p.text}</blockquote>
                <figcaption>
                  <span className="proof-card__name">{p.name}</span>
                  <span className="proof-card__city">{p.city}</span>
                </figcaption>
                <p className="proof-card__outcome">{p.outcome}</p>
              </figure>
            ))}
          </Carousel>
          <Reveal variant="up" delay={140} className="home-proof__list">
            <p className="home-proof__list-title">What we do differently</p>
            <ul>
              {DIFFERENT.map((d) => (
                <li key={d.title}>
                  <CheckCircle2 aria-hidden="true" size={20} />
                  <span>
                    <strong>{d.title}</strong>
                    {d.body}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
