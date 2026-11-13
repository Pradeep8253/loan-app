/**
 * siteConfig — the single source of truth for brand, contact and navigation data.
 * Reads public env vars with safe demo fallbacks. Never duplicate these values in JSX.
 */
const digits = (v, fallback) => (v || fallback).replace(/[^\d]/g, "");

export const siteConfig = {
  brand: {
    name: "Mirvex Loan Assist",
    short: "Mirvex",
    tagline: "Digital loan assistance, done properly.",
    descriptor: "Loan assistance platform",
    founded: 2019,
    legalName: "Mirvex Loan Assist (Demo)",
  },
  contact: {
    phoneDisplay: "+91 98765 43210",
    phoneHref: "+919876543210",
    whatsapp: digits(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, "919876543210"),
    email: "hello@example.com",
    grievanceEmail: "grievance@example.com",
    address: {
      line1: "2nd Floor, Civil Lines Business Centre",
      line2: "Prayagraj, Uttar Pradesh 211001",
      country: "India",
    },
    hours: "Mon–Sat, 9:30 AM – 7:00 PM IST",
    responseTime: "Within 30 minutes, business hours",
  },
  socials: [
    { label: "WhatsApp", href: "/contact" },
    { label: "LinkedIn", href: "/about" },
    { label: "Instagram", href: "/about" },
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  serviceLabels: {
    "personal-loan": "Personal Loan",
    overdraft: "Overdraft",
    "home-loan": "Home Loan",
    "business-loan": "Business Loan",
    "loan-balance-transfer": "Loan Balance Transfer",
  },
  nav: {
    services: [
      { href: "/personal-loan", label: "Personal Loan", key: "personal-loan", blurb: "Planned expenses, funded clearly." },
      { href: "/overdraft", label: "Overdraft", key: "overdraft", blurb: "A ready line for the month you cannot predict." },
      { href: "/home-loan", label: "Home Loan", key: "home-loan", blurb: "Buy, build or finish your home." },
      { href: "/business-loan", label: "Business Loan", key: "business-loan", blurb: "Working capital without the runaround." },
      { href: "/loan-balance-transfer", label: "Balance Transfer", key: "loan-balance-transfer", blurb: "Consolidate or move to a better deal." },
    ],
    tools: [
      { href: "/how-it-works", label: "How It Works" },
      { href: "/emi-calculator", label: "EMI Calculator" },
      { href: "/eligibility", label: "Eligibility Check" },
      { href: "/track-application", label: "Track Application" },
    ],
    company: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
      { href: "/grievance", label: "Grievance" },
      { href: "/privacy-terms", label: "Privacy & Terms" },
      { href: "/demo-scope", label: "Demo Scope" },
      { href: "/team", label: "Team Dashboard (demo)" },
    ],
  },
};

export default siteConfig;
