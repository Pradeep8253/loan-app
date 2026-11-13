/**
 * BtFaq — transfer FAQs with a compact "documents in 60 seconds" explainer strip.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Accordion from "@/components/ui/Accordion/Accordion";
import Reveal from "@/components/ui/Reveal/Reveal";
import SmartImage from "@/components/ui/SmartImage/SmartImage";
import "./BtFaq.css";

const FAQS = [
  { q: "What is the minimum rate gap that makes a transfer worthwhile?", a: "As a rule of thumb, 0.75% or more with at least 18 months remaining. Below that, the processing fee and legal charges often eat the saving." },
  { q: "What does foreclosure of the old loan cost?", a: "Personal loans often charge 2–4% of the outstanding if you close early; floating-rate home loans are typically free. The advisor models the charge into the comparison before you decide." },
  { q: "Can I increase the loan amount during the transfer?", a: "Sometimes — a top-up along with the transfer is possible if the property value or income supports it. It changes the eligibility maths, so ask before assuming." },
  { q: "Will a balance transfer affect my credit score?", a: "The new lender runs a bureau check, which is recorded. Closing the old loan and keeping the new one current usually helps over time as the rate and EMI improve." },
  { q: "Can I consolidate a personal loan and a credit card together?", a: "Yes, subject to the partner's policy. Consolidation usually means one personal loan clearing both balances — which converts a 40% credit-card rate into a 13–16% term rate." },
  { q: "What is the difference between a balance transfer and a top-up loan?", a: "A transfer moves an existing loan to a new lender at better terms. A top-up adds borrowing to your existing loan without closing it. We will tell you which one your file supports." },
];

export default function BtFaq() {
  return (
    <section className="bt-faq section section--white" aria-labelledby="bt-faq-title">
      <div className="container bt-faq__grid">
        <div>
          <SectionHeading id="bt-faq-title" eyebrow="Balance transfer FAQ" title="The fine print, in plain words." mark={["plain words"]} lede="The two numbers that matter most: your foreclosure charge and the new processing fee. Everything else is arithmetic." />
          <Reveal variant="up" className="bt-faq__image">
            <SmartImage slot="popup.transfer" ratio="4 / 3" sizes="(max-width: 899px) 92vw, 420px" />
          </Reveal>
        </div>
        <Accordion items={FAQS} defaultOpen={0} allowMultiple />
      </div>
    </section>
  );
}
