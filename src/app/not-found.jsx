/**
 * 404 — designed empty state with routes back into the funnel.
 */
import Link from "next/link";
import Button from "@/components/ui/Button/Button";
import "./status-pages.css";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="status-page">
      <div className="container status-page__inner">
        <p className="status-page__code">404</p>
        <h1 className="status-page__title">That page moved, or never existed.</h1>
        <p className="status-page__body">
          The link may be old. Everything important is one tap away — services, the EMI calculator, or your application status.
        </p>
        <div className="status-page__actions">
          <Button href="/" size="lg" rightIcon={false}>Back to home</Button>
          <Button href="/contact" variant="outline" size="lg" rightIcon={false}>Contact an advisor</Button>
        </div>
        <nav className="status-page__links" aria-label="Quick links">
          <Link href="/personal-loan">Personal Loan</Link>
          <Link href="/overdraft">Overdraft</Link>
          <Link href="/emi-calculator">EMI Calculator</Link>
          <Link href="/track-application">Track Application</Link>
        </nav>
      </div>
    </main>
  );
}
