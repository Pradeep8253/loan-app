/**
 * Root layout — fonts, metadata and PWA wiring.
 * The `js` class is server-rendered so reveal animations never flash hidden content;
 * a <noscript> style block keeps every section visible when JavaScript is unavailable.
 */
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "../styles/globals.css";

/* next/font must be called at module scope. It downloads the files once at build
   time and self-hosts them; if the build machine is offline, see the note in
   README.md under "Building without network access". */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-display",
  display: "swap",
});
const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mirvex Loan Assist — Personal loan & overdraft assistance in India",
    template: "%s · Mirvex Loan Assist",
  },
  description:
    "Mirvex Loan Assist helps you compare personal loans, overdrafts, home loans, business loans and balance transfers from partner banks and NBFCs. One enquiry, honest shortlist, zero credit-score impact.",
  applicationName: "Mirvex Loan Assist",
  keywords: [
    "personal loan assistance India",
    "overdraft facility",
    "home loan advisor",
    "business loan MSME",
    "loan balance transfer",
    "EMI calculator",
  ],
  authors: [{ name: "Mirvex Loan Assist" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Mirvex Loan Assist",
    title: "Mirvex Loan Assist — compare before you commit",
    description:
      "A loan assistance platform for personal loans, overdrafts, home and business loans. One enquiry, a short honest shortlist, and WhatsApp support.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Mirvex Loan Assist" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mirvex Loan Assist",
    description: "Compare partner options before you commit. Loan assistance, not a lender.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Mirvex",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#102A4C",
};

const swResetScript = `if ('serviceWorker' in navigator) { navigator.serviceWorker.getRegistrations().then(function (r) { r.forEach(function (reg) { reg.unregister(); }); }); }`;
const noScriptCss = `[data-reveal]{opacity:1!important;transform:none!important} .marker::before{transform:scaleX(1)!important} .preloader{display:none!important}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`js ${display.variable} ${body.variable}`}>
      <head>
        {/* JS is assumed for reveals; without JS the noscript style below unhides everything. */}
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: noScriptCss }} />
        </noscript>
        {process.env.NODE_ENV !== "production" ? <script dangerouslySetInnerHTML={{ __html: swResetScript }} /> : null}
      </head>
      <body>{children}</body>
    </html>
  );
}
