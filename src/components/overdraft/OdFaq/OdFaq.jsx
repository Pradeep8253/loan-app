/**
 * OdFaq — overdraft FAQs in a single wide column with an advisor contact strip.
 */
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Accordion from "@/components/ui/Accordion/Accordion";
import Reveal from "@/components/ui/Reveal/Reveal";
import Button from "@/components/ui/Button/Button";
import { overdraftFaqs } from "@/lib/data/content";
import { siteConfig } from "@/lib/siteConfig";
import "./OdFaq.css";

export default function OdFaq() {
  return (
    <section className="od-faq section section--white" aria-labelledby="od-faq-title">
      <div className="container od-faq__inner">
        <SectionHeading id="od-faq-title" eyebrow="Overdraft FAQ" title="The questions a limit raises." mark={["limit"]} />
        <Accordion items={overdraftFaqs} defaultOpen={0} />
        <Reveal variant="up" className="od-faq__strip">
          <div>
            <p className="od-faq__strip-title">Unsure whether a limit or a loan fits?</p>
            <p className="od-faq__strip-body">Send two lines about your cash flow. The specialist answers with a recommendation, not a pitch.</p>
          </div>
          <div className="od-faq__strip-actions">
            <Button href="/contact" variant="dark" size="md" icon={<WhatsAppIcon size={16} />} rightIcon={false}>
              Ask on WhatsApp
            </Button>
            <a href={`tel:${siteConfig.contact.phoneHref}`} className="od-faq__phone">{siteConfig.contact.phoneDisplay}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
