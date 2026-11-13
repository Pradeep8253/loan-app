"use client";
/**
 * ServiceCard — the service tile used on Home and Services sheet.
 * Equal-height with a pinned footer CTA row.
 */
import Link from "next/link";
import { ArrowUpRight, Wallet, RefreshCw, Home, Briefcase, ArrowLeftRight } from "lucide-react";
import IconTile from "@/components/ui/IconTile/IconTile";
import "./ServiceCard.css";

const ICONS = { Wallet, RefreshCw, Home, Briefcase, ArrowLeftRight };

export default function ServiceCard({ service, index = 0 }) {
  const Icon = ICONS[service.icon] || Wallet;
  return (
    <article className="svc-card">
      <div className="svc-card__top">
        <IconTile tone={index % 2 === 0 ? "navy" : "teal"} size="md">
          <Icon size={22} />
        </IconTile>
        {service.tag ? <span className="svc-card__tag">{service.tag}</span> : null}
      </div>
      <h3 className="svc-card__title">{service.name}</h3>
      <p className="svc-card__blurb">{service.blurb}</p>
      <dl className="svc-card__meta">
        <div><dt>Amount</dt><dd>{service.amount}</dd></div>
        <div><dt>Rate</dt><dd>{service.rate}</dd></div>
      </dl>
      <Link href={service.href} className="svc-card__cta">
        Explore {service.short}
        <ArrowUpRight aria-hidden="true" size={18} />
      </Link>
    </article>
  );
}
