/**
 * EmiFaq — calculator FAQs in a narrow centred column (deliberately different from
 * the other FAQ layouts on service pages).
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Accordion from "@/components/ui/Accordion/Accordion";
import "./EmiFaq.css";

const FAQS = [
  { q: "Why is my lender's EMI slightly different from this?", a: "Lenders may use 365/360-day conventions, a different disbursement date or a processing fee added to the principal. Differences are usually under ₹100 a month." },
  { q: "Does a longer tenure always mean a lower EMI?", a: "Yes, but the total interest rises. On unsecured loans beyond 60 months, the extra interest is rarely worth the cash-flow relief." },
  { q: "Can I change the EMI after disbursal?", a: "Some lenders allow a one-time EMI reset or tenure change after a set number of payments, often with a small fee. Ask before you sign up." },
  { q: "How much EMI is safe for my salary?", a: "A common guideline is 40% of take-home for the total of all EMIs. Above 50%, lenders start pricing in risk and rejecting files." },
];

export default function EmiFaq() {
  return (
    <section className="emi-faq section section--sky" aria-labelledby="emi-faq-title">
      <div className="container emi-faq__inner">
        <SectionHeading id="emi-faq-title" eyebrow="Calculator FAQ" title="Four quick clarifications." align="center" />
        <Accordion items={FAQS} defaultOpen={0} />
      </div>
    </section>
  );
}
