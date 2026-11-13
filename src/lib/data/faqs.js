/**
 * faqs.js — grouped FAQs used by /faq and service pages. Compliance-safe language throughout.
 */
export const faqGroups = [
  {
    key: "general",
    title: "About Mirvex",
    faqs: [
      {
        q: "Is Mirvex a lender or a loan app?",
        a: "Neither. Mirvex is a loan assistance platform. We help you understand your options, prepare documentation and apply with partner banks and NBFCs. The lender makes all credit decisions and disburses the loan directly to you.",
        keywords: ["agent", "broker", "dsp"],
      },
      {
        q: "Do you charge the customer a fee?",
        a: "Your enquiry, comparison and assistance are free for customers in this demo. In production, any platform or advisory fee would be disclosed in writing before you confirm a partner. Lenders charge their own processing fees, which we list up-front.",
        keywords: ["charges", "commission", "cost"],
      },
      {
        q: "Will my credit score be affected by enquiring?",
        a: "A basic enquiry with Mirvex does not pull your credit report. When you agree to proceed with a partner lender, that lender may run a formal credit bureau check, which can appear on your report.",
        keywords: ["cibil", "bureau", "credit report"],
      },
      {
        q: "How quickly can I get a decision?",
        a: "For personal loans, our team typically shares a shortlist within one working day, and eligible profiles can receive a lender decision the same day. Home loans and business loans take longer because of property or financial verification.",
        keywords: ["turnaround", "tat", "fast", "urgent"],
      },
    ],
  },
  {
    key: "eligibility",
    title: "Eligibility & amounts",
    faqs: [
      {
        q: "What is the minimum salary for a personal loan?",
        a: "Many of our partner policies look for a net monthly income of ₹20,000 or more, verified through salary credits. Business and self-employed profiles are assessed on declared income and banking. Exact criteria vary by partner and city.",
        keywords: ["income", "salary", "minimum wage", "net pay"],
      },
      {
        q: "Can I get a loan without collateral?",
        a: "Yes. Personal loans, overdrafts and many business loans are unsecured, meaning no collateral is required for eligible profiles. Home loans and secured business loans are backed by the property or asset.",
        keywords: ["unsecured", "security", "guarantor", "mortgage"],
      },
      {
        q: "What is a healthy FOIR?",
        a: "FOIR (Fixed Obligation to Income Ratio) compares all your EMIs to your monthly income. Most lenders prefer your total EMIs — including the new one — to stay within 40–50% of take-home income.",
        keywords: ["dti", "debt to income", "emi ratio"],
      },
      {
        q: "Can I prepay my loan early?",
        a: "Prepayment rules depend on the lender and whether the rate is fixed or floating. We tell you the lender's prepayment terms before you sign, including any charges, so you can judge whether it suits you.",
        keywords: ["foreclosure", "foreclose", "prepayment", "part payment", "closure charges"],
      },
    ],
  },
  {
    key: "privacy",
    title: "Documents & privacy",
    faqs: [
      {
        q: "What documents will I need?",
        a: "Typically PAN, Aadhaar or another address proof, recent bank statements and income proof. Business loans add GST returns; home loans add property documents. Your advisor will share a single checklist for your case.",
        keywords: ["papers", "kyc", "pan", "aadhaar", "salary slip"],
      },
      {
        q: "Who can see my documents?",
        a: "Only the advisor handling your file and the chosen partner lender's verification team. We do not sell contact data. See the Privacy page for what this demo stores in your browser.",
        keywords: ["privacy", "sharing", "third party", "confidential"],
      },
      {
        q: "Is my data safe in this demo?",
        a: "This build is a static demonstration. Nothing is stored on our servers — form data lives only in your browser's local storage and, if EmailJS is configured, in the configured EmailJS inbox. See Demo Scope.",
        keywords: ["security", "storage", "localstorage", "gdpr", "dpdp"],
      },
      {
        q: "How do I raise a complaint?",
        a: "Use the Grievance page to log a complaint with your reference number. We acknowledge every complaint within two working days and aim to resolve it within ten.",
        keywords: ["grievance", "escalation", "ticket", "ombudsman"],
      },
    ],
  },
];

export const allFaqs = faqGroups.flatMap((g) => g.faqs);

/**
 * One lower-case haystack per FAQ: question, answer and the plain-language
 * synonyms a visitor is likely to type ("foreclosure" for "prepay", "cibil"
 * for "credit score"). Precomputed so the filter stays a single string test.
 */
export const faqHaystacks = allFaqs.map((f) =>
  `${f.q} ${f.a} ${(f.keywords || []).join(" ")}`.toLowerCase()
);
