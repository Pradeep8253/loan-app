/**
 * Home — composes the homepage sections. Each section is imported here only.
 */
import HomeHero from "@/components/home/HomeHero/HomeHero";
import HomeMarquee from "@/components/home/HomeMarquee/HomeMarquee";
import HomeServices from "@/components/home/HomeServices/HomeServices";
import HomeProof from "@/components/home/HomeProof/HomeProof";
import HomeUseCases from "@/components/home/HomeUseCases/HomeUseCases";
import HomeProcess from "@/components/home/HomeProcess/HomeProcess";
import HomeCompare from "@/components/home/HomeCompare/HomeCompare";
import HomeFaq from "@/components/home/HomeFaq/HomeFaq";
import HomeFinalCta from "@/components/home/HomeFinalCta/HomeFinalCta";
import Disclaimer from "@/components/ui/Disclaimer/Disclaimer";

export const metadata = {
  title: "Loan assistance for personal loans & overdrafts",
  description:
    "One enquiry, an honest shortlist. Mirvex Loan Assist compares personal loans, overdrafts, home loans, business loans and balance transfers from 18 partner lenders.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeMarquee />
      <HomeServices />
      <HomeProof />
      <HomeUseCases />
      <HomeProcess />
      <HomeCompare />
      <HomeFaq />
      <HomeFinalCta />
      <div className="container disclaimer-wrap">
        <Disclaimer compact />
      </div>
    </>
  );
}
