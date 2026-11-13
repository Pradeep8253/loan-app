"use client";
/**
 * Error boundary — friendly recovery screen with a retry action.
 */
import { useEffect } from "react";
import Button from "@/components/ui/Button/Button";
import "./status-pages.css";

export default function Error({ error, reset }) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[app-error]", error?.message);
  }, [error]);

  return (
    <main className="status-page">
      <div className="container status-page__inner">
        <p className="status-page__code">Oops</p>
        <h1 className="status-page__title">Something broke on our side.</h1>
        <p className="status-page__body">
          Your data is untouched. Retry the page, or take the enquiry route — an advisor will pick it up either way.
        </p>
        <div className="status-page__actions">
          <Button size="lg" onClick={() => reset()} rightIcon={false}>Try again</Button>
          <Button href="/contact" variant="outline" size="lg" rightIcon={false}>Contact an advisor</Button>
        </div>
      </div>
    </main>
  );
}
