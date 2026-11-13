/**
 * Footer — four-column desktop footer with the enquiry rail, plus a tighter
 * mobile treatment that clears the bottom navigation.
 */
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import Button from "@/components/ui/Button/Button";
import { siteConfig } from "@/lib/siteConfig";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import "./Footer.css";

export default function Footer() {
  const year = 2026;
  const whatsappUrl = buildWhatsAppUrl({ template: "general" });

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__wordmark">
              <span className="footer__mark" aria-hidden="true">M</span>
              {siteConfig.brand.short}
            </span>
            <p className="footer__tag">{siteConfig.brand.tagline} A loan assistance platform — we compare, you choose, the lender decides.</p>
            <div className="footer__contact">
              <a href={`tel:${siteConfig.contact.phoneHref}`}><Phone aria-hidden="true" size={15} /> {siteConfig.contact.phoneDisplay}</a>
              <a href={`mailto:${siteConfig.contact.email}`}><Mail aria-hidden="true" size={15} /> {siteConfig.contact.email}</a>
              <p><MapPin aria-hidden="true" size={15} /> {siteConfig.contact.address.line1}, {siteConfig.contact.address.line2}</p>
              <p><Clock aria-hidden="true" size={15} /> {siteConfig.contact.hours}</p>
            </div>
          </div>

          <nav className="footer__col" aria-label="Services">
            <p className="footer__head">Services</p>
            <ul>
              {siteConfig.nav.services.map((s) => (
                <li key={s.href}><Link href={s.href}>{s.label}</Link></li>
              ))}
            </ul>
          </nav>
          <nav className="footer__col" aria-label="Tools">
            <p className="footer__head">Tools</p>
            <ul>
              {siteConfig.nav.tools.map((t) => (
                <li key={t.href}><Link href={t.href}>{t.label}</Link></li>
              ))}
              <li><Link href="/apply">Apply Now</Link></li>
            </ul>
          </nav>
          <nav className="footer__col" aria-label="Company">
            <p className="footer__head">Company</p>
            <ul>
              {siteConfig.nav.company.filter((c) => !c.href.startsWith("/team")).map((c) => (
                <li key={c.href}><Link href={c.href}>{c.label}</Link></li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer__cta">
          <div>
            <p className="footer__cta-title">Not sure where to start?</p>
            <p className="footer__cta-body">Send your requirement on WhatsApp. An advisor replies within 30 minutes in business hours.</p>
          </div>
          <div className="footer__cta-actions">
            <Button
              href={whatsappUrl}
              variant="whatsapp"
              size="md"
              external
              icon={<WhatsAppIcon size={18} />}
              rightIcon={false}
            >
              Chat on WhatsApp
            </Button>
            <Button href="/contact" variant="primary" size="md">Talk to an advisor</Button>
          </div>
        </div>

        <div className="footer__legal">
          <p>© {year} {siteConfig.brand.legalName}. All rights reserved. Demo build — placeholder contact details.</p>
          <p className="footer__legal-note">
            Mirvex is not a lender. All loans are sanctioned and disbursed by partner banks and NBFCs at their sole discretion.
          </p>
        </div>
      </div>
    </footer>
  );
}
