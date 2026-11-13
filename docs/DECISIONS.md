# Decision log

The master brief was truncated mid-sentence at §6.2. Everything below is a judgement call made to keep the build coherent: what was assumed, why, and where the code lives. Newest sections are written in the same order as the missing brief headings.

## 1. Brand and contact defaults

The brief said "use defaults, no questions". Filled in as: brand **Mirvex Loan Assist**, phone `+91 98765 43210`, WhatsApp `919876543210`, email `hello@example.com`, a placeholder Civil Lines address in Prayagraj, locale `en-IN`, `Asia/Kolkata` timezone assumptions for "business hours". All of it lives in `src/lib/siteConfig.js` so a real deployment edits one file.

## 2. §6.3–6.9 — lead capture contract

Recovered from the visible fragment plus surrounding context, then formalised:

- **Honeypot.** Field named `__honeypot` in the payload, a visually hidden input in each form. Filled in ⇒ return a fake success with a plausible reference and never write, never send.
- **Minimum fill time.** 1500 ms per `spamKey`, held in `sessionStorage`. Submitting faster is treated as a bot and follows the same silent-success path.
- **Signature.** `submitLead(payload, { redirect, spamKey, onStatus })` → `Promise<{ ok, reference, whatsappUrl, errors? }>`.
- **Reference format.** `MVX-####-XX` — four digits, two letters, generated client-side. Not globally unique by design; uniqueness is a backend concern.
- **Enrichment.** Attribution (utm/referrer/landing page), device class, and a `source` string that names the exact CTA. `source` doubles as the analytics key.
- **Delivery.** localStorage (`mirvex_leads`, capped at 100 newest) is the always-on record. EmailJS runs when keys exist. Failures land in `mirvex_lead_outbox` and retry on the next successful submit.
- **WhatsApp.** Built centrally in `src/lib/whatsapp.js` from a message template per context (`emi`, `apply`, `enquiry`), then opened on `redirect: true`.

## 3. §7 — content and tone

- **Compliance posture.** Nothing promises approval, a rate or a timeline. Rate figures are labelled indicative and always paired with "the lender decides". FOIR ceilings are described as typical, not policy.
- **No fabricated credentials.** The team page names three advisors and describes them as a demo desk; no awards, no certifications, no regulator registration numbers.
- **Numbers.** 42,000 enquiries, 18 partners, 24 advisors, 93% of files updated within 24 hours, 71% reaching a shortlist — all consistent across `/about`, `/demo-scope` and the footer. The 29% that do not reach a shortlist is stated explicitly, because an unpublished denominator is a marketing claim.
- **Copy density.** Every page carries a hero, at least one mid-page CTA and a closing enquiry band, each with different layouts and different words. No section component is imported by two pages except shell, popup and modal pieces.

## 4. §8 — missing-state policy

Every surface that could show nothing got an explicit state instead of a blank:

| Surface | Empty / loading / error handling |
| --- | --- |
| `/track-application` | 720 ms simulated fetch, skeleton rows, not-found panel with format help, three demo references |
| `/team` | Seed guarantee of ten records; "no match" panel when filters exclude everything; skeleton cards during the localStorage read |
| `/faq` search | Live count, and a "no match" panel that routes to the desk |
| `/eligibility` | Gauge is always populated from defaults — no zero state |
| `/emi-calculator` | Presets guarantee sane values before any interaction |
| Wizard | Draft restored on mount; completion card replaces the form entirely |

## 5. §9 — performance budget

- First Load JS: 87.8 kB shared. Heaviest route is `/` at 125 kB, lightest interactive tool `/eligibility` at 100 kB.
- Fonts are two families via `next/font`, self-hosted, `swap`, no third-party request at runtime.
- Images are remote Unsplash URLs behind `SmartImage`, which sets an explicit `aspect-ratio` so nothing reflows when a photo arrives. The eight slots are centralised in `src/lib/images.js`.
- No animation library. Reveals are a single `IntersectionObserver` in `RevealObserver` plus CSS transitions; counts and bars animate on intersection with `requestAnimationFrame` where numbers must move.

## 6. §10 — what was deliberately not built

- **No state library.** Two contexts are enough: `ShellContext` (sheets, toasts, scroll lock) and `EnquiryContext` (which modal is open and with what prefill).
- **No CSS framework.** Tailwind, CSS modules and CSS-in-JS were all excluded by the brief; the resulting token system in `globals.css` is the substitute.
- **No icon sprite.** `lucide-react` tree-shakes to the icons actually imported.
- **No map embed.** The contact page describes the office and lets the visitor copy the address; an embedded map would mean a third-party runtime on a page whose job is a phone call.
- **No testimonial carousel on `/about`.** Invented customer quotes are the one thing that cannot be made compliance-safe in a demo.

## 7. Engineering traps worth remembering

These cost real debugging time and should not be reintroduced:

1. **Never `pkill -f "next start"`.** The pattern matches the shell running the command and kills the tool session. Use `ss -ltnp | grep :3000` and `kill -9 <pid>`.
2. **Never build while a server holds port 3000.** The old process keeps serving the previous manifest, so new routes 404 while `next build` reports success. Kill first, `rm -rf .next`, build, start.
3. **`html.js .reveal` outranks `.reveal.is-in`.** The reveal override needs an explicit `html.js .reveal.is-in[data-variant]` rule or content stays invisible once JS marks the document.
4. **Carousel tracks widen the document.** `.app-main { overflow-x: clip }` is load-bearing; without it a peeking card creates horizontal scroll on every page that uses a carousel.
5. **H1 accent words need `display: flex` + `column-gap`.** Inline-block words collapse their surrounding space at large sizes.
6. **`Button` has no `style` prop and auto-appends an arrow** whenever `rightIcon` is truthy. Passing both a manual chevron and the default arrow renders two.
7. **Inline styles are limited to CSS custom properties.** Primitives that need runtime numbers (`--bar-h`, `--foir-w`, `--skel-h`, `--img-ratio`) pass variables, never values. This keeps a naive `style={{` grep meaningful as a lint.
8. **Long multi-file heredocs can die mid-write** with a shell error and no output. Verify with `ls` and a first-line `head` after any large batch write.
9. **`select` needs `16px` minimum font on iOS** or focus-zoom fires; every input in the codebase uses the same floor.
10. **The promo popup must not interrupt a task.** It is gated on first scroll or pointer move, waits four more seconds, and is entirely suppressed on `/apply`, `/track-application`, `/privacy-terms` and `/grievance`.

## 8. Product decisions behind the tools

- **EMI maths.** Standard reducing-balance formula, computed in `src/lib/emi.js` and mirrored in `emiClient.js` where the browser needs it. Presets per product so the first paint is never a 0.
- **Eligibility.** FOIR ceilings of 0.50 (personal), 0.55 (home), 0.45 (business), with rates of 13.5%, 8.6% and 16% over 5, 20 and 4 years. The gauge turns amber above 48% and red above 55% — those thresholds are the visible signal that a profile is stretched, which is the honest version of an eligibility teaser.
- **Balance transfer.** ₹8,00,000 at 16% over 36 months refinanced to 11.5%: EMI falls from ₹28,144 to ₹26,377, and after ₹16,000 of fees the net saving is ₹47,612 with a break-even near 23 months. Those exact figures are in the page copy and in the maths.
- **Overdraft.** Interest is charged on usage, not the limit: `used × 12.5% ÷ 12`, contrasted with `calculateEMI(limit, 12.5, 36)` for the equivalent term loan.
- **Apply wizard.** Product → About you → Requirement → Documents → Review. Draft saves to `mirvex_apply_draft` after every change, completion card prints the reference and deep-links to `/track-application?ref=<reference>`, which the tracker reads on mount.
- **Team dashboard.** Reads the ten seeds, then merges any lead the visitor generated and any override they saved from the dashboard, so the demo closes its own loop. Edits persist in `mirvex_applications` and a reset control restores the seed state.
