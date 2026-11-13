/**
 * Sitemap — every public route of the platform.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

const routes = [
  "",
  "/personal-loan",
  "/overdraft",
  "/home-loan",
  "/business-loan",
  "/loan-balance-transfer",
  "/how-it-works",
  "/emi-calculator",
  "/eligibility",
  "/track-application",
  "/apply",
  "/about",
  "/contact",
  "/faq",
  "/privacy-terms",
  "/grievance",
  "/demo-scope",
];

export default function sitemap() {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date("2026-11-12"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
