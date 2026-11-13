"use client";
/**
 * HomeFaq — a four-question sampler with a full-FAQ link, laid out as a split.
 */
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Accordion from "@/components/ui/Accordion/Accordion";
import Button from "@/components/ui/Button/Button";
import Reveal from "@/components/ui/Reveal/Reveal";
import { faqGroups } from "@/lib/data/faqs";
import { PhoneCall } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import "./HomeFaq.css";

export default function HomeFaq() {
  const items = faqGroups[0].faqs.slice(0, 3).concat(faqGroups[1].faqs.slice(0, 2));
  return (
    <section className="home-faq section section--sky" aria-labelledby="home-faq-title">
      <div className="container home-faq__grid">
        <div>
          <SectionHeading
            id="home-faq-title"
            eyebrow="Straight answers"
            title="The questions everyone asks first."
            mark={["everyone asks"]}
            lede="If your question is not here, the desk answers WhatsApp faster than any form."
          />
          <Reveal variant="up" delay={120} className="home-faq__call">
            <PhoneCall aria-hidden="true" size={22} />
            <div>
              <p className="home-faq__call-title">Ask an advisor directly</p>
              <a href={`tel:${siteConfig.contact.phoneHref}`}>{siteConfig.contact.phoneDisplay}</a>
              <p className="home-faq__call-hours">{siteConfig.contact.hours}</p>
            </div>
          </Reveal>
        </div>
        <div>
          <Accordion items={items} defaultOpen={0} />
          <div className="home-faq__more">
            <Button href="/faq" variant="outline" size="md">Read all FAQs</Button>
            <Button href="/contact" variant="dark" size="md">Ask your own question</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
