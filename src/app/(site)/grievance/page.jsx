import GrHero from "@/components/grievance/GrHero/GrHero";
import GrProcess from "@/components/grievance/GrProcess/GrProcess";
import GrForm from "@/components/grievance/GrForm/GrForm";
import Disclaimer from "@/components/ui/Disclaimer/Disclaimer";

export const metadata = {
  title: "Grievance redressal",
  description: "How to raise a complaint with Mirvex Loan Assist, with the full four-level escalation ladder including the RBI Ombudsman route.",
  alternates: { canonical: "/grievance" },
};

export default function GrievancePage() {
  return (
    <>
      <GrHero />
      <GrProcess />
      <GrForm />
      <div className="container disclaimer-wrap"><Disclaimer /></div>
    </>
  );
}
