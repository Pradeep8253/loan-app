/**
 * BlFaq — business loan FAQs in a wood-panel style two-column layout using the
 * MSME imagery rather than another text-only accordion block.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Accordion from "@/components/ui/Accordion/Accordion";
import SmartImage from "@/components/ui/SmartImage/SmartImage";
import Reveal from "@/components/ui/Reveal/Reveal";
import "./BlFaq.css";

const FAQS = [
  { q: "Can a proprietorship apply?", a: "Yes. Proprietorships are the most common applicants. You will need GST registration, 12 months of returns and a current account statement. Banks usually want two years of business vintage." },
  { q: "Do I need collateral?", a: "Not always. Unsecured business loans up to ₹50 lakh exist for strong profiles, though the practical limit depends on turnover and credit. Secured options are cheaper when you have property to offer." },
  { q: "Can I apply with a co-applicant to improve eligibility?", a: "Yes. A co-applicant with independent income — a spouse or a business partner — can lift the sanctioned amount. Both parties' credit is checked." },
  { q: "What is the difference between this and an overdraft?", a: "A business loan is a lump sum with fixed EMIs. An overdraft is a revolving limit for recurring gaps. If your shortfall repeats every quarter, an overdraft is usually cheaper overall." },
  { q: "How long does disbursal take?", a: "Unsecured files with complete documents can be sanctioned in 2–5 working days. Secured loans need valuation and legal checks, so plan for 3–5 weeks." },
  { q: "Will my personal credit score matter?", a: "Yes, for proprietors and small firms the promoter's bureau is central to the decision. Keep personal card utilisation low and avoid new credit applications in the two months before applying." },
];

export default function BlFaq() {
  return (
    <section className="bl-faq section section--sky" aria-labelledby="bl-faq-title">
      <div className="container">
        <SectionHeading id="bl-faq-title" eyebrow="Business loan FAQ" title="Questions from the shop floor." mark={["shop floor"]} lede="Compiled from the six questions that come up in almost every first call with a business owner." />
        <div className="bl-faq__grid">
          <Accordion items={FAQS} defaultOpen={0} />
          <Reveal variant="up" className="bl-faq__side">
            <SmartImage slot="biz.retail" ratio="4 / 3" sizes="(max-width: 959px) 92vw, 420px" />
            <div className="bl-faq__side-card">
              <p className="bl-faq__side-title">Sector-specific desk</p>
              <p className="bl-faq__side-body">Manufacturing, trading, services or retail — each has a different lender appetite. Ask for the specialist for your sector.</p>
              <p className="bl-faq__side-tag">Manufacturing · Trading · Services · Retail</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
