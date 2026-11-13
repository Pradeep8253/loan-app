"use client";
/**
 * HomeUseCases — why people borrow, as an image-led card grid (carousel on mobile).
 */
import { HeartPulse, Plane, Sparkles, Hammer, HelpCircle, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Carousel from "@/components/ui/Carousel/Carousel";
import SmartImage from "@/components/ui/SmartImage/SmartImage";
import { homeUseCases } from "@/lib/data/content";
import { useEnquiry } from "@/context/EnquiryContext";
import "./HomeUseCases.css";

const ICONS = { HeartPulse, Plane, Sparkles, Hammer, HelpCircle };

export default function HomeUseCases() {
  const { openEnquiry } = useEnquiry();
  return (
    <section className="home-usecases section section--white" aria-labelledby="home-usecases-title">
      <div className="container">
        <SectionHeading
          id="home-usecases-title"
          eyebrow="Why people borrow"
          title="Real reasons, not brochure reasons."
          mark={["Real"]}
          lede="Every use case below is a genuine category our advisors see weekly. If your reason is not here, that is fine — the call starts with what the money is for."
        />
        <Carousel count={homeUseCases.length} label="Loan use cases" desktopColumns={3}>
          {homeUseCases.map((u) => {
            const Icon = ICONS[u.icon] || HelpCircle;
            return (
              <article className="uc-card" key={u.key}>
                <SmartImage slot={u.slot} ratio="16 / 10" sizes="(max-width: 767px) 84vw, (max-width: 1200px) 33vw, 380px" />
                <div className="uc-card__body">
                  <span className="uc-card__icon" aria-hidden="true"><Icon size={18} /></span>
                  <h3 className="uc-card__title">{u.title}</h3>
                  <p className="uc-card__text">{u.body}</p>
                  <div className="uc-card__foot">
                    <span className="uc-card__amount">{u.amount}</span>
                    <button
                      type="button"
                      className="uc-card__cta"
                      onClick={() => openEnquiry({ service: "personal-loan", source: `home.usecase.${u.key}` })}
                      aria-label={`Enquire about funding: ${u.title}`}
                    >
                      Enquire <ArrowUpRight aria-hidden="true" size={16} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
}
