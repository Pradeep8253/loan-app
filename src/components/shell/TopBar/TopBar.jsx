/**
 * TopBar — thin navy utility strip above the desktop navbar: hours, email, phone.
 */
import { Clock, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import "./TopBar.css";

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <p className="topbar__hours">
          <Clock aria-hidden="true" size={14} />
          {siteConfig.contact.hours}
        </p>
        <div className="topbar__links">
          <a href={`mailto:${siteConfig.contact.email}`}>
            <Mail aria-hidden="true" size={14} />
            {siteConfig.contact.email}
          </a>
          <a href={`tel:${siteConfig.contact.phoneHref}`}>
            <Phone aria-hidden="true" size={14} />
            {siteConfig.contact.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
