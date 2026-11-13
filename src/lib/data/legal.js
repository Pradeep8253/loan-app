/**
 * legal.js — privacy, terms and demo-scope copy. Written for a static demonstration.
 */
export const legalSections = [
  {
    key: "privacy",
    title: "Privacy Policy",
    updated: "12 November 2026",
    intro:
      "This policy explains what this demonstration stores, where it goes, and what to expect from a production deployment of the Mirvex platform.",
    sections: [
      {
        h: "What we collect",
        p: "When you submit an enquiry, the form collects your name, mobile number, optional email, service interest, loan amount, city and any message you add. Nothing else is collected unless you type it in.",
      },
      {
        h: "Where it is stored",
        p: "In this demo, form data is written to your browser's local storage as a lead record, and — if EmailJS is configured — sent to that EmailJS account's inbox. Your browser may also keep a short session log of interface events. No Mirvex server receives your data.",
      },
      {
        h: "Marketing consent",
        p: "The consent checkbox refers to contact about your enquiry. Enquiring is not an application for credit, and consent here is not consent to share your data with unnamed third parties.",
      },
      {
        h: "Your rights",
        p: "You can clear all locally stored data from the Demo Scope page at any time. In a production system you would be able to request access, correction and deletion through the Grievance channel.",
      },
      {
        h: "Analytics",
        p: "Interface events are pushed to window.dataLayer for demonstration purposes only. No third-party analytics script is loaded by default.",
      },
    ],
  },
  {
    key: "terms",
    title: "Terms of Use",
    updated: "12 November 2026",
    intro:
      "Mirvex Loan Assist is a loan assistance platform, not a lender. These terms describe the limits of the service presented in this demonstration.",
    sections: [
      {
        h: "Role of Mirvex",
        p: "Mirvex helps you understand products, prepare documentation and submit applications with partner banks and NBFCs. Partner lenders make all credit decisions independently.",
      },
      {
        h: "Indicative figures",
        p: "Interest rates, tenures, fees and turnaround times shown anywhere on this site are indicative and subject to partner policy, your profile and prevailing regulations. They are not offers of credit.",
      },
      {
        h: "No guarantee",
        p: "Completing an enquiry or application does not guarantee approval. A lender may decline an application for reasons it is required to disclose to you.",
      },
      {
        h: "Demo limitation",
        p: "This build is a static demonstration with placeholder contact details. Do not submit real personal or financial information. See Demo Scope.",
      },
    ],
  },
];
