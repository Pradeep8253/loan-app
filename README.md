# Mirvex Loan Assist

A production-shaped, front-end-only loan assistance platform built with the Next.js 14 App Router. Twenty routes and roughly 13,300 lines of hand-written source cover five loan products, an EMI calculator, an eligibility estimator, application tracking, a five-step application wizard, a full marketing site and an internal team dashboard.

**This is a demonstration.** No backend, no lender integration, no credit-bureau pull. Every record lives in the visitor's own browser. `/demo-scope` states this to the visitor in plain language, `docs/DECISIONS.md` records the engineering choices behind it, and `docs/AUDIT.md` holds the final verified results.

```
20 routes · 127 components · 130 stylesheets · 10 hooks · 26 UI primitives
0 build errors · 0 lint warnings · 0 console errors · 0 horizontal overflow at 390px
```

---

## Quick start

```bash
npm install
cp .env.example .env.local     # optional — the app runs fully without it
npm run dev                    # http://localhost:3000
```

```bash
npm run build && npm start     # production build
npm run lint                   # ESLint, must stay at zero warnings
```

Node 18.17+ is required by Next 14.

## Building without network access

The two type families load through `next/font/google`, which downloads the font
files **once at build time** and self-hosts them in the output. That means the
first `npm run build` needs outbound access to `fonts.googleapis.com`. After that
the fonts are local and no runtime request is made.

If you are building on a machine with no internet, either allow that host through
the firewall once, or temporarily swap the two `next/font/google` calls in
`src/app/layout.jsx` for a plain CSS `@font-face`/system stack. Note that
`next/font` requires its loaders to be called at module scope — wrapping them in
a helper function or a conditional will fail the build.

If a build fails with `Cannot read properties of null` inside
`@next/font/dist/google/loader.js`, it is a transient fetch failure rather than a
code problem: re-run `npm run build`.

## Environment

Everything is optional. With no env file the app still works end to end; EmailJS silently falls back to a local outbox.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service that receives lead notifications |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Internal lead template |
| `NEXT_PUBLIC_EMAILJS_ACK_TEMPLATE_ID` | Optional customer acknowledgement template |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number, digits only, with country code |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used by metadata, sitemap and robots |

## Routes

| Route | What it is |
| --- | --- |
| `/` | Home — hero, service grid, process, proof, FAQ, enquiry band |
| `/personal-loan` | Deepest product page: use-case picker, rate table, CTA ladder |
| `/overdraft` | Limit-vs-loan mechanism, scenario cards, comparison table |
| `/home-loan` | Four purchase paths, cost breakdown, process rail |
| `/business-loan` | Use-of-funds selector, assessment weights, document checklist |
| `/loan-balance-transfer` | Before/after EMI maths, break-even, three-step transfer |
| `/how-it-works` | Six-stage timeline, doc checklist by category, roles |
| `/emi-calculator` | Live sliders, presets, donut and amortisation bars |
| `/eligibility` | FOIR estimator with product profiles and a colour-coded gauge |
| `/track-application` | Reference lookup, stage timeline, advisor notes, demo references |
| `/apply` | Five-step wizard with draft autosave and WhatsApp handoff |
| `/about` | Story, operating values, advisory team, published metrics |
| `/contact` | Channels, full contact form, stated response times |
| `/faq` | Synonym-aware search plus three grouped accordions |
| `/privacy-terms` | Privacy policy and terms, with a sticky document index |
| `/grievance` | Four-level escalation ladder and complaint form |
| `/demo-scope` | Live-vs-simulated matrix and a local-data wipe control |
| `/team` | Internal pipeline: KPIs, stage spread, filterable list |
| `/team/applications/[ref]` | Single file: timeline, status control, editable notes |
| `/offline` | Service-worker fallback page |

## Architecture

```
src/
  app/                App Router: (site) marketing group, team group, offline
  components/
    ui/               26 primitives — Button, FormField, Sheet, Carousel, Slider…
    shell/            TopBar, Navbar, MobileAppBar, BottomNav, sheets, PWA bits
    popup/            EnquiryModal, EnquiryForm, PromoBannerPopup
    home/ personal-loan/ overdraft/ home-loan/ business-loan/
    balance-transfer/ how-it-works/ emi-calculator/ eligibility/
    track/ apply/ about/ contact/ faq/ legal/ grievance/ demo-scope/ team/
  context/            ShellContext (sheets, toasts), EnquiryContext (modal state)
  hooks/              10 hooks — focus trap, sheet drag, scroll direction, count-up…
  lib/
    data/             All copy and content arrays (services, faqs, statuses…)
    leadService.js    submitLead() — validation, anti-spam, storage, EmailJS, WhatsApp
    emi.js            Reducing-balance maths and the eligibility estimator
  styles/globals.css  Design tokens, reset, section rhythm, reveal system
public/               Icons, og image, hand-written sw.js
docs/DECISIONS.md     Every judgement call the brief left open
```

**Server-first.** Pages are server components that export `metadata`; `"use client"` is confined to leaves that hold state — sliders, forms, the wizard, the dashboard. Content arrays live in `src/lib/data/*` so copy is editable without touching JSX.

**One lead path.** Every CTA in the product — hero buttons, sticky bars, popups, the wizard — funnels through `submitLead()`:

```
validate → honeypot check → 1.5 s min-fill guard → enrich
        → localStorage outbox → EmailJS → WhatsApp deep link → analytics
```

It returns `{ ok, reference, whatsappUrl, errors? }`; the reference (`MVX-1234-AB`) is printed in the WhatsApp message and accepted by `/track-application`, closing the loop.

**No design library.** Every primitive is hand-built against tokens in `globals.css`. Styling is external, co-located CSS files imported by their component — no CSS-in-JS, no utility framework, no CSS modules. The only permitted inline styles are CSS custom properties carrying runtime numbers (bar heights, gauge widths), which is why the codebase reads clean under a naive `style={{` audit.

## Design system

- Palette: navy `#102A4C`, deep navy `#0A1D36`, teal `#1F7A8C`, bright teal `#14A3B8`, amber `#F5A800`, sky `#EAF3FA`, ink `#0B1B33`, slate `#44546B`, success `#12A150`, danger `#D92D20`, WhatsApp `#1FAF38`.
- Type: Bricolage Grotesque 800 for display, Plus Jakarta Sans 500–800 for body, both via `next/font` with `display: swap`.
- Section rhythm cycles white → sky → navy → white → teal → sky, never two identical neighbours.
- Deliberately flat: solid fills, 2 px borders, offset shadows. No gradients, no blur, no glow, no text shadow, no reduced-opacity text.

## Mobile behaviour

The site is built mobile-first for a 390 px viewport and then scaled up.

- 56 px top app bar that hides on scroll-down and returns on scroll-up; 64 px bottom nav with a raised amber Apply button; both respect `env(safe-area-inset-*)`.
- Bottom sheets (Services, More, Enquiry, Promo) share one `Sheet` primitive with 80 px drag-to-dismiss and focus trapping.
- Snap carousels with a peek of the next card and dot indicators; chip and segmented tab groups throughout.
- Wizard owns a sticky footer; the bottom nav hides on `/apply` and `/team` so nothing competes with the primary action.
- 48 px minimum tap targets, 16 px minimum input font (no iOS zoom), correct `inputMode` and `autoComplete` on every field, `-webkit-tap-highlight-color: transparent`, `press scale(.97)` and a 10 ms haptic tick on supported devices.

## Accessibility

Semantic landmarks and one `<h1>` per page; a skip link; visible `:focus-visible` rings at 3 px with 2 px offset; `aria-invalid` plus `aria-describedby` wiring on every validated field; `role="alert"` and `role="status"` on error and progress messages; `aria-live` on the tool result panels. Content renders without JavaScript, and every animation is disabled under `prefers-reduced-motion`.

## PWA

`app/manifest.js` ships a standalone manifest with maskable icons and Apply / Track / WhatsApp shortcuts. `public/sw.js` is hand-written — no Workbox — with network-first navigations and an `/offline` fallback, plus cache-first static assets. The install prompt appears on the second page view, respects a 14-day dismissal and shows iOS-specific instructions where the native prompt does not exist.

## Demo data

Ten seeded applications (`MVX-4821-RA` and friends) with three named advisors. `/track-application` accepts those references, and the team dashboard reads them plus anything the visitor has just created, merging localStorage overrides on top of the seeds. `/demo-scope` has a button that removes every `mirvex_*` key.

## Known limits

- No authentication anywhere; `/team` is open by design and marked `robots: noindex`.
- No upload, no real notification, no lender or bureau call.
- Rates, FOIR ceilings and fees are indicative ranges for demonstration.

## Docs

- `docs/DECISIONS.md` — the brief was truncated at §6.2; this file records every default chosen for §7 onward, plus any engineering trap worth remembering.
- `docs/AUDIT.md` — the final measured results: route sizes, uniqueness counts, CTA coverage, constraint compliance, the mobile QA matrix and every interactive flow tested.
