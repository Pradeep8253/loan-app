/**
 * statuses.js — the application lifecycle used by Track Application and the team dashboard.
 */
export const statusStages = [
  { key: "received", label: "Application received", blurb: "We have your details and a reference number." },
  { key: "review", label: "Profile review", blurb: "An advisor checks income, obligations and documents." },
  { key: "matched", label: "Partner match", blurb: "Your profile is matched to suitable lender policies." },
  { key: "lender", label: "Submitted to lender", blurb: "The chosen partner begins formal verification." },
  { key: "approved", label: "Approval decision", blurb: "Sanction terms are shared for your review." },
  { key: "disbursed", label: "Disbursal", blurb: "Funds move to your verified bank account." },
];

export const statusIndex = (key) => Math.max(0, statusStages.findIndex((s) => s.key === key));

export const APPLICATION_STATUSES = {
  received: { label: "Received", tone: "info" },
  review: { label: "In review", tone: "info" },
  matched: { label: "Matched", tone: "amber" },
  lender: { label: "With lender", tone: "amber" },
  approved: { label: "Approved", tone: "success" },
  disbursed: { label: "Disbursed", tone: "success" },
  onhold: { label: "On hold", tone: "danger" },
  rejected: { label: "Not approved", tone: "danger" },
};
