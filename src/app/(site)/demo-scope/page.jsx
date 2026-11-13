import DsHero from "@/components/demo-scope/DsHero/DsHero";
import DsTable from "@/components/demo-scope/DsTable/DsTable";
import DsClear from "@/components/demo-scope/DsClear/DsClear";
import Disclaimer from "@/components/ui/Disclaimer/Disclaimer";

export const metadata = {
  title: "Demo scope",
  description: "A frank list of what works and what is simulated in this Mirvex loan platform demonstration.",
  alternates: { canonical: "/demo-scope" },
};

export default function DemoScopePage() {
  return (
    <>
      <DsHero />
      <DsTable />
      <DsClear />
      <div className="container disclaimer-wrap"><Disclaimer /></div>
    </>
  );
}
