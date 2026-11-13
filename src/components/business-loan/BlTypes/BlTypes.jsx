"use client";
/**
 * BlTypes — secured vs unsecured vs invoice-style, presented as expandable comparison
 * cards rather than a table (this page already has no tables, unlike others).
 */
import { useState } from "react";
import { Lock, Unlock, Receipt } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal/Reveal";
import "./BlTypes.css";

const TYPES = [
  {
    key: "unsecured",
    icon: Unlock,
    title: "Unsecured business loan",
    rate: "13.99% – 22% p.a.",
    amount: "₹1L – ₹50L",
    tenure: "12 – 60 months",
    body: "No collateral. Assessed on GST turnover, banking and credit. The fastest route for established service businesses and traders.",
    watch: "Higher rate than secured options. Prepayment terms vary — ask before signing.",
  },
  {
    key: "secured",
    icon: Lock,
    title: "Secured / loan against property",
    rate: "10.5% – 15% p.a.",
    amount: "₹10L – ₹5Cr",
    tenure: "Up to 15 years",
    body: "Backed by commercial or residential property. Cheaper per rupee and longer tenure; slower because of legal and technical checks.",
    watch: "Valuation and title process adds 3–5 weeks. Late payments risk the asset.",
  },
  {
    key: "invoice",
    icon: Receipt,
    title: "Invoice / receivable finance",
    rate: "12% – 18% p.a.",
    amount: "Against approved invoices",
    tenure: "30 – 120 days",
    body: "Funds released against unpaid invoices from credible buyers. Fits B2B firms whose constraint is a 60–90 day payment cycle, not demand.",
    watch: "Only approved buyers and invoices qualify. Reconciliation discipline is essential.",
  },
];

export default function BlTypes() {
  const [open, setOpen] = useState("unsecured");
  return (
    <section className="bl-types section section--white" aria-labelledby="bl-types-title">
      <div className="container">
        <SectionHeading id="bl-types-title" eyebrow="Three structures" title="Pick the structure before the lender." mark={["structure"]} lede="The same ₹20 lakh requirement can be priced three very different ways. The right structure usually depends on what secures it and how long you need the money." />
        <div className="bl-types__grid">
          {TYPES.map((t, i) => {
            const Icon = t.icon;
            const isOpen = open === t.key;
            return (
              <Reveal key={t.key} variant="up" delay={i * 70}>
                <article className={`bl-type ${isOpen ? "is-open" : ""}`}>
                  <button type="button" className="bl-type__head" onClick={() => setOpen(isOpen ? "" : t.key)} aria-expanded={isOpen}>
                    <span className="bl-type__icon" aria-hidden="true"><Icon size={20} /></span>
                    <span className="bl-type__title">{t.title}</span>
                  </button>
                  <dl className="bl-type__facts">
                    <div><dt>Rate</dt><dd>{t.rate}</dd></div>
                    <div><dt>Amount</dt><dd>{t.amount}</dd></div>
                    <div><dt>Tenure</dt><dd>{t.tenure}</dd></div>
                  </dl>
                  <div className="bl-type__more">
                    <p className="bl-type__body">{t.body}</p>
                    <p className="bl-type__watch"><strong>Watch out:</strong> {t.watch}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
