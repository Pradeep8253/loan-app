/**
 * robots.txt — allow public pages, keep the team demo out of indexes.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/team", "/team/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
