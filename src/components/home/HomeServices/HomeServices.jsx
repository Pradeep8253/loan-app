/**
 * HomeServices — service carousel on mobile, grid on desktop, with a comparison rail.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Carousel from "@/components/ui/Carousel/Carousel";
import ServiceCard from "@/components/ui/ServiceCard/ServiceCard";
import Reveal from "@/components/ui/Reveal/Reveal";
import Button from "@/components/ui/Button/Button";
import { services } from "@/lib/data/services";
import { homeStats } from "@/lib/data/content";
import StatBlock from "@/components/ui/StatBlock/StatBlock";
import "./HomeServices.css";

export default function HomeServices() {
  return (
    <section className="home-services section section--white" id="services" aria-labelledby="home-services-title">
      <div className="container">
        <SectionHeading
          id="home-services-title"
          eyebrow="What we assist with"
          title="Five products. One honest desk."
          mark={["honest"]}
          lede="Personal loans and overdrafts get most of our attention because they are where the market is loudest and least clear. Home, business and balance transfer are handled by specialists."
          action={<Button href="/how-it-works" variant="outline" size="md">How assistance works</Button>}
        />

        <div className="home-services__feature">
          <Carousel count={services.length} label="Loan services" desktopColumns={3}>
            {services.map((s, i) => (
              <ServiceCard key={s.key} service={s} index={i} />
            ))}
          </Carousel>
        </div>

        <Reveal variant="up" delay={120} className="home-services__stats">
          {homeStats.map((s) => (
            <StatBlock key={s.label} value={s.value} suffix={s.suffix} decimals={s.decimals || 0} label={s.label} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
