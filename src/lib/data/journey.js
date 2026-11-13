/**
 * journey.js — the six-step customer journey shared by How It Works, Home and Apply.
 */
export const journeySteps = [
  {
    n: "01",
    key: "enquiry",
    title: "Tell us what you need",
    blurb: "A short enquiry — service, amount and city. No paperwork yet.",
    detail: "Your enquiry reaches WhatsApp and our team inbox together, so nothing gets lost between channels.",
    icon: "MessageSquare",
    minutes: "2 min",
  },
  {
    n: "02",
    key: "profile",
    title: "A quick profile check",
    blurb: "We confirm income, obligations and what lender policies will accept.",
    detail: "This step filters out offers that would be rejected later — a faster no at the start is better than a slow maybe.",
    icon: "ClipboardCheck",
    minutes: "10 min call",
  },
  {
    n: "03",
    key: "shortlist",
    title: "A short, honest shortlist",
    blurb: "Two or three partner options with rate, fee and tenure in writing.",
    detail: "We compare total cost, not just the headline rate, and explain the trade-offs in plain English.",
    icon: "ListChecks",
    minutes: "1 working day",
  },
  {
    n: "04",
    key: "documents",
    title: "Documents, collected once",
    blurb: "One checklist. Uploaded once, shared securely with the chosen partner.",
    detail: "No re-uploading the same bank statement to three lenders.",
    icon: "FolderOpen",
    minutes: "Same day",
  },
  {
    n: "05",
    key: "decision",
    title: "Underwriting and decision",
    blurb: "You get the sanction terms and a clear explanation of every charge.",
    detail: "Our advisors do not run a parallel process — you always know which lender is reviewing your file.",
    icon: "Scale",
    minutes: "2–5 working days",
  },
  {
    n: "06",
    key: "disbursal",
    title: "Disbursal and support",
    blurb: "Funds reach your verified account. Support continues after.",
    detail: "Repayment schedules, changes and queries stay with one advisor reference.",
    icon: "Banknote",
    minutes: "1–2 working days",
  },
];

export const trustStats = [
  { value: 42000, suffix: "+", label: "Enquiries handled" },
  { value: 18, suffix: "", label: "Partner lenders compared" },
  { value: 96, suffix: "%", label: "Advisors respond within 30 min" },
  { value: 4.7, suffix: "/5", label: "Post-enquiry advisor rating", decimals: 1 },
];
