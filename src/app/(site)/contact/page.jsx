import { PhoneCall } from "lucide-react";
import CoHero from "@/components/contact/CoHero/CoHero";
import CoChannels from "@/components/contact/CoChannels/CoChannels";
import CoForm from "@/components/contact/CoForm/CoForm";
import CoHours from "@/components/contact/CoHours/CoHours";
import Disclaimer from "@/components/ui/Disclaimer/Disclaimer";
import { siteConfig } from "@/lib/siteConfig";
import "./contact.css";

export const metadata = {
  title: "Contact the desk",
  description: "Reach Mirvex Loan Assist on WhatsApp, phone or email. Response times stated plainly, office open Monday to Saturday.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <CoHero />
      <CoChannels />
      <section className="co-form-sec section section--white" aria-labelledby="co-form-title">
        <div className="container co-form-sec__grid">
          <div className="co-form-sec__intro">
            <p className="eyebrow">Send a message</p>
            <h2 id="co-form-title" className="co-form-sec__title">Tell us what you need — it opens WhatsApp with the detail prefilled.</h2>
            <p className="co-form-sec__body">If it is about an existing application, add your MVX reference in the message. That lets the advisor pull the file before calling.</p>
            <a href={`tel:${siteConfig.contact.phoneHref}`} className="co-form-sec__phone"><PhoneCall aria-hidden="true" size={18} /> {siteConfig.contact.phoneDisplay}</a>
          </div>
          <div className="co-form-sec__form">
            <CoForm />
          </div>
        </div>
      </section>
      <CoHours />
      <div className="container disclaimer-wrap"><Disclaimer /></div>
    </>
  );
}
