/**
 * Web app manifest — installable standalone demo with Apply, Track and WhatsApp shortcuts.
 */
export default function manifest() {
  return {
    name: "Mirvex Loan Assist",
    short_name: "Mirvex",
    description: "Loan assistance for personal loans, overdrafts, home and business loans.",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    theme_color: "#102A4C",
    background_color: "#EAF3FA",
    lang: "en-IN",
    dir: "ltr",
    categories: ["finance", "productivity"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Apply for a loan", short_name: "Apply", url: "/apply", icons: [{ src: "/icon-192.png", sizes: "192x192" }] },
      { name: "Track application", short_name: "Track", url: "/track-application", icons: [{ src: "/icon-192.png", sizes: "192x192" }] },
      { name: "Chat on WhatsApp", short_name: "WhatsApp", url: "/contact", icons: [{ src: "/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
