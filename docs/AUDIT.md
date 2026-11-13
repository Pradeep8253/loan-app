# Final audit

Recorded at the end of the build so the checks can be re-run rather than trusted.

## Build and lint

```
npx next lint    → 0 errors, 0 warnings
npx next build   → exit 0, 20 routes emitted
```

Route table (First Load JS, kB):

| Route | Size | First Load |
| --- | --- | --- |
| `/` | 9.78 | 125 |
| `/personal-loan` | 7.81 | 108 |
| `/overdraft` | 7.83 | 102 |
| `/home-loan` | 8.13 | 109 |
| `/business-loan` | 12.8 | 119 |
| `/loan-balance-transfer` | 4.87 | 110 |
| `/how-it-works` | 3.33 | 109 |
| `/emi-calculator` | 6.06 | 101 |
| `/eligibility` | 5.72 | 100 |
| `/track-application` | 6.87 | 106 |
| `/apply` | 10.8 | 111 |
| `/about` | 7.92 | 109 |
| `/contact` | 12.4 | 118 |
| `/faq` | 7.45 | 102 |
| `/privacy-terms` | 0.91 | 88.7 |
| `/grievance` | 6.5 | 107 |
| `/demo-scope` | 3.8 | 98.5 |
| `/team` | 0.16 | 105 |
| `/team/applications/[ref]` | 0.16 | 105 |
| `/offline` | 0.22 | 94.9 |

Shared baseline: **87.8 kB**.

## Uniqueness — no repeated sections

127 component files, every page-section component imported exactly once. The only shared components are shell chrome (`TopBar`, `Navbar`, `MobileAppBar`, `BottomNav`, `Footer`, `FloatingActions`, `Preloader`, `InstallPrompt`, `ServiceWorkerRegister`, `OfflineBadge`, `RevealObserver`, `ScrollProgress`), the two sheets (`ServicesSheet`, `MoreSheet`), the three popups, and the `ui/` primitives.

Page-specific section counts:

| Page | Sections |
| --- | --- |
| `/` | 9 |
| `/personal-loan` | 7 |
| `/overdraft` | 6 |
| `/home-loan` | 6 |
| `/business-loan` | 6 |
| `/loan-balance-transfer` | 6 |
| `/how-it-works` | 6 |
| `/emi-calculator` | 4 |
| `/eligibility` | 4 |
| `/track-application` | 3 |
| `/about` | 6 |
| `/contact` | 4 |
| `/faq` | 4 |
| `/privacy-terms` | 2 |
| `/grievance` | 3 |
| `/demo-scope` | 3 |

Section tone rhythm per page is recorded in `docs/DECISIONS.md`; no two adjacent sections share a background.

## CTA coverage

31 components open the enquiry modal or render an enquiry form; 8 modules call `submitLead()` directly. Every entry point resolves to the same pipeline.

Enquiry sources currently emitted (each is an analytics key):

```
pl.hero  pl.usecase.*  pl.midcta  pl.final
od.hero  od.hero.widget  od.scenarios  od.final
hl.hero  hl.process  hl.final
bl.hero  bl.docs  bl.final
bt.hero  bt.final
hiw.hero  hiw.final
emi.tool  emi.sticky
eligibility.tool  eligibility.next  eligibility.sticky  eligibility.final
track.ask
apply.wizard
contact.whatsapp  contact.form
faq.final
about.team.*
nav.mobile.apply  popup.banner
```

## Design-constraint compliance

| Rule | Result |
| --- | --- |
| No gradients | 0 matches for `*-gradient` |
| No glassmorphism / blur | 0 matches for `backdrop-filter` |
| No text-shadow | 0 matches |
| No glow / neon | 0 matches (one prose use of the word "glowing") |
| No faded text | Every `opacity: 0` is a hidden input, an animation start frame, or the reveal pre-state |
| Inline styles limited to custom properties | Verified — all 29 original violations converted to `--var` passing |
| External co-located CSS only | No CSS modules, no CSS-in-JS, no utility framework |
| Zero build and lint warnings | Confirmed after the final build |
| Every page exports `metadata` | 20 of 20 |

## Mobile QA matrix (390 × 844, DPR 2)

Every route was loaded at 390 px, scrolled end to end so all reveals fire, and checked for horizontal overflow, console errors, and sub-40 px tap targets.

| Check | Result |
| --- | --- |
| Horizontal overflow | None on any of the 18 public routes |
| Console errors | None across all 19 tested routes |
| Tap targets | Every interactive element now measures ≥ 40 px tall, and ≥ 44 px for primary controls. Carousel dots keep a 32 px invisible hit area (their visible dot is 8 px by design), which is the one intentional exception |
| Bottom nav | Present on all site routes, hidden on `/apply` and `/team` |
| Sticky bars | EMI and eligibility bars sit above the bottom nav with content padding reserved |

## Final automated pass

A scripted sweep loads all 19 routes at 390 × 844, waits for hydration, and asserts three things per page: no `scrollWidth > innerWidth`, no console or page errors, and no interactive element shorter than 40 px (excluding pure-decorative controls). Final result: **CLEAN** — 19 of 19.

## Interactive flows verified end to end

1. **Apply wizard** — all five steps advance; empty submit raises field-level errors with `aria-invalid`; a missing loan amount is correctly rejected at step 3; consent unchecked blocks submission; with consent, `submitLead` returns a reference (`MVX-6240-BR`, then `MVX-5759-TA` on a repeat run), the draft is cleared, and the completion card renders with a live WhatsApp handoff carrying the reference in the pre-filled message.
2. **Track application** — bad reference shows the not-found panel; `MVX-3177-KS` loads Kabir Sethi's file with the six-stage timeline and "now" marker; the `?ref=` deep link auto-loads on mount and resolves references created earlier in the same browser, which is the documented client-only behaviour.
3. **EMI calculator** — three sliders drive the EMI live (₹16,847 default → ₹34,713 on the home preset → ₹21,696 at a ₹25 lakh principal); donut and amortisation bars render.
4. **Eligibility** — five segments; home profile returns ₹31,74,000; the FOIR gauge shifts `is-amber` → `is-danger` as existing EMI rises.
5. **FAQ search** — `foreclosure`, `cibil`, `pan` and `grievance` each return one result through the synonym haystack; nonsense input shows the empty state.
6. **How It Works** — four document-category tabs switch panels with `aria-selected` tracking.
7. **Team dashboard** — status change to "With lender" and an added note both survive a full page reload; the stage timeline, KPI tiles and filters all recompute from the same merged dataset.
8. **FAQ search** — added a synonym haystack after testing showed `foreclosure` (a far more common search than "prepay") returned nothing. Twelve FAQs now carry keyword aliases.

## Known gaps (documented, not hidden)

- `/team` is unauthenticated by design and marked `noindex`.
- No upload, no real email delivery, no lender or bureau call.
- The promo popup is suppressed on `/apply`, `/track-application`, `/privacy-terms` and `/grievance`, and gated on first scroll or pointer movement elsewhere.
