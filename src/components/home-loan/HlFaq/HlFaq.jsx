/**
 * HlFaq — home loan FAQs beside an advice card with the advisor's photo.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Accordion from "@/components/ui/Accordion/Accordion";
import Reveal from "@/components/ui/Reveal/Reveal";
import SmartImage from "@/components/ui/SmartImage/SmartImage";
import Button from "@/components/ui/Button/Button";
import "./HlFaq.css";

const FAQS = [
  { q: "How much down payment will I need?", a: "Most partners finance up to 80–90% of the property value, which means 10–20% from your own funds. Higher-value properties are often capped at 75–80%. The down payment cannot be funded by the same lender." },
  { q: "Can I add a co-applicant who does not own the property?", a: "Yes. A co-applicant's income counts toward eligibility even without ownership, though ownership terms differ by lender. Adding a parent or spouse can meaningfully raise the sanctioned amount." },
  { q: "What if my builder is not on the lender's approved list?", a: "Some partners restrict lending on unapproved projects. If the project is not listed, we look for a partner that lends against the property independently — but expect a lower loan-to-value." },
  { q: "Is a fixed or floating rate better?", a: "Floating usually wins over a 20-year horizon because rates tend to fall over time and floating loans are typically free to prepay. Fixed offers certainty at a small premium — useful if your budget cannot absorb a 50-basis-point rise." },
  { q: "Can I transfer my existing home loan to a lower rate?", a: "Yes. That is a balance transfer, and we handle it on the balance transfer desk. You will need 12 months of clean repayment, a fresh valuation and the existing lender's foreclosure statement." },
];

export default function HlFaq() {
  return (
    <section className="hl-faq section section--white" aria-labelledby="hl-faq-title">
      <div className="container hl-faq__grid">
        <div>
          <SectionHeading id="hl-faq-title" eyebrow="Home loan FAQ" title="Before you pay a token amount." mark={["token amount"]} />
          <Reveal variant="up" className="hl-faq__advisor">
            <SmartImage slot="team.advisor" ratio="1 / 1" sizes="96px" className="hl-faq__avatar" />
            <div>
              <p className="hl-faq__advisor-name">Ishaan Verma</p>
              <p className="hl-faq__advisor-role">Home loan advisor · 9 years</p>
              <p className="hl-faq__advisor-line">“Send me the project name before you sign the token letter. I will check the approval status first.”</p>
              <Button href="/contact" variant="outline" size="sm">Ask Ishaan</Button>
            </div>
          </Reveal>
        </div>
        <Accordion items={FAQS} defaultOpen={0} />
      </div>
    </section>
  );
}
