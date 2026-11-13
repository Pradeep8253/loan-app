/**
 * documents.js — category-based document checklists used by Apply, How It Works and the dashboard.
 */
export const documentGroups = [
  {
    key: "identity",
    title: "Identity & address",
    icon: "IdCard",
    required: true,
    items: [
      { name: "PAN card", note: "Mandatory for all applicants" },
      { name: "Aadhaar card", note: "Address and identity proof" },
      { name: "Passport / Voter ID", note: "Any one alternate photo ID" },
    ],
  },
  {
    key: "income",
    title: "Income proof",
    icon: "FileText",
    required: true,
    items: [
      { name: "Last 3 months' salary slips", note: "Salaried applicants" },
      { name: "Last 6 months' bank statement", note: "Salary credit account" },
      { name: "Form 16 / ITR", note: "If requested by the lender" },
    ],
  },
  {
    key: "business",
    title: "Business proof",
    icon: "Building2",
    required: false,
    items: [
      { name: "GST registration & returns", note: "Last 12 months" },
      { name: "Current account statement", note: "Last 6 months" },
      { name: "Udyam / shop establishment certificate", note: "If registered" },
    ],
  },
  {
    key: "property",
    title: "Property papers",
    icon: "Home",
    required: false,
    items: [
      { name: "Sale agreement / allotment letter", note: "For purchase or transfer" },
      { name: "Approved building plan", note: "For construction loans" },
      { name: "Property tax receipt", note: "Latest paid receipt" },
    ],
  },
];

export const getDocumentGroup = (key) => documentGroups.find((g) => g.key === key);
