"use client";
/**
 * ServicesSheet — the mobile "Services" tab sheet: all five products with icons,
 * one-line descriptions and direct paths into each service page.
 */
import Link from "next/link";
import { Wallet, RefreshCw, Home, Briefcase, ArrowLeftRight, ChevronRight } from "lucide-react";
import Sheet from "@/components/ui/Sheet/Sheet";
import IconTile from "@/components/ui/IconTile/IconTile";
import { services } from "@/lib/data/services";
import { useShell } from "@/context/ShellContext";
import "./ServicesSheet.css";

const ICONS = { Wallet, RefreshCw, Home, Briefcase, ArrowLeftRight };

export default function ServicesSheet() {
  const { sheet, closeSheet } = useShell();
  const open = sheet?.name === "services";

  return (
    <Sheet open={open} onClose={closeSheet} title="Our services" description="Five products, one assistance desk." size="md">
      <ul className="svc-sheet">
        {services.map((s, i) => {
          const Icon = ICONS[s.icon] || Wallet;
          return (
            <li key={s.key}>
              <Link href={s.href} className="svc-sheet__row" onClick={closeSheet}>
                <IconTile tone={i % 2 === 0 ? "navy" : "teal"} size="md">
                  <Icon size={22} />
                </IconTile>
                <span className="svc-sheet__copy">
                  <span className="svc-sheet__name">{s.name}</span>
                  <span className="svc-sheet__blurb">{s.blurb}</span>
                </span>
                <ChevronRight aria-hidden="true" size={20} className="svc-sheet__chev" />
              </Link>
            </li>
          );
        })}
      </ul>
    </Sheet>
  );
}
