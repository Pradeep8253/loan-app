/**
 * content.js — page-level copy that is reused across more than one component
 * (home social proof, service comparisons, process notes). Single-source, no hard-coded JSX copy.
 */
export const homeProof = [
  { name: "Ananya S.", city: "Delhi", text: "The advisor explained why one lender rejected my file and what to fix. Two weeks later, sanctioned.", outcome: "Personal loan · ₹5L" },
  { name: "Kabir S.", city: "Lucknow", text: "I had quotes from three apps. Mirvex's comparison showed the true processing fee difference. Saved ₹18,000.", outcome: "Business loan · ₹25L" },
  { name: "Vikram D.", city: "Pune", text: "Home loan paperwork is a nightmare. They gave me one checklist and chased the valuation themselves.", outcome: "Home loan · ₹65L" },
  { name: "Farah K.", city: "Mumbai", text: "Balance transfer estimate was clear about the break-even month. No surprises at closure.", outcome: "Balance transfer · ₹3L" },
];

export const homeStats = [
  { value: 42000, suffix: "+", label: "Enquiries answered" },
  { value: 18, suffix: "", label: "Partner lenders" },
  { value: 30, suffix: " min", label: "Typical first reply" },
  { value: 4.7, suffix: "/5", decimals: 1, label: "Advisor rating" },
];

export const homeUseCases = [
  { key: "medical", slot: "usecase.medical", title: "A medical bill you cannot delay", body: "Hospital payments rarely wait for the next salary. A personal loan can clear the bill while you repay over a year or three.", amount: "₹50,000 – ₹5,00,000", icon: "HeartPulse" },
  { key: "travel", slot: "usecase.travel", title: "A trip the family has planned for months", body: "If a trip is booked and the money is close, a fixed EMI keeps the plan intact without touching your savings.", amount: "₹1,00,000 – ₹4,00,000", icon: "Plane" },
  { key: "wedding", slot: "usecase.wedding", title: "A wedding with a fixed budget", body: "Venue, catering and travel add up quickly. Fund the gap with a clear tenure instead of borrowings from relatives.", amount: "₹2,00,000 – ₹10,00,000", icon: "Sparkles" },
  { key: "planned", slot: "usecase.planned", title: "A renovation you have quoted out", body: "Contractors quote in lump sums. Match the drawdown to work milestones and repay on a schedule you pick.", amount: "₹1,00,000 – ₹8,00,000", icon: "Hammer" },
  { key: "other", slot: "usecase.other", title: "Something else entirely", body: "If the expense is genuine and the repayment capacity is real, describe it on the call. We will tell you if a loan is the wrong tool.", amount: "Ask an advisor", icon: "HelpCircle" },
];

export const personalHighlights = [
  { icon: "Clock", title: "Decision in 24 hours", body: "Eligible salaried profiles usually hear back from a partner lender within one working day." },
  { icon: "Percent", title: "Rates from 10.99% p.a.", body: "Final pricing depends on your profile, employer category and the partner's policy." },
  { icon: "Calendar", title: "Tenure 12–60 months", body: "Pick a tenure that keeps the EMI under 40% of take-home — we will show you the maths." },
  { icon: "FileCheck2", title: "Four documents", body: "PAN, Aadhaar, salary slips and a bank statement. That is the usual checklist." },
];

export const personalSteps = [
  { n: "01", title: "2-minute enquiry", body: "Name, number, amount. Nothing that affects your credit score." },
  { n: "02", title: "Advisor call", body: "We confirm income, obligations and the purpose. You get honest feedback on fit." },
  { n: "03", title: "Written shortlist", body: "Two or three partner options with rate, fee, tenure and total cost." },
  { n: "04", title: "One document set", body: "Upload once. We coordinate lender verification and keep you updated." },
  { n: "05", title: "Sanction & disbursal", body: "You review the terms. The lender disburses directly to your verified bank account." },
];

export const personalFaqs = [
  { q: "What is the maximum personal loan I can get?", a: "Partners usually lend up to ₹25 lakh for strong salaried profiles, but the practical limit is set by your repayment capacity. Most approvals sit between 20 and 30 times net monthly income." },
  { q: "Is a personal loan available to self-employed applicants?", a: "Yes, though the assessment changes: business banking, ITR and declared income replace salary slips. Rates are often slightly higher than salaried pricing." },
  { q: "How is the interest rate decided?", a: "Partner lenders weigh your credit score, income stability, employer category, existing obligations and the tenure you choose. We compare the offers you actually qualify for, not the advertised floor rate." },
  { q: "Can I prepay or foreclose early?", a: "Yes. Most partners allow foreclosure after 6–12 EMIs, sometimes with a charge of 2–4% of the outstanding. Floating-rate personal loans are typically free of foreclosure charges — we confirm the terms in writing before you sign." },
  { q: "Will applying through Mirvex lower my score?", a: "An enquiry with Mirvex does not pull your credit report. When you accept a partner's offer, that lender runs its own formal check, which appears on your report once." },
  { q: "What if my loan is rejected?", a: "We tell you the likely reason and what to correct — for example, reducing card utilisation or clearing a small overdue. You can reapply after the recommended cooling period." },
];

export const overdraftHighlights = [
  { icon: "Repeat", title: "Pay for what you use", body: "Interest is charged on the amount drawn, not the sanctioned limit." },
  { icon: "ArrowDownUp", title: "Draw and repay freely", body: "Within the facility period, funds move in and out without a new application." },
  { icon: "CalendarDays", title: "Built for uneven months", body: "Instant refunds, event cash flow or seasonal stock cycles suit a line better than a lump sum." },
  { icon: "ShieldCheck", title: "Annual review", body: "The limit is reassessed each year as your turnover and banking history grow." },
];

export const overdraftScenarios = [
  { title: "A workshop with a big order", body: "A fabrication unit wins a contract that needs ₹3L of raw material, paid back in 60 days once the client clears.", tag: "Seasonal stock" },
  { title: "A clinic between insurance cycles", body: "A dental clinic draws ₹1.2L for new equipment while claim reimbursements land over two months.", tag: "Equipment gap" },
  { title: "A distributor with festival demand", body: "Inventory doubles for Diwali. The line funds stock in September and is repaid by December.", tag: "Festival cycle" },
  { title: "A consultant between invoices", body: "A marketing consultant bridges a 45-day payment cycle without breaking a fixed deposit.", tag: "Receivables gap" },
];

export const overdraftFaqs = [
  { q: "How is an overdraft different from a personal loan?", a: "A personal loan gives you a lump sum with fixed EMIs. An overdraft gives you a limit you can draw down, repay and reuse; you pay interest only on what you use, for as long as you use it." },
  { q: "Who typically gets an overdraft?", a: "Business owners, self-employed professionals and salaried borrowers with regular cash flow. Partners usually want 2+ years of banking history for business profiles." },
  { q: "Is security required?", a: "Some partners offer unsecured overdrafts up to ₹10 lakh for strong profiles. Larger limits may be secured by a fixed deposit or property." },
  { q: "What does it cost to keep the facility unused?", a: "Most partners charge nothing when the limit is unused, though some levy an annual renewal fee of ₹500–₹2,000. We list every charge before you sign." },
  { q: "How quickly can a limit be set up?", a: "Typically 2–3 working days after a completed application with banking and KYC documents. Unsecured limits can be faster." },
];
