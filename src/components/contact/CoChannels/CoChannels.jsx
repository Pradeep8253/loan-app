"use client";
/**
 * CoChannels — four contact channels as large tap targets with copy-to-clipboard.
 */
import { useState } from "react";
import { Phone, Mail, MapPin, Copy, Check } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import { siteConfig } from "@/lib/siteConfig";
import { useEnquiry } from "@/context/EnquiryContext";
import "./CoChannels.css";

export default function CoChannels() {
  const { openEnquiry } = useEnquiry();
  const [copied, setCopied] = useState("");
  const copy = async (value, key) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(""), 1600);
    } catch {
      setCopied("");
    }
  };

  return (
    <section className="co-ch section section--sky" aria-labelledby="co-ch-title">
      <div className="container">
        <h2 className="sr-only" id="co-ch-title">Contact channels</h2>
        <div className="co-ch__grid">
          <button type="button" className="co-ch__card co-ch__card--wa" onClick={() => openEnquiry({ source: "contact.whatsapp" })}>
            <span className="co-ch__icon" aria-hidden="true"><WhatsAppIcon size={24} /></span>
            <span className="co-ch__label">WhatsApp</span>
            <span className="co-ch__value">Chat with the desk</span>
            <span className="co-ch__note">Fastest · ~30 min reply in business hours</span>
          </button>
          <a href={`tel:${siteConfig.contact.phoneHref}`} className="co-ch__card">
            <span className="co-ch__icon" aria-hidden="true"><Phone size={24} /></span>
            <span className="co-ch__label">Phone</span>
            <span className="co-ch__value">{siteConfig.contact.phoneDisplay}</span>
            <span className="co-ch__note">{siteConfig.contact.hours}</span>
          </a>
          <div className="co-ch__card">
            <span className="co-ch__icon" aria-hidden="true"><Mail size={24} /></span>
            <span className="co-ch__label">Email</span>
            <span className="co-ch__value">{siteConfig.contact.email}</span>
            <span className="co-ch__note">Replies the same working day</span>
            <button type="button" className="co-ch__copy" onClick={() => copy(siteConfig.contact.email, "email")}>
              {copied === "email" ? <Check aria-hidden="true" size={14} /> : <Copy aria-hidden="true" size={14} />}
              {copied === "email" ? "Copied" : "Copy email"}
            </button>
          </div>
          <div className="co-ch__card">
            <span className="co-ch__icon" aria-hidden="true"><MapPin size={24} /></span>
            <span className="co-ch__label">Office</span>
            <span className="co-ch__value">{siteConfig.contact.address.line1}</span>
            <span className="co-ch__note">{siteConfig.contact.address.line2}</span>
            <button type="button" className="co-ch__copy" onClick={() => copy(`${siteConfig.contact.address.line1}, ${siteConfig.contact.address.line2}`, "addr")}>
              {copied === "addr" ? <Check aria-hidden="true" size={14} /> : <Copy aria-hidden="true" size={14} />}
              {copied === "addr" ? "Copied" : "Copy address"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
