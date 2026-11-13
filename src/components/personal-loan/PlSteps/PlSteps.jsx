/**
 * PlSteps — the five-stage personal loan path as a horizontal desktop rail /
 * vertical mobile list, with the document checklist as a second column.
 */
import { FileText, Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import { personalSteps } from "@/lib/data/content";
import { getService } from "@/lib/data/services";
import "./PlSteps.css";

export default function PlSteps() {
  const service = getService("personal-loan");
  return (
    <section className="pl-steps section section--white" aria-labelledby="pl-steps-title">
      <div className="container">
        <SectionHeading id="pl-steps-title" eyebrow="The path" title="Five stages, one checklist." mark={["one checklist"]} lede="Steps 1 and 2 happen by phone or WhatsApp. Nothing needs uploading until you approve a shortlist." />
        <div className="pl-steps__grid">
          <ol className="pl-steps__rail">
            {personalSteps.map((s, i) => (
              <Reveal as="li" key={s.n} variant="left" delay={i * 60} className="pl-steps__step">
                <span className="pl-steps__num">{s.n}</span>
                <div>
                  <h3 className="pl-steps__step-title">{s.title}</h3>
                  <p className="pl-steps__step-body">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal as="aside" variant="right" delay={100} className="pl-steps__docs">
            <p className="pl-steps__docs-head"><FileText aria-hidden="true" size={18} /> Usual document checklist</p>
            <ul>
              {service.docs.map((d) => (
                <li key={d}><Check aria-hidden="true" size={16} /> {d}</li>
              ))}
            </ul>
            <p className="pl-steps__docs-note">Salaried profiles only need the first four. Business income adds ITR and banking.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
