/**
 * Offline fallback — served by the service worker when the network is unavailable.
 */
import Link from "next/link";
import Button from "@/components/ui/Button/Button";
import "../status-pages.css";

export const metadata = { title: "You are offline" };

export default function OfflinePage() {
  return (
    <main className="status-page">
      <div className="container status-page__inner">
        <p className="status-page__code">Offline</p>
        <h1 className="status-page__title">No connection right now.</h1>
        <p className="status-page__body">
          Pages you have already visited still work from cache. Enquiries submitted offline are queued and sent automatically when you reconnect.
        </p>
        <div className="status-page__actions">
          <Button href="/" size="lg" rightIcon={false}>Try home</Button>
          <Button href="/contact" variant="outline" size="lg" rightIcon={false}>Contact details</Button>
        </div>
        <p className="status-page__links"><span>Your last enquiry reference is saved in this browser.</span></p>
      </div>
    </main>
  );
}
