import { Suspense } from "react";
import Link from "next/link";
import { ShieldCheck, Clock3, PhoneCall } from "lucide-react";
import ApplyWizard from "@/components/apply/ApplyWizard/ApplyWizard";
import { siteConfig } from "@/lib/siteConfig";
import "./apply.css";

export const metadata = {
  title: "Apply for loan assistance",
  description: "Start a five-step loan assistance application. Save your draft, choose a product and submit to WhatsApp with a reference number.",
  alternates: { canonical: "/apply" },
};

export default function ApplyPage({ searchParams }) {
  const raw = searchParams?.service;
  const initialService = ["personal-loan", "overdraft", "home-loan", "business-loan", "loan-balance-transfer"].includes(raw) ? raw : null;

  return (
    <div className="apply-page">
      <div className="container apply-page__inner">
        <header className="apply-page__head">
          <p className="eyebrow eyebrow--amber">Application</p>
          <h1 className="apply-page__title">Five steps. Two minutes of typing.</h1>
          <p className="apply-page__sub">Your draft saves on this device as you go. Nothing is submitted until the final step, and nothing pulls your credit report.</p>
          <ul className="apply-page__trust">
            <li><ShieldCheck aria-hidden="true" size={16} /> No bureau pull</li>
            <li><Clock3 aria-hidden="true" size={16} /> ~2 minutes</li>
            <li><a href={`tel:${siteConfig.contact.phoneHref}`}><PhoneCall aria-hidden="true" size={16} /> Need help? Call</a></li>
          </ul>
        </header>
        <Suspense fallback={<p className="muted">Loading application…</p>}>
          <ApplyWizard initialService={initialService} />
        </Suspense>
        <p className="apply-page__foot">
          Prefer a shorter form? <Link href="/contact">Use the contact page</Link> — an advisor will call you instead.
        </p>
      </div>
    </div>
  );
}
