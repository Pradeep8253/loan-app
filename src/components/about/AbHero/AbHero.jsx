/**
 * AbHero — about masthead with a two-image collage and founding facts.
 */
import PageHero from "@/components/ui/PageHero/PageHero";
import SmartImage from "@/components/ui/SmartImage/SmartImage";
import "./AbHero.css";

export default function AbHero() {
  return (
    <PageHero
      eyebrow="About Mirvex"
      title="Built by people who got tired of being sold to."
      lede="Mirvex started in 2019 as a two-person desk helping small businesses in Uttar Pradesh compare lender offers without the noise. Seven years later the desk is bigger; the principle has not changed."
      tone="sky"
      facts={[
        { label: "Founded", value: "2019, Prayagraj" },
        { label: "Team", value: "24 advisors" },
        { label: "Partner lenders", value: "18" },
        { label: "Enquiries handled", value: "42,000+" },
      ]}
      aside={
        <div className="ab-hero__collage">
          <SmartImage slot="about.office" ratio="4 / 3" priority sizes="(max-width: 899px) 92vw, 460px" frame />
          <SmartImage slot="about.team" ratio="16 / 10" sizes="(max-width: 899px) 60vw, 300px" className="ab-hero__small" />
        </div>
      }
    />
  );
}
