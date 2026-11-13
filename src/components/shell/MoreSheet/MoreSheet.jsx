"use client";
/**
 * MoreSheet — the app-bar menu: tools, company pages, legal and the install item.
 */
import Link from "next/link";
import { Download, ArrowUpRight } from "lucide-react";
import Sheet from "@/components/ui/Sheet/Sheet";
import { siteConfig } from "@/lib/siteConfig";
import { useShell } from "@/context/ShellContext";
import "./MoreSheet.css";

const GROUPS = [
  { title: "Tools", items: siteConfig.nav.tools },
  { title: "Company", items: siteConfig.nav.company.filter((i) => !i.href.startsWith("/team")) },
];

export default function MoreSheet() {
  const { sheet, closeSheet, openSheet } = useShell();
  const open = sheet?.name === "more";

  return (
    <Sheet open={open} onClose={closeSheet} title="Menu" description={siteConfig.brand.name} size="sm">
      <div className="more">
        {GROUPS.map((group) => (
          <div key={group.title} className="more__group">
            <p className="more__title">{group.title}</p>
            <ul>
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="more__link" onClick={closeSheet}>
                    {item.label}
                    <ArrowUpRight aria-hidden="true" size={16} />
                  </Link>
                </li>
              ))}
              {group.title === "Tools" ? (
                <li>
                  <Link href="/team" className="more__link" onClick={closeSheet}>
                    Team Dashboard <span className="more__demo">demo</span>
                    <ArrowUpRight aria-hidden="true" size={16} />
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        ))}
        <div className="more__group">
          <p className="more__title">Install</p>
          <button type="button" className="more__install" onClick={() => openSheet("install")}>
            <Download aria-hidden="true" size={18} />
            <span>Add Mirvex to your home screen</span>
          </button>
        </div>
        <p className="more__foot">
          {siteConfig.contact.phoneDisplay} · {siteConfig.contact.hours}
        </p>
      </div>
    </Sheet>
  );
}
