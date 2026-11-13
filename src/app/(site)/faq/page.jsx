import FaHero from "@/components/faq/FaHero/FaHero";
import FaSearch from "@/components/faq/FaSearch/FaSearch";
import FaGroups from "@/components/faq/FaGroups/FaGroups";
import FaCta from "@/components/faq/FaCta/FaCta";
import Disclaimer from "@/components/ui/Disclaimer/Disclaimer";

export const metadata = {
  title: "Frequently asked questions",
  description: "Answers on eligibility, documents, privacy and complaints for the Mirvex loan assistance platform.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <FaHero />
      <FaSearch />
      <FaGroups />
      <FaCta />
      <div className="container disclaimer-wrap"><Disclaimer /></div>
    </>
  );
}
