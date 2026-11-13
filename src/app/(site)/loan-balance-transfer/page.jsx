import BtHero from "@/components/balance-transfer/BtHero/BtHero";
import BtWhy from "@/components/balance-transfer/BtWhy/BtWhy";
import BtMath from "@/components/balance-transfer/BtMath/BtMath";
import BtSteps from "@/components/balance-transfer/BtSteps/BtSteps";
import BtFaq from "@/components/balance-transfer/BtFaq/BtFaq";
import BtCta from "@/components/balance-transfer/BtCta/BtCta";
import CTABand from "@/components/ui/CTABand/CTABand";
import Disclaimer from "@/components/ui/Disclaimer/Disclaimer";

export const metadata = {
  title: "Loan Balance Transfer & consolidation assistance",
  description: "Balance transfer and loan consolidation assistance. Compare rate, fee and net interest savings before you switch lenders.",
  alternates: { canonical: "/loan-balance-transfer" },
};

export default function BalanceTransferPage() {
  return (
    <>
      <BtHero />
      <BtWhy />
      <BtMath />
      <BtSteps />
      <BtFaq />
      <CTABand
        id="bt-mid"
        eyebrow="Do the maths first"
        title="See the saving after fees,"
        mark="not before."
        body="Send the existing statement and we will model the transfer with foreclosure and processing charges included. If the break-even is beyond your remaining tenure, we will say so."
        service="loan-balance-transfer"
        tone="navy"
        bullets={["Home, personal and auto loans", "Consolidation into one EMI", "Credit-card debt included"]}
        primaryLabel="Request a transfer review"
      />
      <BtCta />
      <div className="container disclaimer-wrap"><Disclaimer /></div>
    </>
  );
}
