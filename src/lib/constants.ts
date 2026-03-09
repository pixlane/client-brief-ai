export const FORM_STEPS = [
  { id: 1, title: "Company Overview", fields: ["businessName", "businessType", "websiteType"] },
  { id: 2, title: "Goals & Audience", fields: ["targetAudience", "mainGoal"] },
  { id: 3, title: "Scope & Style", fields: ["desiredPages", "keyFeatures", "visualStyle"] },
  { id: 4, title: "Timeline & Budget", fields: ["budgetRange", "timeline", "extraNotes"] },
] as const;

export const REQUIRED_BY_BACKEND = [
  "businessName",
  "businessType",
  "websiteType",
  "targetAudience",
  "mainGoal",
] as const;

export const REQUIRED_PER_STEP: Record<number, readonly string[]> = {
  0: ["businessName", "businessType", "websiteType"],
  1: ["targetAudience", "mainGoal"],
  2: [],
  3: [],
};

export const BUSINESS_TYPES = [
  "Startup",
  "SMB",
  "Enterprise",
  "Agency",
  "Freelancer",
  "Non-profit",
  "E-commerce",
  "SaaS",
  "Other",
];

export const WEBSITE_TYPES = [
  "Marketing website",
  "Landing page",
  "E-commerce store",
  "Web application",
  "Portfolio",
  "Blog / Content site",
  "Corporate site",
  "Other",
];

export const BUDGET_RANGES = [
  "Under $2,000",
  "$2,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000+",
  "Not sure yet",
];
