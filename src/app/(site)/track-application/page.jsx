import { Suspense } from "react";
import TrHero from "@/components/track/TrHero/TrHero";
import TrTool from "@/components/track/TrTool/TrTool";
import TrFaq from "@/components/track/TrFaq/TrFaq";
import Disclaimer from "@/components/ui/Disclaimer/Disclaimer";

export const metadata = {
  title: "Track your application",
  description: "Check the current stage, owner and next action for your Mirvex loan assistance enquiry using your MVX reference.",
  alternates: { canonical: "/track-application" },
};

export default function TrackPage() {
  return (
    <>
      <TrHero />
      <Suspense fallback={<div className="container section">Loading tracker…</div>}>
        <TrTool />
      </Suspense>
      <TrFaq />
      <div className="container disclaimer-wrap"><Disclaimer /></div>
    </>
  );
}
