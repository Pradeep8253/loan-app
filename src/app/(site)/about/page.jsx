import AbHero from "@/components/about/AbHero/AbHero";
import AbStory from "@/components/about/AbStory/AbStory";
import AbValues from "@/components/about/AbValues/AbValues";
import AbTeam from "@/components/about/AbTeam/AbTeam";
import AbNumbers from "@/components/about/AbNumbers/AbNumbers";
import AbCta from "@/components/about/AbCta/AbCta";
import Disclaimer from "@/components/ui/Disclaimer/Disclaimer";

export const metadata = {
  title: "About Mirvex Loan Assist",
  description: "A loan assistance desk founded in 2019 in Prayagraj. 24 advisors, 18 partner lenders and one rule: never recommend a product the profile cannot clear.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <AbHero />
      <AbStory />
      <AbValues />
      <AbTeam />
      <AbNumbers />
      <AbCta />
      <div className="container disclaimer-wrap"><Disclaimer /></div>
    </>
  );
}
